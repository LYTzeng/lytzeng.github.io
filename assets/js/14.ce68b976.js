(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{241:function(a,t,s){"use strict";s.r(t);var e=s(2),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"/images/infra/monitoring-pfsense-via-kibana.png",loading:"lazy"}})]),a._v(" "),s("h1",{attrs:{id:"elk-stack-整合-pfsense-三-：kibana-dashboard"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#elk-stack-整合-pfsense-三-：kibana-dashboard"}},[a._v("#")]),a._v(" ELK Stack 整合 pfSense (三)：Kibana Dashboard")]),a._v(" "),s("PageEdit"),a._v(" "),s("div",[s("TagLinks")],1),a._v(" "),s("p",[a._v("Kibana 能夠將資料視覺化成各種圖表並進行分析，同時提供 ELK Stack 的管理介面，架設完成的 ELK Stack 之後只需進入 Kibana，就可以透過這個 portal 瀏覽一切 Elastic 的服務。之前我將 pfSense 的 pfBlockerNG 防火牆阻擋紀錄透過 syslog 送給 Logstash，並且使用 Elasticsearch 接收已結構化的資料來提供全文搜尋服務，最後一步就是架設 Kibana 進行視覺化。")]),a._v(" "),s("h2",{attrs:{id:"elk-stack-整合-pfsense-系列文"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#elk-stack-整合-pfsense-系列文"}},[a._v("#")]),a._v(" \bELK Stack 整合 pfSense 系列文")]),a._v(" "),s("ul",[s("li",[s("RouterLink",{attrs:{to:"/posts/infra/sending-logs-from-pfsense-2-logstash.html"}},[a._v("ELK Stack 整合 pfSense (一)：將 pfSense 防火牆阻擋紀錄傳送到 Logstash")])],1),a._v(" "),s("li",[s("a",{attrs:{href:"/posts/infra/elasticsearch-receives-data-from-logstash"}},[a._v("ELK Stack 整合 pfSense (二)：Elasticsearch")])]),a._v(" "),s("li",[a._v("[本篇] ELK Stack 整合 pfSense (三)：Kibana Dashboard")])]),a._v(" "),s("h2",{attrs:{id:"安裝-kibana"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安裝-kibana"}},[a._v("#")]),a._v(" 安裝 Kibana")]),a._v(" "),s("p",[a._v("我在 Ubuntu 18.04 的環境上安裝，只需輸入下面指令。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" apt-key "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("add")]),a._v(" -\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" apt-transport-https\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"deb https://artifacts.elastic.co/packages/7.x/apt stable main"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tee")]),a._v(" -a /etc/apt/sources.list.d/elastic-7.x.list\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" update "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&&")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" kibana\n")])])]),s("p",[a._v("接著要對 Kibana 進行設定")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" /etc/kibana/kibana.yml\n")])])]),s("p",[a._v("在 "),s("code",[a._v("kibana.yml")]),a._v(" 找到 "),s("code",[a._v("server.host")]),a._v(" 並且改成主機的 IP，如果沒有改這部分，Kibana 不會接收外部的連接。找到 "),s("code",[a._v("elasticsearch.hosts")]),a._v(" 並把參數改為 Elasticsearch 的 IP，Port 請對應到 9200。如果你把 ELK 架在同一台主機上，則不需要進行這段設定。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('server.host: "172.30.0.6"\nelasticsearch.hosts: ["http://172.30.0.5:9200"]\n')])])]),s("p",[a._v("接著啟動 Kibana")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl start kibana.service\n")])])]),s("p",[a._v("然後我們可以透過"),s("code",[a._v("http://YOURDOMAIN.com:5601")]),a._v("直接進入他的 portal。\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/vn67CeJ.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("接著需要與 Elasticsearch 建立連接。")]),a._v(" "),s("h2",{attrs:{id:"連接-elasticsearch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#連接-elasticsearch"}},[a._v("#")]),a._v(" 連接 Elasticsearch")]),a._v(" "),s("p",[a._v("點選齒輪圖示，選擇 "),s("strong",[a._v("Index Patterns")]),a._v(" > "),s("strong",[a._v("Create Index Pattern")]),a._v(" "),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/z9gE53u.png",loading:"lazy"}}),a._v(" "),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/VYqBDQg.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("接著輸入 "),s("code",[a._v("logstash-pfsense-*")]),a._v("，其實這就是我們在 Logstash Output 自訂的 Index，有對應的 Index 會看到下面有跳出來對應的 Index。接著 Next step 後\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/OKM12LY.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("接著選擇 "),s("strong",[a._v("@timestamp")]),a._v("，然後 Next step\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/R0ShhBG.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("接著會看到所有結構化的資料，可以準備建立圖表。\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/IGxHLwU.png",loading:"lazy"}})]),a._v(" "),s("h2",{attrs:{id:"建立圖表和-dashboard"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#建立圖表和-dashboard"}},[a._v("#")]),a._v(" 建立圖表和 Dashboard")]),a._v(" "),s("p",[a._v("建立圖表要先從 Visualize 建立單一圖表，然後再從 Dashboard 加入圖表。因為圖表有很多種，可以思考哪些欄位適合用哪種圖表呈現。\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/GXMM8KM.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("如果要建立地圖熱點圖，需使用 Coordinate Map，但是 7.6 版預設不會讓你建立，所以需要增加一行設定到"),s("code",[a._v("kibana.yml")]),a._v("。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'xpack.maps.showMapVisualizationTypes: true'")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">>")]),a._v(" /etc/kibana/kibana.yml\n")])])]),s("p",[a._v("接著在 Visualization 就會出現 Coordinate Map 的選項。\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/hpXBNX5.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("想知道 pfSense 阻擋的連接都是來自哪些國家，所以先新增一個 Bucket，應該會自動偵測到 "),s("code",[a._v("geoip.location")]),a._v(" 欄位，也就是經緯度。\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/JUWEdww.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("設定完畢按下播放(?)鍵預覽結果\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/DrOrjEB.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("我們還可以新增 Filter，"),s("code",[a._v("action.keyword")]),a._v("等於"),s("code",[a._v("block")]),a._v("代表 pfBlocker 做出阻擋的紀錄。\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/ewYpmZA.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("結束時記得儲存\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/s3IAyrA.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("然後新增 Dashboard，選擇左上角 Add 來新增剛才製作的 Visualization，最後一樣記得 Save。\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/v6IhQep.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("還可以統計所有可疑連線的目的 port 圓餅圖\n"),s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/tK69XeD.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("這樣基本的儀表板便完成了，可以依需求和情境新增其他圖表，我自己做完的結果大概像這個樣子，搭配 Dark Theme 實在是非常有看頭。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/raKrlRU.png",loading:"lazy"}})]),a._v(" "),s("Disqus")],1)}),[],!1,null,null,null);t.default=n.exports}}]);