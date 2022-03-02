---
date: 2020-01-04T09:32:07+08:00
lang: zh-Hant-TW
description: 支援 OpenFlow 的 Controller 有很多種，Ryu 就是其中一員。Ryu 是一個開源的 OpenFlow Controller 開發框架，主要語言是 Python，由日本 NTT 的實驗室創造。截至目前為止，Ryu 支援到 OpenFlow 1.5。
sidebar: auto
tags: ["Ryu", "OpenFlow", "Python"]
categories: ["SDN"]
title: OpenFlow 1.5 從入門到交報告 (二) - Ryu
aliases: ["/posts/sdn/introduction-to-ryu.html"]
---


支援 OpenFlow 的 Controller 有很多種，Ryu 就是其中一員。Ryu 是一個開源的 OpenFlow Controller 開發框架，主要語言是 Python，由日本 NTT 的實驗室創造。截至目前為止，Ryu 支援到 OpenFlow 1.5。本篇同時是 2019 研究所課程報告下半部，上一篇介紹了 [Mininnet 基本概念](https://lytzeng.github.io/posts/sdn/introduction-to-mininet.html#sdn-%E8%88%87-openflow)，有興去可以參照。

## 安裝 Ryu
```bash
pip install ryu
```
Ryu 部分功能有依賴其他套件，可以一併安裝。
```bash
pip install -r <(curl https://raw.githubusercontent.com/osrg/ryu/master/tools/optional-requires)
```
還有一些是必要的 Dependencies：
```bash
apt-get install -y gcc python-dev libffi-dev libssl-dev libxml2-dev libxslt1-dev zlib1g-dev
```

## 或是，使用 Ryu Container
我很喜歡 Container 超好用，環境單純，不需要煩惱架設環境所踩到的雷，不過要想清楚的是 Container 間的網路怎麼連，目前我想讓 Mininet 容器能夠和 Ryu Controller 容器可以互連，因此使用預設的 bridge mode 即可。為了讓 Ryu 容器可以吃到我之後寫的 Python，所以要 Mount 一個 Volume 對應到主機的某資料夾。
```bash
mkdir -p ~/ryu_test ~/tcpdump
# 開 Ryu
docker pull osrg/ryu
docker run -it --name ryu \
             -v ~/ryu_test:/ryu_test \
             --hostname ryu \
             osrg/ryu
```
接著到另一個視窗開 Mininet
```bash
docker run -it --rm --privileged -e DISPLAY \
             --name mininet \
             -v /tmp/.X11-unix:/tmp/.X11-unix \
             -v /lib/modules:/lib/modules \
             -v ~/tcpdump:/tcpdump \
             --hostname mininet \
             iwaseyusuke/mininet
```
查看 Ryu 的 IP，是`172.17.0.2`：
```
root@ryu:~# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
20: eth0@if21: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default      
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

## 執行 Simple Switch

運行 Ryu 的 Simple Switch: `ryu-manager ryu.app.simple_switch_15`， 測試 Controller 是否可以被 Mininet 連接。

```
root@ryu:~# ryu-manager ryu.app.simple_switch_15
loading app ryu.app.simple_switch_15
loading app ryu.controller.ofp_handler
instantiating app ryu.app.simple_switch_15 of SimpleSwitch15
instantiating app ryu.controller.ofp_handler of OFPHandler
```

接著啟動 Mininet，控制器指定到 Ryu 的 IP：
```
root@mininet:~# mn --topo single,3 --mac \
        --switch ovsk,protocols=OpenFlow15 \
        --controller remote,ip=172.17.0.2
...
mininet>
```
你會看見 Ryu 輸出一堆封包訊息：
```
packet in 1 00:00:00:00:00:01 33:33:ff:00:00:01 1
packet in 1 00:00:00:00:00:03 33:33:00:00:00:16 3
packet in 1 00:00:00:00:00:02 33:33:00:00:00:16 2
packet in 1 00:00:00:00:00:01 33:33:00:00:00:16 1
...
```
最後 Pingall 測試 Hosts 之間可以互通。
```
mininet> pingall
*** Ping: testing ping reachability
h1 -> h2 h3 
h2 -> h1 h3 
h3 -> h1 h2
*** Results: 0% dropped (6/6 received)
```

## Ryu 開發框架結構
下面這個程式還沒有任何功能，不過已經是一個最基本可以運行的 Ryu 程式。`ryu.base.app_manager.RyuApp(*_args, **_kwargs)` 這個 Class 是 Ryu 的 Base class，我們自己寫的 Class 必須繼承這個 Class。文件中規定，Constructor 中必須呼叫 Parent 的 Constructor，換句話說就是 `__init__` 中必須呼叫 `RyuApp.__init__`，也就是`super.__init__`。
```python
from ryu.base import app_manager
class L2SW(app_manager.RyuApp):
    def __init__(self, *args, **kwargs):
        super(L2SW, self).__init__(*args, **kwargs)
```
接下來觀察 `simple_switch` 原始碼，藉此了解如何開發 Ryu Controller。
Code [在官方 Repo 中](https://github.com/osrg/ryu/blob/master/ryu/app/simple_switch_15.py)

### 指定 OpenFlow 版本
這個例子指定了 OpenFlow 1.5 版本
```python
from ryu.ofproto import ofproto_v1_5
...
OFP_VERSIONS = [ofproto_v1_5.OFP_VERSION]
```

### Decorator `@set_ev_cls(ev_cls, dispatchers=None)`
Ryu 讓我們透過 `@set_ev_cls` 這個 Decorated Method 來定義 Event Handeler 的角色，當該定義的 Event 發生時，就會執行 Decorator 下方的函式。這個 Decorated Method 接收兩個參數： `ev_cls` 和 `dispatcher`。`ev_cls` 這個 Event Class 參數要放入 OpenFlow 的 Messages and Structures，依照 OpenFlow 標準分為 Controller-to-Switch、Asynchronous 與 Symmetric，以 OpenFlow 1.5 為例，[文件中](https://ryu.readthedocs.io/en/latest/ofproto_v1_5_ref.html)就有列出所有的種類以及他們的作用。 `dispatcher` 參數用來決定要處理哪個 Negotiation Phase (Switch 與 Controller 交涉的階段)，總共有四個階段，取決於你放的 `ev_cls` 為何。

| Negotiation phase                             | Description                                                                  |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| `ryu.controller.handler.HANDSHAKE_DISPATCHER` | Sending and waiting for hello message                                        |
| `ryu.controller.handler.CONFIG_DISPATCHER`    | Version negotiated and sent features-request message                         |
| `ryu.controller.handler.MAIN_DISPATCHER`      | Switch-features message received and sent set-config message                 |
| `ryu.controller.handler.DEAD_DISPATCHER`      | Disconnect from the peer. Or disconnecting due to some unrecoverable errors. |

例如 `simple_switch_15.py` 中，就包含兩個 Decorated Method。以下這段程式碼，[`ofp_event.EventOFPSwitchFeatures`](https://ryu.readthedocs.io/en/latest/ofproto_v1_5_ref.html#ryu.ofproto.ofproto_v1_5_parser.OFPSwitchFeatures)代表函式會在 Switch 回應 Feature Reply 時觸發，對應到的 Negotiation phase 即為 `CONFIG_DISPATCHER`。
```python
@set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
```
`ofp_event.EventOFPPacketIn` 是 Packet-In Message，意即當 Switch 收到進入的封包時，所發送給 Controller 的訊息。當 Switch 收到封包時觸發，對應到的 Negotiation phase 為 `MAIN_DISPATCHER`。
```python
@set_ev_cls(ofp_event.EventOFPPacketIn, MAIN_DISPATCHER)
    def _packet_in_handler(self, ev):
```
### Add Flow
再來看看 Function 裡面的變數是如何使用的。
```python
@set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)
def switch_features_handler(self, ev):
    datapath = ev.msg.datapath
    ofproto = datapath.ofproto
    parser = datapath.ofproto_parser
    match = parser.OFPMatch()
    actions = [parser.OFPActionOutput(ofproto.OFPP_CONTROLLER,
                                      ofproto.OFPCML_NO_BUFFER)]
    self.add_flow(datapath, 0, match, actions)
```
- `ev.msg.datapath` 代表 Switch 物件
- `datapath.ofproto` 與 `datapath.ofproto_parser` 代表著 OpenFlow protocol 物件
- [`OFPMatch`](https://github.com/osrg/ryu/blob/704dcc786aa9f975a9d486d9a1699fd7995ecd4b/ryu/ofproto/ofproto_v1_5_parser.py#L607) 用來指定 Flow Match，共[40種](https://www.opennetworking.org/wp-content/uploads/2014/10/openflow-switch-v1.5.1.pdf#page=78)。這裡沒有定義何 Match。
- `OFPActionOutput` 用來決定封包要往哪個連接埠送出，主要參數是兩個 Flag，`port` 就是 Output port，`max_len` 指送給 Controller 的最大長度。`OFPP_CONTROLLER` 就是送到 Controller，`OFPCML_NO_BUFFER` 代表封包完整地給 Controller，這些值都是一個 Flag，可以在[原始碼](https://github.com/osrg/ryu/blob/704dcc786aa9f975a9d486d9a1699fd7995ecd4b/ryu/ofproto/ofproto_v1_5.py)查看。
```python
def add_flow(self, datapath, priority, match, actions):
    ofproto = datapath.ofproto
    parser = datapath.ofproto_parser

    inst = [parser.OFPInstructionActions(ofproto.OFPIT_APPLY_ACTIONS,
                                         actions)]

    mod = parser.OFPFlowMod(datapath=datapath, priority=priority,
                            match=match, instructions=inst)
    datapath.send_msg(mod)
```
- `OFPInstructionActions` 就是 OpenFlow 的 Instruction，種類由第一個參數設定，三選一如下，第二個參數放入 `OFPInstructionActions`。
    - `OFPIT_WRITE_ACTIONS`
    - `OFPIT_APPLY_ACTIONS`
    - `OFPIT_CLEAR_ACTIONS`
- `OFPFlowMod` 用來讓 Controller 改變 Flow Table。
    - `table_id` 如果有要指定 Table 來放入 Entry 可使用
    - `instructions` 中用來傳入 `OFPInstructionActions`
- 最後透過 `datapath.send_msg(mod)` 將 OpenFlow 訊息送到交換器


## References
- [Getting Started — Ryu 4.30 documentation](https://ryu.readthedocs.io/en/latest/getting_started.html)
- [osrg/ryu - Docker Hub](https://hub.docker.com/r/osrg/ryu)
- [Install Mininet and Ryu Controller](http://ernie55ernie.github.io/mininet/ryu/python/2019/03/25/install-mininet-and-ryu-controller.html)
- [osrg/ryu: Ryu component-based software defined networking framework](https://github.com/osrg/ryu)
- [openflow-switch-v1.5.1.pdf](https://www.opennetworking.org/wp-content/uploads/2014/10/openflow-switch-v1.5.1.pdf#page=78)
- 張衛峰，*深度解析SDN：利益、戰略、技術、實踐*，台灣：碁峰，2014，第 68 至 83 頁。

<Disqus/>