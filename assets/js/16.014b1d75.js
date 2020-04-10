(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{293:function(a,t,s){"use strict";s.r(t);var r=s(1),e=Object(r.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"在實驗室自架-vmware-esxi-使用電腦教室汰換之電腦"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在實驗室自架-vmware-esxi-使用電腦教室汰換之電腦"}},[a._v("#")]),a._v(" 在實驗室自架 VMware ESXi — 使用電腦教室汰換之電腦")]),a._v(" "),s("PageEdit"),a._v(" "),s("div",[s("TagLinks")],1),a._v(" "),s("p",[a._v("自從離開前一間實習的公司，我就缺乏一個可以做 Lab 的地方，深刻感受到「伺服器戒斷症」。想當初公司是天天有 Server 可以使用，有 Cisco UCS、Hyperflex 和 Supermicro 的等等，離開後變成只能偶爾用 AWS Educate 帳號開個限制滿滿的 EC2。這次學校電腦教室有汰換下來的幾台電腦，聽說當初買一台要價 10 萬元，不過也是好幾年前了。規格不會太差，因此開始動起"),s("s",[a._v("歪")]),a._v("腦筋，抱了一台到座位旁開始研究。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/YZS8IRs.png",loading:"lazy"}})]),a._v(" "),s("h2",{attrs:{id:"規格"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#規格"}},[a._v("#")]),a._v(" 規格")]),a._v(" "),s("p",[a._v("規格還不差：")]),a._v(" "),s("ol",[s("li",[a._v("CPU: Intel Xeon E5 2620")]),a._v(" "),s("li",[a._v("MB: ASUS Z9PE-D8 WS 支援雙CPU、四通道、單科 CPU 支援到 64GB RAM、自帶兩個 1G 網路介面")]),a._v(" "),s("li",[a._v("RAM: 原本很寒酸的差了一條 8GB (PC3-12800)，我打算怒擴到 32GB")]),a._v(" "),s("li",[a._v("顯卡：NVIDIA GeForce GTX 780， 其實我裝 ESXi 根本不太需要顯卡")]),a._v(" "),s("li",[a._v("SSD: 200GB")]),a._v(" "),s("li",[a._v("HDD: 1TB")]),a._v(" "),s("li",[a._v("噢易還原卡 (畢竟電腦教室的電腦，正常)")])]),a._v(" "),s("h2",{attrs:{id:"前置作業"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前置作業"}},[a._v("#")]),a._v(" 前置作業")]),a._v(" "),s("p",[a._v("首先當然是拔掉還原卡，然後格式化硬碟，製作開機 USB 來安裝 ESXi。到 VMware 官網下載了 VMware vSphere Hypervisor 6.7 (ESXi)，接著使用 "),s("a",{attrs:{href:"https://rufus.ie/",target:"_blank",rel:"noopener noreferrer"}},[a._v("rufus"),s("OutboundLink")],1),a._v(" 做成開機片。 附帶一提，ESXi 是可以免費使用的，灌完記得去剛才的下載頁面，上面會有免費版序號，再從 ESXi web GUI 貼上即可，沒有期限，但不能搭配 vCenter。")]),a._v(" "),s("p",[a._v("回想以前灌 ESXi 時，安裝過程會做格式化，所以我就懶的手動自己格式化一遍。")]),a._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[a._v("結果，")]),a._v(" "),s("p",[a._v("這才是麻煩的開始。")])]),a._v(" "),s("h2",{attrs:{id:"踩雷"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#踩雷"}},[a._v("#")]),a._v(" 踩雷")]),a._v(" "),s("p",[a._v("安裝 ESXi 時，看進度條看很爽，結果重開機後出現：")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/iCiHrIQ.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("這簡直被澆冷水！ Google 之後發現和 Windows 有關，"),s("a",{attrs:{href:"https://communities.vmware.com/thread/429698",target:"_blank",rel:"noopener noreferrer"}},[a._v("這個提問有人回答"),s("OutboundLink")],1),a._v("。由於這台電腦的硬碟是安裝 Win 10，而 Win 10 會複寫 "),s("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%BC%95%E5%AF%BC%E8%AE%B0%E5%BD%95",target:"_blank",rel:"noopener noreferrer"}},[a._v("MBR"),s("OutboundLink")],1),a._v("分割表，使其有數值而非為0，所以造成 ESXi 錯誤，如下圖。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://communities.vmware.com/servlet/JiveServlet/showImage/2-2499870-50004/everpic-20150422_210158.367.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v('好，所以這時候只得乖乖格式化硬碟了，而且經過查詢，格式化不見得會清除 MBR 的部分，為了保險起見，MBR 那 512 Bytes 最好全部變成"0"。但是作業系統已經被我弄掉了，要格式化除非拔下來，不然就是製作 Linux Live 的開機片，使用指令操作格式化。因為該硬碟看起來不好拔，我決定使用後者的方法。(幸好今天一口氣帶了3個隨身碟)')]),a._v(" "),s("h2",{attrs:{id:"救星：gparted"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#救星：gparted"}},[a._v("#")]),a._v(" 救星：GParted")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://gparted.org/",target:"_blank",rel:"noopener noreferrer"}},[a._v("GParted"),s("OutboundLink")],1),a._v(" 是一個 partition editor，有圖形介面和 CLI，可以安裝到現有OS，也可以做成開機片 (正是我想要的！)。我到"),s("a",{attrs:{href:"https://gparted.org/download.php",target:"_blank",rel:"noopener noreferrer"}},[a._v("這裡"),s("OutboundLink")],1),a._v("下載 iso 映像檔，加上"),s("a",{attrs:{href:"http://www.linuxliveusb.com/",target:"_blank",rel:"noopener noreferrer"}},[a._v("LinuxLive USB Creator"),s("OutboundLink")],1),a._v("，把 USB 做成開機片。從 BIOS 設定 USB 開機後出現畫面了。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/MYhwsgp.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("第一次進到 GParted 選擇第一個選項就被雷了，馬上沒有畫面訊號。後來我選了第三個選項 "),s("code",[a._v("Other modes of GParted")]),a._v("。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/JGuzlWQ.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("接著選擇 "),s("code",[a._v("GParted Live Safe graphics settings")]),a._v("，如果你發現你的電腦也不能開啟 GParted，請嘗試這個選項。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/bdbjNxf.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("成功進入了，可以敲 command 了")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/NPbQOeD.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("首先列出所有硬碟：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" /dev/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("sh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("d*\n/dev/sda  /dev/sdb "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v(".\n")])])]),s("p",[a._v("接著猜猜看，我覺得目標是 "),s("code",[a._v("/dev/sda/")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("fdisk")]),a._v(" -l /dev/sda\n")])])]),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/P0b9guO.png",loading:"lazy"}})]),a._v(" "),s("h3",{attrs:{id:"處理mbr"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#處理mbr"}},[a._v("#")]),a._v(" 處理MBR")]),a._v(" "),s("p",[a._v("看容量，果然是 "),s("code",[a._v("sda")]),a._v("，我先把他的 MBR 抹成 0。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("dd")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("if")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("/dev/zero "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("of")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("/dev/sda "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("bs")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("512")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("count")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#然後再確認一次")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("fdisk")]),a._v(" -l /dev/sda\n")])])]),s("p",[a._v("你會發現 "),s("code",[a._v("GPT Table is corrupted")]),a._v(" 的錯誤訊息消失了。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/voXIWDy.png",loading:"lazy"}})]),a._v(" "),s("h3",{attrs:{id:"切磁區"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#切磁區"}},[a._v("#")]),a._v(" 切磁區")]),a._v(" "),s("p",[a._v("我想用 "),s("a",{attrs:{href:"https://zh.wikipedia.org/wiki/GUID%E7%A3%81%E7%A2%9F%E5%88%86%E5%89%B2%E8%A1%A8",target:"_blank",rel:"noopener noreferrer"}},[a._v("GPT"),s("OutboundLink")],1),a._v("，所以接著使用 "),s("code",[a._v("parted")]),a._v("工具進行磁區分割，這目的是為了讓 ESXi installer 更有可能認出這顆硬碟。所以我只切一個磁區，指定範圍從 1 到 240GB，它會自動掠過 MBR 和 GPT的部分，所以"),s("code",[a._v("START")]),a._v('可以放心打上"1"。')]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/D10gxIy.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("也可以用下面這行指令代替：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("parted")]),a._v(" /dev/sda mklabel gpt mkpart P1 fat32 "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(" 240GB\n")])])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[a._v("注意：")]),a._v(" "),s("p",[a._v("使用這些指令請格外小心！")])]),a._v(" "),s("h3",{attrs:{id:"格式化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#格式化"}},[a._v("#")]),a._v(" 格式化")]),a._v(" "),s("p",[a._v("接著使用 "),s("code",[a._v("mkfs")]),a._v(" 格式化，保險起見使用 FAT32，不要用 ext2 或 ext3，文件有提到這可能會讓 ESXi 安裝失敗，至少我使用 FAT32 最後成功安裝了。VMware 會把硬碟格式化成 VMFS，但是安裝前也要注意格式，減少踩雷機率。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("mkfs.vfat -F "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("32")]),a._v(" /dev/sda1\n")])])]),s("p",[a._v("重新安裝，成功。看到熟悉的黃灰畫面。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"","data-src":"https://i.imgur.com/0LtDy0Z.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("折騰半天，終於成功在 LAB 擁有自己的 Server 了 "),s("s",[a._v("不用花自己的電費和硬體$$")])]),a._v(" "),s("Disqus")],1)}),[],!1,null,null,null);t.default=e.exports}}]);