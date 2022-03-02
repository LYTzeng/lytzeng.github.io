---
date: 2020-01-23T18:36:17+08:00
lang: zh-Hant-TW
description: Mininet 是一個虛擬網路的模擬器，可以在單一主機、VM 或 Container 中執行。一開始我想用 Container 的環境玩玩看 Mininet，主要目的是學習 OpenFlow。為了產出研究所課程的期末加分報告，自訂題目中我選擇 OpenFlow，也是想藉由這個機會學習 OpenFlow，而這一系列文章同時作為學習筆記與報告題材。
sidebar: auto
tags: ["Mininet", "OpenFlow"]
categories: ["SDN"]
title: OpenFlow 1.5 從入門到交報告 (一) - Mininet 基本概念
aliases: ["/posts/sdn/introduction-to-mininet.html"]
---


![](http://mininet.org/images/frontpage_diagram.png)

Mininet 是一個虛擬網路的模擬器，可以在單一主機、VM 或 Container 中執行。一開始我想用 Container 的環境玩玩看 Mininet，主要目的是學習 OpenFlow。為了產出研究所課程的期末加分報告，自訂題目中我選擇 OpenFlow，也是想藉由這個機會學習 OpenFlow，而這一系列文章同時作為學習筆記與報告題材。本篇主要以 Mininet 官方的 [openflow-tutorial](https://github.com/mininet/openflow-tutorial/wiki/Home) 為主軸，唯一不同是我使用 Container 環境取代官方的 OVF VM 範本。

## SDN 與 OpenFlow
簡易來說，Controller 負責決定封包如何轉發，即負責 Control Plane 的部分。Controller 透過南向介面與 Switch 溝通，並調整 Switch 的 Flow Table，更動 Flow Table 中的 Entry。 而 Switch 只會依照 Flow Entry 的規則進行轉發，也就是負責 Data Plane 的部分。OpenFlow 就是 Controller 和交換器間的溝通協定。

![](/images/SDN&#32;Structure.png)

基本上 Cotroller 和 Switch 的溝通是透過南向介面 (Southbound Interfaces)，包含 OpenFlow、NETCONF、SNMP 等。而北向介面 (Northbound Interfaces) 是各種服務與 Controller 溝通的介面，例如許多廠牌如 Cisco ACI 解決方案，具備讓使用者透過圖形介面操作 Controller 的功能，則北向介面使用 RESTful API 居多。北向介面也包含 gRPC、RESTCONF、YANG Data Model 等。接著使用 Mininet 操作 SDN 拓樸，我會把實際做過的 Commands 列出，並搭配解釋說明。

![](/images/Southbound&#32;&&#32;Northbound.png)

## 安裝 Docker

因為常常要在各種 VM 安裝 Docker，所以乾脆偷懶把安裝指另一次寫成腳本執行。這個 Script 主要會安裝最新版本的 Docker CE，如果要安裝特定版本，請不要使用此 Script。

*註: 我使用的環境是 Ubuntu 18.04*
請先用過一次`sudo`，再直接執行：
```bash
bash <(curl https://gist.githubusercontent.com/LYTzeng/bc67f4cb051f92ce7206a4a585229e25/raw/e403038cfa5c8ff2f4900425882213b57f31d0bb/install_docker_ubuntu.sh)
```
原始 Script 如下，參考自官方步驟。
```bash
# Install using the repository
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
# Install the latest version of Docker Engine - Community and containerd
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
# Disable swap
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

## 把 Mininet Image 拉下來並執行
```bash
docker pull iwaseyusuke/mininet
docker run -it --rm --privileged -e DISPLAY \
             -v /tmp/.X11-unix:/tmp/.X11-unix \
             -v /lib/modules:/lib/modules \
             iwaseyusuke/mininet
```
這時注意 Command line 應該已經進入到容器裡面了。

## 建立簡易拓樸
一個 OpenFlow 簡易拓樸可以包含一個 OpenFlow Controller、OpenFlow Switch 和三個 Host。執行以下指令建立網路。
```bash
mn --topo single,3 --mac --switch ovsk --controller remote
```
`--topo single,3` 告訴 Mininet 產生 Single-Switch Topology，包含 3 個 Hosts
`--mac` 讓 Hosts 的 MAC 等同於 IP Address
`--switch ovsk` 指定交換器類型為 OVSK
`--controller remote` 讓 OpenFlow Switch 指到 Remote 的 Controller，預設是 localhost

這個網路架構會長這樣，參考自官方 Tutorial

![](https://i.imgur.com/Swvc2xk.png)

觀察指令輸出可以看到一些細節。
```batch
root@8987721c841b:~# mn --topo single,3 --mac --switch ovsk --controller remote
　*** Error setting resource limits. Mininet's performance may be affected.
　*** Creating network
　*** Adding controller
　Unable to contact the remote controller at 127.0.0.1:6653
　Unable to contact the remote controller at 127.0.0.1:6633
　Setting remote controller to 127.0.0.1:6653
　*** Adding hosts:
　h1 h2 h3 
　*** Adding switches:
　s1 
　*** Adding links:
　(h1, s1) (h2, s1) (h3, s1) 
　*** Configuring hosts
　h1 h2 h3 
　*** Starting controller
　c0
　*** Starting 1 switches
　s1 ...
　*** Starting CLI:
mininet>
```


## Mininet 指令
在 `mininet>` 下可以執行很多指令，包含查看節點、在節點直營特定指令等等。
查看所有節點：
```batch
mininet> nodes
　available nodes are:
　c0 h1 h2 h3 s1
```
在 `h1` 節點執行指令：
```batch
mininet> h1 ifconfig
h1-eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.0.0.1  netmask 255.0.0.0  broadcast 10.255.255.255
        inet6 fe80::200:ff:fe00:1  prefixlen 64  scopeid 0x20<link>
        ether 00:00:00:00:00:01  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 16  bytes 1316 (1.3 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
我覺得有一個指令也很方便，可以查看 Host 連接到 Switch 的第幾 Port：
```batch
mininet> net
　h1 h1-eth0:s1-eth1
　h2 h2-eth0:s1-eth2
　h3 h3-eth0:s1-eth3
　s1 lo:  s1-eth1:h1-eth0 s1-eth2:h2-eth0 s1-eth3:h3-eth0
　c0
```

為了之後的操作，這時候需要開多個 CLI 到同一個 Container 裡面，可以開多個視窗SSH進入VM，先用`docker ps`查看容器名稱，再執行`exec`打開多個 bash。
```batch
root@ubuntu:~# docker ps
　CONTAINER ID        IMAGE                 COMMAND             CREATED             STATUS              PORTS                          NAMES
　ba8cee17af88        iwaseyusuke/mininet   "/ENTRYPOINT.sh"    9 minutes ago       Up 9 minutes        6633/tcp, 6640/tcp, 6653/tcp   　confident_wilson

root@ubuntu:~# docker exec -it ba8cee17af88 /bin/bash
root@ba8cee17af88:~#
```

## ovs-ofctl
查看 Switch 的 Port 狀態和其他資訊，在另一個 CLI 輸入
```bash
ovs-ofctl show s1
```
輸出如下：
```
root@ba8cee17af88:~# ovs-ofctl show s1
OFPT_FEATURES_REPLY (xid=0x2): dpid:0000000000000001
n_tables:254, n_buffers:0
capabilities: FLOW_STATS TABLE_STATS PORT_STATS QUEUE_STATS ARP_MATCH_IP
actions: output enqueue set_vlan_vid set_vlan_pcp strip_vlan mod_dl_src mod_dl_dst mod_nw_src mod_nw_dst mod_nw_tos mod_tp_src mod_tp_dst
 1(s1-eth1): addr:f2:38:c2:6b:c5:b2
     config:     0
     state:      0
     current:    10GB-FD COPPER
     speed: 10000 Mbps now, 0 Mbps max
 2(s1-eth2): addr:e6:0d:27:7a:72:bd
     config:     0
     state:      0
     current:    10GB-FD COPPER
     speed: 10000 Mbps now, 0 Mbps max
 3(s1-eth3): addr:1e:a6:3b:48:61:41
     config:     0
     state:      0
     current:    10GB-FD COPPER
     speed: 10000 Mbps now, 0 Mbps max
 LOCAL(s1): addr:16:10:2d:1b:8a:46
     config:     PORT_DOWN
     state:      LINK_DOWN
     speed: 0 Mbps now, 0 Mbps max
OFPT_GET_CONFIG_REPLY (xid=0x4): frags=normal miss_send_len=0
```

輸出 Flow table，目前Controller 沒有任何 Flow，所以是空的：
```
ovs-ofctl dump-flows s1
```

這時候 Hosts 之間還不能溝通，因為 Switch 無法得知進來的封包要往哪送，因此要在 Controller 加入 Flow。先加入 h1 和 h2 之間的 Flow。
```
ovs-ofctl add-flow s1 in_port=1,actions=output:2
ovs-ofctl add-flow s1 in_port=2,actions=output:1
```

會發現 h1 可以 ping h2 了

```
mininet> h1 ping -c4 h2
PING 10.0.0.2 (10.0.0.2) 56(84) bytes of data.
64 bytes from 10.0.0.2: icmp_seq=1 ttl=64 time=0.072 ms
64 bytes from 10.0.0.2: icmp_seq=2 ttl=64 time=0.082 ms
```

再 Dump 一次 Flow table，有東西了：
```
root@ba8cee17af88:~# ovs-ofctl dump-flows s1
 cookie=0x0, duration=314.375s, table=0, n_packets=25, n_bytes=1694, in_port="s1-eth1" actions=output:"s1-eth2"
 cookie=0x0, duration=285.479s, table=0, n_packets=16, n_bytes=1316, in_port="s1-eth2" actions=output:"s1-eth1"
```

恭喜！這時候你已經成功在 SDN 環境讓兩台電腦溝通了！~~有沒有回想到第一天學CCNA時的興奮呢哈~~

## 觀察 Controller 啟動時和 Switch 的交涉訊息
我們會透過 `tcpdump` 監聽封包，並輸出檔案至 Wireshark 讀取。因為容器中的檔案系統會隨著容器生命週期存亡，因此要透過 Volume 使容器中的檔案系統和本機的某個資料夾建立連結。砍掉剛才的容器，先建立一個存放`tcpdump` 輸出 pcap 檔的資料夾，用下面的指令建立一個新的：
```bash
mkdir ~/tcpdump
docker run -it --rm --privileged -e DISPLAY \
             -v /tmp/.X11-unix:/tmp/.X11-unix \
             -v /lib/modules:/lib/modules \
             -v ~/tcpdump:/tcpdump \
             iwaseyusuke/mininet
```
接著我們需要至少3個 CLI 視窗，方便操作。我是使用 Hyper Terminal 操作，分割4個視窗很方便。其中3個都`exec`到 Container 裡面。

![](https://i.imgur.com/XCik8CR.png)

首先啟動 Controller，讓控制器在 localhost 的 6633 port 執行：
```
root@13559bb74f97:~# ovs-testcontroller ptcp:6633 &
[1] 89
root@13559bb74f97:~#
```
然後另一個視窗開 tcpdump：
```
root@13559bb74f97:~# tcpdump -i lo -w /tcpdump/take1.pcap
tcpdump: listening on lo, link-type EN10MB (Ethernet), capture size 262144 bytes
```
接著啟動 Mininet：
```
root@13559bb74f97:~# mn --topo single,3 --mac --switch ovsk --controller remote
```
這時候 ping 看看，可以通：
```shell
mininet> h1 ping -c4 h2
```
結束 tcpdump，將檔案放進 Wireshark 研究封包

![](https://i.imgur.com/1ihFAFw.png)


### Startup 訊息
從 Wireshark 中觀察到，整個 Mininet 啟動時，Switch 和 Controller 進行了許多來往。分別如下：

| Type                  | 傳送方向           | 描述                                                                            |
| --------------------- | ------------------ | ------------------------------------------------------------------------------- |
| OFPT_HELLO            | Controller->Switch | Controller 傳送 Hello 訊息，裡面包含 Openlow 版本，例如版本 1.4 就是 0x05       |
| OFPT_HELLO            | Switch->Controller | Switch 回傳支援的版本                                                           |
| OFPT_FEATURES_REQUEST | Controller->Switch | Controller 向 Switch 要求支援的功能                                             |
| OFPT_SET_CONFIG       | Controller->Switch | 裡面有一個 Flags 欄位，我看起來應該是對 Switch 進行設定的部分                   |
| OFPT_FEATURES_REPLY   | Switch->Controller | Switch 將支援的功能回應給 Controller，如圖 ![](https://i.imgur.com/Pv5yTzS.png) |
| OFPT_PORT_STATUS      | Switch->Controller | 通知 Controller ，交換器上 port 的狀態                                          |
 
接著是一些常見的封包， `OFPT_PACKET_IN` 和 `OFPT_PACKET_OUT` ，可能還會有 `OFPT_FLOW_MOD`。



| Type              | 傳送方向           | 描述                                                   |
| ----------------- | ------------------ | ------------------------------------------------------ |
| OFPT_PACKET_IN    | Switch->Controller | 當 Switch 不知道要把封包往哪送，則送給 Controller 處理 |
| OFPT_PACKET_OUT   | Controller->Switch | Controller 送給 Switch 的封包                          |
| OFPT_FLOW_MOD     | Controller->Switch | 指示 Switch 新增 Flow table 欄位                       |
| OFPT_FLOW_EXPIRED | Switch->Controller | Flow 過期                                              |

下一篇，也是這次期末報告的下半段，會介紹 Ryu Controller 的簡易操作和程式碼。

## References
- [Install Docker Engine - Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-engine---community)
- [iwaseyusuke/mininet - Docker Hub](https://hub.docker.com/r/iwaseyusuke/mininet/)
- [Home · mininet/openflow-tutorial Wiki](https://github.com/mininet/openflow-tutorial/wiki)
- [Mount volumes into a running container - Koki - Medium](https://medium.com/kokster/mount-volumes-into-a-running-container-65a967bee3b5)
- [ovs-testcontroller - simple OpenFlow controller for testing](http://www.openvswitch.org/support/dist-docs/ovs-testcontroller.8.html)
- [Docker 實戰系列（三）：使用 Volume 保存容器內的數據 - Larry・Blog](https://larrylu.blog/using-volumn-to-persist-data-in-container-a3640cc92ce4)

<Disqus/>