(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{245:function(t,a,s){"use strict";s.r(a);var n=s(2),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"openflow-1-5-從入門到交報告-二-ryu"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#openflow-1-5-從入門到交報告-二-ryu"}},[t._v("#")]),t._v(" OpenFlow 1.5 從入門到交報告 (二) - Ryu")]),t._v(" "),s("PageEdit"),t._v(" "),s("div",[s("TagLinks")],1),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://osrg.github.io/ryu/css/images/LogoSet02.png",loading:"lazy"}})]),t._v(" "),s("p",[t._v("支援 OpenFlow 的 Controller 有很多種，Ryu 就是其中一員。Ryu 是一個開源的 OpenFlow Controller 開發框架，主要語言是 Python，由日本 NTT 的實驗室創造。截至目前為止，Ryu 支援到 OpenFlow 1.5。本篇同時是 2019 研究所課程報告下半部，上一篇介紹了 "),s("a",{attrs:{href:"https://lytzeng.github.io/posts/sdn/introduction-to-mininet.html#sdn-%E8%88%87-openflow",target:"_blank",rel:"noopener noreferrer"}},[t._v("Mininnet 基本概念"),s("OutboundLink")],1),t._v("，有興去可以參照。")]),t._v(" "),s("h2",{attrs:{id:"安裝-ryu"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安裝-ryu"}},[t._v("#")]),t._v(" 安裝 Ryu")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" ryu\n")])])]),s("p",[t._v("Ryu 部分功能有依賴其他套件，可以一併安裝。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -r "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" https://raw.githubusercontent.com/osrg/ryu/master/tools/optional-requires"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("還有一些是必要的 Dependencies：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -y gcc python-dev libffi-dev libssl-dev libxml2-dev libxslt1-dev zlib1g-dev\n")])])]),s("h2",{attrs:{id:"或是，使用-ryu-container"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#或是，使用-ryu-container"}},[t._v("#")]),t._v(" 或是，使用 Ryu Container")]),t._v(" "),s("p",[t._v("我很喜歡 Container 超好用，環境單純，不需要煩惱架設環境所踩到的雷，不過要想清楚的是 Container 間的網路怎麼連，目前我想讓 Mininet 容器能夠和 Ryu Controller 容器可以互連，因此使用預設的 bridge mode 即可。為了讓 Ryu 容器可以吃到我之後寫的 Python，所以要 Mount 一個 Volume 對應到主機的某資料夾。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -p ~/ryu_test ~/tcpdump\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 開 Ryu")]),t._v("\ndocker pull osrg/ryu\ndocker run -it --name ryu "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             -v ~/ryu_test:/ryu_test "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             --hostname ryu "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             osrg/ryu\n")])])]),s("p",[t._v("接著到另一個視窗開 Mininet")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("docker run -it --rm --privileged -e "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("DISPLAY")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             --name mininet "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             -v /tmp/.X11-unix:/tmp/.X11-unix "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             -v /lib/modules:/lib/modules "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             -v ~/tcpdump:/tcpdump "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             --hostname mininet "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n             iwaseyusuke/mininet\n")])])]),s("p",[t._v("查看 Ryu 的 IP，是"),s("code",[t._v("172.17.0.2")]),t._v("：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("root@ryu:~# ip a\n1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n       valid_lft forever preferred_lft forever\n20: eth0@if21: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default      \n    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0\n    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0\n       valid_lft forever preferred_lft forever\n")])])]),s("h2",{attrs:{id:"執行-simple-switch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#執行-simple-switch"}},[t._v("#")]),t._v(" 執行 Simple Switch")]),t._v(" "),s("p",[t._v("運行 Ryu 的 Simple Switch: "),s("code",[t._v("ryu-manager ryu.app.simple_switch_15")]),t._v("， 測試 Controller 是否可以被 Mininet 連接。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("root@ryu:~# ryu-manager ryu.app.simple_switch_15\nloading app ryu.app.simple_switch_15\nloading app ryu.controller.ofp_handler\ninstantiating app ryu.app.simple_switch_15 of SimpleSwitch15\ninstantiating app ryu.controller.ofp_handler of OFPHandler\n")])])]),s("p",[t._v("接著啟動 Mininet，控制器指定到 Ryu 的 IP：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("root@mininet:~# mn --topo single,3 --mac \\\n        --switch ovsk,protocols=OpenFlow15 \\\n        --controller remote,ip=172.17.0.2\n...\nmininet>\n")])])]),s("p",[t._v("你會看見 Ryu 輸出一堆封包訊息：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("packet in 1 00:00:00:00:00:01 33:33:ff:00:00:01 1\npacket in 1 00:00:00:00:00:03 33:33:00:00:00:16 3\npacket in 1 00:00:00:00:00:02 33:33:00:00:00:16 2\npacket in 1 00:00:00:00:00:01 33:33:00:00:00:16 1\n...\n")])])]),s("p",[t._v("最後 Pingall 測試 Hosts 之間可以互通。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("mininet> pingall\n*** Ping: testing ping reachability\nh1 -> h2 h3 \nh2 -> h1 h3 \nh3 -> h1 h2\n*** Results: 0% dropped (6/6 received)\n")])])]),s("h2",{attrs:{id:"ryu-開發框架結構"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ryu-開發框架結構"}},[t._v("#")]),t._v(" Ryu 開發框架結構")]),t._v(" "),s("p",[t._v("下面這個程式還沒有任何功能，不過已經是一個最基本可以運行的 Ryu 程式。"),s("code",[t._v("ryu.base.app_manager.RyuApp(*_args, **_kwargs)")]),t._v(" 這個 Class 是 Ryu 的 Base class，我們自己寫的 Class 必須繼承這個 Class。文件中規定，Constructor 中必須呼叫 Parent 的 Constructor，換句話說就是 "),s("code",[t._v("__init__")]),t._v(" 中必須呼叫 "),s("code",[t._v("RyuApp.__init__")]),t._v("，也就是"),s("code",[t._v("super.__init__")]),t._v("。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" ryu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("base "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" app_manager\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("L2SW")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app_manager"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RyuApp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("__init__")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("**")]),t._v("kwargs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("super")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("L2SW"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("__init__"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("**")]),t._v("kwargs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("接下來觀察 "),s("code",[t._v("simple_switch")]),t._v(" 原始碼，藉此了解如何開發 Ryu Controller。\nCode "),s("a",{attrs:{href:"https://github.com/osrg/ryu/blob/master/ryu/app/simple_switch_15.py",target:"_blank",rel:"noopener noreferrer"}},[t._v("在官方 Repo 中"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"指定-openflow-版本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指定-openflow-版本"}},[t._v("#")]),t._v(" 指定 OpenFlow 版本")]),t._v(" "),s("p",[t._v("這個例子指定了 OpenFlow 1.5 版本")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" ryu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ofproto "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ofproto_v1_5\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\nOFP_VERSIONS "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("ofproto_v1_5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFP_VERSION"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("h3",{attrs:{id:"decorator-set-ev-cls-ev-cls-dispatchers-none"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#decorator-set-ev-cls-ev-cls-dispatchers-none"}},[t._v("#")]),t._v(" Decorator "),s("code",[t._v("@set_ev_cls(ev_cls, dispatchers=None)")])]),t._v(" "),s("p",[t._v("Ryu 讓我們透過 "),s("code",[t._v("@set_ev_cls")]),t._v(" 這個 Decorated Method 來定義 Event Handeler 的角色，當該定義的 Event 發生時，就會執行 Decorator 下方的函式。這個 Decorated Method 接收兩個參數： "),s("code",[t._v("ev_cls")]),t._v(" 和 "),s("code",[t._v("dispatcher")]),t._v("。"),s("code",[t._v("ev_cls")]),t._v(" 這個 Event Class 參數要放入 OpenFlow 的 Messages and Structures，依照 OpenFlow 標準分為 Controller-to-Switch、Asynchronous 與 Symmetric，以 OpenFlow 1.5 為例，"),s("a",{attrs:{href:"https://ryu.readthedocs.io/en/latest/ofproto_v1_5_ref.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文件中"),s("OutboundLink")],1),t._v("就有列出所有的種類以及他們的作用。 "),s("code",[t._v("dispatcher")]),t._v(" 參數用來決定要處理哪個 Negotiation Phase (Switch 與 Controller 交涉的階段)，總共有四個階段，取決於你放的 "),s("code",[t._v("ev_cls")]),t._v(" 為何。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Negotiation phase")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[s("code",[t._v("ryu.controller.handler.HANDSHAKE_DISPATCHER")])]),t._v(" "),s("td",[t._v("Sending and waiting for hello message")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("ryu.controller.handler.CONFIG_DISPATCHER")])]),t._v(" "),s("td",[t._v("Version negotiated and sent features-request message")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("ryu.controller.handler.MAIN_DISPATCHER")])]),t._v(" "),s("td",[t._v("Switch-features message received and sent set-config message")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("ryu.controller.handler.DEAD_DISPATCHER")])]),t._v(" "),s("td",[t._v("Disconnect from the peer. Or disconnecting due to some unrecoverable errors.")])])])]),t._v(" "),s("p",[t._v("例如 "),s("code",[t._v("simple_switch_15.py")]),t._v(" 中，就包含兩個 Decorated Method。以下這段程式碼，"),s("a",{attrs:{href:"https://ryu.readthedocs.io/en/latest/ofproto_v1_5_ref.html#ryu.ofproto.ofproto_v1_5_parser.OFPSwitchFeatures",target:"_blank",rel:"noopener noreferrer"}},[s("code",[t._v("ofp_event.EventOFPSwitchFeatures")]),s("OutboundLink")],1),t._v("代表函式會在 Switch 回應 Feature Reply 時觸發，對應到的 Negotiation phase 即為 "),s("code",[t._v("CONFIG_DISPATCHER")]),t._v("。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@set_ev_cls")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ofp_event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("EventOFPSwitchFeatures"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" CONFIG_DISPATCHER"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("switch_features_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ev"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n")])])]),s("p",[s("code",[t._v("ofp_event.EventOFPPacketIn")]),t._v(" 是 Packet-In Message，意即當 Switch 收到進入的封包時，所發送給 Controller 的訊息。當 Switch 收到封包時觸發，對應到的 Negotiation phase 為 "),s("code",[t._v("MAIN_DISPATCHER")]),t._v("。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@set_ev_cls")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ofp_event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("EventOFPPacketIn"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" MAIN_DISPATCHER"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("_packet_in_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ev"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n")])])]),s("h3",{attrs:{id:"add-flow"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#add-flow"}},[t._v("#")]),t._v(" Add Flow")]),t._v(" "),s("p",[t._v("再來看看 Function 裡面的變數是如何使用的。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@set_ev_cls")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ofp_event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("EventOFPSwitchFeatures"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" CONFIG_DISPATCHER"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("switch_features_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ev"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    datapath "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ev"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("msg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("datapath\n    ofproto "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ofproto\n    parser "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ofproto_parser\n    match "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" parser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFPMatch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    actions "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("parser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFPActionOutput"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ofproto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFPP_CONTROLLER"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                                      ofproto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFPCML_NO_BUFFER"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_flow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" match"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" actions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ul",[s("li",[s("code",[t._v("ev.msg.datapath")]),t._v(" 代表 Switch 物件")]),t._v(" "),s("li",[s("code",[t._v("datapath.ofproto")]),t._v(" 與 "),s("code",[t._v("datapath.ofproto_parser")]),t._v(" 代表著 OpenFlow protocol 物件")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/osrg/ryu/blob/704dcc786aa9f975a9d486d9a1699fd7995ecd4b/ryu/ofproto/ofproto_v1_5_parser.py#L607",target:"_blank",rel:"noopener noreferrer"}},[s("code",[t._v("OFPMatch")]),s("OutboundLink")],1),t._v(" 用來指定 Flow Match，共"),s("a",{attrs:{href:"https://www.opennetworking.org/wp-content/uploads/2014/10/openflow-switch-v1.5.1.pdf#page=78",target:"_blank",rel:"noopener noreferrer"}},[t._v("40種"),s("OutboundLink")],1),t._v("。這裡沒有定義何 Match。")]),t._v(" "),s("li",[s("code",[t._v("OFPActionOutput")]),t._v(" 用來決定封包要往哪個連接埠送出，主要參數是兩個 Flag，"),s("code",[t._v("port")]),t._v(" 就是 Output port，"),s("code",[t._v("max_len")]),t._v(" 指送給 Controller 的最大長度。"),s("code",[t._v("OFPP_CONTROLLER")]),t._v(" 就是送到 Controller，"),s("code",[t._v("OFPCML_NO_BUFFER")]),t._v(" 代表封包完整地給 Controller，這些值都是一個 Flag，可以在"),s("a",{attrs:{href:"https://github.com/osrg/ryu/blob/704dcc786aa9f975a9d486d9a1699fd7995ecd4b/ryu/ofproto/ofproto_v1_5.py",target:"_blank",rel:"noopener noreferrer"}},[t._v("原始碼"),s("OutboundLink")],1),t._v("查看。")])]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add_flow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" priority"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" match"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" actions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    ofproto "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ofproto\n    parser "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ofproto_parser\n\n    inst "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("parser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFPInstructionActions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ofproto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFPIT_APPLY_ACTIONS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                                         actions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n    mod "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" parser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("OFPFlowMod"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("datapath"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" priority"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("priority"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                            match"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("match"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" instructions"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("inst"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    datapath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("send_msg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mod"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ul",[s("li",[s("code",[t._v("OFPInstructionActions")]),t._v(" 就是 OpenFlow 的 Instruction，種類由第一個參數設定，三選一如下，第二個參數放入 "),s("code",[t._v("OFPInstructionActions")]),t._v("。\n"),s("ul",[s("li",[s("code",[t._v("OFPIT_WRITE_ACTIONS")])]),t._v(" "),s("li",[s("code",[t._v("OFPIT_APPLY_ACTIONS")])]),t._v(" "),s("li",[s("code",[t._v("OFPIT_CLEAR_ACTIONS")])])])]),t._v(" "),s("li",[s("code",[t._v("OFPFlowMod")]),t._v(" 用來讓 Controller 改變 Flow Table。\n"),s("ul",[s("li",[s("code",[t._v("table_id")]),t._v(" 如果有要指定 Table 來放入 Entry 可使用")]),t._v(" "),s("li",[s("code",[t._v("instructions")]),t._v(" 中用來傳入 "),s("code",[t._v("OFPInstructionActions")])])])]),t._v(" "),s("li",[t._v("最後透過 "),s("code",[t._v("datapath.send_msg(mod)")]),t._v(" 將 OpenFlow 訊息送到交換器")])]),t._v(" "),s("h2",{attrs:{id:"references"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[t._v("#")]),t._v(" References")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://ryu.readthedocs.io/en/latest/getting_started.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Getting Started — Ryu 4.30 documentation"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://hub.docker.com/r/osrg/ryu",target:"_blank",rel:"noopener noreferrer"}},[t._v("osrg/ryu - Docker Hub"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"http://ernie55ernie.github.io/mininet/ryu/python/2019/03/25/install-mininet-and-ryu-controller.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Install Mininet and Ryu Controller"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/osrg/ryu",target:"_blank",rel:"noopener noreferrer"}},[t._v("osrg/ryu: Ryu component-based software defined networking framework"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.opennetworking.org/wp-content/uploads/2014/10/openflow-switch-v1.5.1.pdf#page=78",target:"_blank",rel:"noopener noreferrer"}},[t._v("openflow-switch-v1.5.1.pdf"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("張衛峰，"),s("em",[t._v("深度解析SDN：利益、戰略、技術、實踐")]),t._v("，台灣：碁峰，2014，第 68 至 83 頁。")])]),t._v(" "),s("Disqus")],1)}),[],!1,null,null,null);a.default=e.exports}}]);