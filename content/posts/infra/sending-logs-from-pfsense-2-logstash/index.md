---
date: 2020-03-13T08:27:24+08:00
lang: zh-Hant-TW
description: Logstash 的功能像是一個接收器，支援從許多種 Protocol 接收 Log，如 Syslog、Netflow等，並且透過 Parser 將非結構化資料轉換成半結構化資料。Parser 方便的是使用 Grok Pattern，可以避免自行撰寫複雜的 Regex，不過他也支援 Regex 讓我們可以自訂 Pattern，因此 logstash 的 parsing 是很彈性的。本系列文章介紹 pfSense 與 ELK Stack (7.6 版) 的整合，藉此分析與收集阻擋的連接紀錄。
sidebar: auto
tags: ["ELK", "pfSense"]
category: Infra
categories: ["Infra"]
title: ELK Stack 整合 pfSense (一)：將 pfSense 防火牆阻擋紀錄傳送到 Logstash
resources:
- name: "featured-image"
  src: "sending-logs-from-pfsense-2-logstash.png"
aliases: ["/posts/infra/sending-logs-from-pfsense-2-logstash.html"]
---
![](/images/infra/sending-logs-from-pfsense-2-logstash.png)



Logstash 的功能像是一個接收器，支援從許多種 Protocol 接收 Log，如 Syslog、Netflow等，並且透過 **Parser** 將[非結構化資料](https://en.wikipedia.org/wiki/Unstructured_data)轉換成[半結構化資料](https://en.wikipedia.org/wiki/Semi-structured_data)。Parser 方便的是使用 Grok Pattern，可以避免自行撰寫複雜的 Regex，不過他也支援 Regex 讓我們可以自訂 Pattern，因此 Logstash 的 parsing 是很彈性的。本系列文章介紹 pfSense 與 ELK Stack (7.6 版) 的整合，藉此分析與收集阻擋的連接紀錄。

整個 pfSense 與 ELK Stack 的架構如下面這張圖，架設過程中只要注意一下 Port 的對應其他都沒有太大的問題。

![](https://i.imgur.com/yMAxVaB.png)

## ELK Stack 整合 pfSense 系列文
- [本篇] ELK Stack 整合 pfSense (一)：將 pfSense 防火牆阻擋紀錄傳送到 Logstash
- [ELK Stack 整合 pfSense (二)：Elasticsearch](/posts/infra/elasticsearch-receives-data-from-logstash)
- [ELK Stack 整合 pfSense (三)：Kibana Dashboard](/posts/infra/monitoring-pfsense-via-kibana.html)

## 安裝 Logstash
裝 logstash 前需要先安裝 Java，注意一下 Logstash 和 Java 的相容性。
```bash
# 安裝 JRE
sudo apt-get update && sudo apt-get install default-jre -y
java -version
# 安裝 logstash
curl -L -O https://artifacts.elastic.co/downloads/logstash/logstash-7.6.1.deb
sudo dpkg -i logstash-7.6.1.deb
```

## Logstash 的檔案結構
請見[文件](https://www.elastic.co/guide/en/logstash/7.6/dir-layout.html#deb-layout)中有詳情，這邊主要是了解 Logstash 各種設定放在哪裡，以及他們有不同的作用。

`/etc/logstash/` 底下有各種 `yml` 檔，都是 logstash 的設定檔。下面說明設定檔的功能。

### `pipeline.yml`
`/etc/logstash/pipelines.yml` 決定 logstash pipeline config 的路徑，預設在 `/etc/logstash/conf.d/*.conf` 下，這邊使用預設即可。

### `logstash.yml`
`logstash.yml` 用來設定 logstash 執行時的選項，`logstash.yml` 中大部分的設定也可以在執行指令用 [Command-line Flags](https://www.elastic.co/guide/en/logstash/7.6/running-logstash-command-line.html#command-line-flags) 帶入。

### Config File
這邊是 Logstash 最重要的地方，所有 config 預設都要放在 `/etc/logstash/conf.d` 底下。我們只要在這裡建立一個 `.conf` 結尾的檔案就可以寫設定了。如果有多個 config file，則 Logstash 會自行整合。

Config File 的結構分為 3 個部分，`input`、`filter`、`output`。Logstash 有需要的話要安裝 plugin，plugin 有四種：[`input`](https://www.elastic.co/guide/en/logstash/7.6/input-plugins.html)、[`filter`](https://www.elastic.co/guide/en/logstash/7.6/filter-plugins.html)、[`output`](https://www.elastic.co/guide/en/logstash/7.6/output-plugins.html)、[`codec`](https://www.elastic.co/guide/en/logstash/7.6/codec-plugins.html)。要查看已安裝的 plugin 可以透過指令 `bin/logstash-plugin list`，`bin`的路徑會因OS而不同，[Logstash 的檔案結構文件](#Logstash%20的檔案結構)文件有寫。

### `bin` 檔
放在 `/usr/share/logstash/bin`。執行 Logstash、安裝其他 Plugin 等會需要用到這裡的 binary。

### Custom Grok Patterns
有時我們需要自行定義 Grok Pattern，並且命名之，這可以透過`.grok` file 進行定義，然後再從 config file 中指定 pattern 的路徑。

## 在 pfSense 設定 Syslog 的 Remote log server
在 pfSense 的選單中進入 **Status** > **System Logs**。

![](https://i.imgur.com/bmoFsdy.png)

接著切換到 **Settings** 標籤：

![](https://i.imgur.com/zppua11.png)

輸入 Logstash 的 IP 和 Port：

![](https://i.imgur.com/INCTORj.png)

## 建立 Config file 和 Grok Patttern

我找到 Github 上已經有勇者寫好 pfSense 的 Grok pattern 了，所以直接拿來使用，把整個 [Repo](https://github.com/patrickjennings/logstash-pfSense) 給`clone`下來吧。

如果要新增更多自己的 Pattern，很多人會使用 [Grok Debugger](https://grokdebug.herokuapp.com/) 進行除錯。

![](https://i.imgur.com/zLrOWa5.png)

最上面就是輸入原始的 Log；中間的欄位輸入 Grok Pattern；如果有額外定義的 custom pattern (像 `logstash-pfSense/patterns` 裡的內容就是 custom pattern)，請將 **Add custom patterns** 打勾就會可以輸入了。最下方就是預覽 Parsed 後的結果。

`logstash-pfSense/conf.d` 裡的檔案複製到`/etc/logstash/conf.d`，`logstash-pfSense/patterns`複製到 `etc/logstash/patterns`。記得修改`01-inputs.conf`的 port 和`10-syslog.conf`的 IP，須對應到 pfSense 的 syslog 設定。還有`30-outputs.conf`的 Elasticsearch host IP。

#### `01-inputs.conf`
例子使用 Port `6514`
```conf
#tcp syslog stream via 5140
input {
  tcp {
    type => "syslog"
    port => 6514
  }
}
#udp syslogs stream via 5140
input {
  udp {
    type => "syslog"
    port => 6514
  }
}
```

#### `10-syslog.conf` 前半段
```conf
filter {
  if [type] == "syslog" {
    #change to pfSense ip address
    if [host] =~ /172\.30\.0\.1/ { # 這邊要修改
      mutate {
        add_tag => ["pfSense", "Ready"]
      }
    }
    if "Ready" not in [tags] {
      mutate {
        add_tag => [ "syslog" ]
      }
    }
  }
}
```

**架 ELK 需要特別注意服務之間溝通的 Port**，預設 **Elasticsearch** 會使用 <mark>Port `9200`</mark> 來接收 Logstash 的資料，因此`30-outputs.conf`的設定請參考下面：

#### `30-outputs.conf`
```conf
output {
  if [type] == "syslog" {
    elasticsearch {
        hosts => "172.30.0.5:9200"
        index => "logstash-pfSense-%{+YYYY.MM.dd}"
    }
    stdout { codec => rubydebug }
  }
}
```

接著啟動 Logstash。
```bash
sudo service logstash start
```

如何確定 Logstash 有接收到 Syslog?
確認 OS 有 Listen 我設定的 Port `6514` 後，我是使用 TCPDump 查看，因為目前還沒架起 Elasticsearch，所以用很原始的方式看。

![](https://i.imgur.com/AqOehqC.png)

要驗證 Log 被 parse 的結果，可以從 Wireshark 複製 log 內容，到 Grok Debugger 試試看套用 pattern。接著下一篇就是架 Elasticsearch。

## References
- [Structure of a Config File | Logstash Reference [7.6] | Elastic](https://www.elastic.co/guide/en/logstash/7.6/configuration-file-structure.html)
- [System Monitoring — Remote Logging with Syslog | pfSense Documentation](https://docs.netgate.com/pfSense/en/latest/book/monitoring/remote-logging.html)
- [patrickjennings/logstash-pfSense: Logstash configuration for pfSense syslog events.](https://github.com/patrickjennings/logstash-pfSense)

