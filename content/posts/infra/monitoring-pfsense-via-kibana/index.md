---
date: 2020-03-14T12:07:47+08:00
lang: zh-Hant-TW
description: Kibana 能夠將資料視覺化成各種圖表並進行分析，同時提供 ELK Stack 的管理介面，架設完成的 ELK Stack 之後只需進入 Kibana，就可以透過這個 portal 瀏覽一切 Elastic 的服務。之前我將 pfSense 的 pfBlockerNG 防火牆阻擋紀錄透過 syslog 送給 Logstash，並且使用 Elasticsearch 接收已結構化的資料來提供全文搜尋服務，最後一步就是架設 Kibana 進行視覺化。
sidebar: auto
tags: ["ELK", "pfSense"]
category: Infra
categories: ["Infra"]
title: ELK Stack 整合 pfSense (三)：Kibana Dashboard
resources:
- name: "featured-image"
  src: "monitoring-pfsense-via-kibana.png"
aliases: ["/posts/infra/monitoring-pfsense-via-kibana.html"]
---


Kibana 能夠將資料視覺化成各種圖表並進行分析，同時提供 ELK Stack 的管理介面，架設完成的 ELK Stack 之後只需進入 Kibana，就可以透過這個 portal 瀏覽一切 Elastic 的服務。之前我將 pfSense 的 pfBlockerNG 防火牆阻擋紀錄透過 syslog 送給 Logstash，並且使用 Elasticsearch 接收已結構化的資料來提供全文搜尋服務，最後一步就是架設 Kibana 進行視覺化。

整個 pfSense 與 ELK Stack 的架構如下面這張圖，架設過程中只要注意一下 Port 的對應其他都沒有太大的問題。

![](https://i.imgur.com/yMAxVaB.png)

## ELK Stack 整合 pfSense 系列文
- [ELK Stack 整合 pfSense (一)：將 pfSense 防火牆阻擋紀錄傳送到 Logstash](/posts/infra/sending-logs-from-pfsense-2-logstash.html)
- [ELK Stack 整合 pfSense (二)：Elasticsearch](/posts/infra/elasticsearch-receives-data-from-logstash)
- [本篇] ELK Stack 整合 pfSense (三)：Kibana Dashboard

## 安裝 Kibana
我在 Ubuntu 18.04 的環境上安裝，只需輸入下面指令。
```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
sudo apt-get update && sudo apt-get install kibana
```

接著要對 Kibana 進行設定
```bash
sudo vim /etc/kibana/kibana.yml
```
在 `kibana.yml` 找到 `server.host` 並且改成主機的 IP，如果沒有改這部分，Kibana 不會接收外部的連接。找到 `elasticsearch.hosts` 並把參數改為 Elasticsearch 的 IP，Port 請對應到 9200。如果你把 ELK 架在同一台主機上，則不需要進行這段設定。
```
server.host: "172.30.0.6"
elasticsearch.hosts: ["http://172.30.0.5:9200"]
```

接著啟動 Kibana
```bash
sudo systemctl start kibana.service
```

然後我們可以透過`http://YOURDOMAIN.com:5601`直接進入他的 portal。
![](https://i.imgur.com/vn67CeJ.png)

接著需要與 Elasticsearch 建立連接。

## 連接 Elasticsearch
點選齒輪圖示，選擇 **Index Patterns** > **Create Index Pattern**
![](https://i.imgur.com/z9gE53u.png)
![](https://i.imgur.com/VYqBDQg.png)

接著輸入 `logstash-pfsense-*`，其實這就是我們在 Logstash Output 自訂的 Index，有對應的 Index 會看到下面有跳出來對應的 Index。接著 Next step 後
![](https://i.imgur.com/OKM12LY.png)

接著選擇 **@timestamp**，然後 Next step
![](https://i.imgur.com/R0ShhBG.png)

接著會看到所有結構化的資料，可以準備建立圖表。
![](https://i.imgur.com/IGxHLwU.png)

## 建立圖表和 Dashboard

建立圖表要先從 Visualize 建立單一圖表，然後再從 Dashboard 加入圖表。因為圖表有很多種，可以思考哪些欄位適合用哪種圖表呈現。
![](https://i.imgur.com/GXMM8KM.png)

如果要建立地圖熱點圖，需使用 Coordinate Map，但是 7.6 版預設不會讓你建立，所以需要增加一行設定到`kibana.yml`。

```bash
echo 'xpack.maps.showMapVisualizationTypes: true' >> /etc/kibana/kibana.yml
```

接著在 Visualization 就會出現 Coordinate Map 的選項。
![](https://i.imgur.com/hpXBNX5.png)

想知道 pfSense 阻擋的連接都是來自哪些國家，所以先新增一個 Bucket，應該會自動偵測到 `geoip.location` 欄位，也就是經緯度。
![](https://i.imgur.com/JUWEdww.png)

設定完畢按下播放(?)鍵預覽結果
![](https://i.imgur.com/DrOrjEB.png)

我們還可以新增 Filter，`action.keyword`等於`block`代表 pfBlocker 做出阻擋的紀錄。
![](https://i.imgur.com/ewYpmZA.png)

結束時記得儲存
![](https://i.imgur.com/s3IAyrA.png)

然後新增 Dashboard，選擇左上角 Add 來新增剛才製作的 Visualization，最後一樣記得 Save。
![](https://i.imgur.com/v6IhQep.png)

還可以統計所有可疑連線的目的 port 圓餅圖
![](https://i.imgur.com/tK69XeD.png)

這樣基本的儀表板便完成了，可以依需求和情境新增其他圖表，我自己做完的結果大概像這個樣子，搭配 Dark Theme 實在是非常有看頭。

![](https://i.imgur.com/raKrlRU.png)

