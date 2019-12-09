(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{240:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vuepress-部落格架設與折騰-一"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-部落格架設與折騰-一"}},[t._v("#")]),t._v(" VuePress 部落格架設與折騰 (一)")]),t._v(" "),a("PageEdit"),t._v(" "),a("div",[a("TagLinks")],1),t._v(" "),a("p",[a("img",{attrs:{src:"https://vuepress.vuejs.org/hero.png",alt:""}})]),t._v(" "),a("p",[t._v("這個部落格決定使用 VuePress 架設，過程中遇到種種問題以及官方文件寫不清楚的地方，因此這一系列 VuePress 筆記同時也作為造福人群的文章吧。會想使用 VuePress，一方面是因為想用 Vue 來寫，另一方面則是需要高度的 Customization。使用其他框架雖然很多功能都已經實現，但是前端很多東西如顏色、Navbar、Sidebar等需要更細的調整，我個人也不想看到整個 Theme 和其他網站「撞衫」，所以比較偏好大部分自己來。")]),t._v(" "),a("h2",{attrs:{id:"安裝-yarn-和-vuepress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安裝-yarn-和-vuepress"}},[t._v("#")]),t._v(" 安裝 Yarn 和 VuePress")]),t._v(" "),a("p",[t._v("VuePress 官方建議使用 yarn ，我的環境已經安裝 npm，因此使用npm安裝yarn。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -g "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v("\n")])])]),a("p",[t._v("接著 cd 到你的專案路徑地底下，初始化 vuepress")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -D vuepress\n")])])]),a("p",[t._v("新增"),a("code",[t._v("docs")]),t._v("資料夾，在底下建立"),a("code",[t._v("README.md")]),t._v("，這將會作為首頁的頁面。\nVuePress 預設將 "),a("code",[t._v("docs")]),t._v(" 當成網頁的根目錄，首頁就是"),a("code",[t._v("docs/README.md")]),t._v("\n接著在"),a("code",[t._v("package.json")]),t._v("新增 scripts 段落：")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"docs:dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vuepress dev docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"docs:build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vuepress build docs"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("對 yarn 來說"),a("code",[t._v("package.json")]),t._v(" 的 scripts 作用 "),a("a",{attrs:{href:"https://yarnpkg.com/lang/en/docs/package-json/#toc-scripts",target:"_blank",rel:"noopener noreferrer"}},[t._v("請見這裡"),a("OutboundLink")],1)])]),t._v(" "),a("p",[t._v("這樣編寫網頁時使用 "),a("code",[t._v("yarn docs:dev")]),t._v(" 開啟 "),a("a",{attrs:{href:"localhost:8080"}},[t._v("localhost:8080")]),t._v(" 開發環境，\n編寫完成要 Deploy 時使用"),a("code",[t._v("yarn docs:build")]),t._v(" 產生靜態網頁檔案，便可以 push 到 github pages。")]),t._v(" "),a("p",[t._v("整個專案架構會像這樣：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(".\n├── docs\n│   ├── .vuepress (Optional)\n│   │   ├── components (Optional)\n│   │   ├── dist (build 好的靜態檔案都在這裡，只要把這裡推上github pages即可)\n│   │   ├── theme (Optional)\n│   │   │   └── Layout.vue\n│   │   ├── public (Optional)\n│   │   ├── styles (Optional)\n│   │   │   ├── index.styl\n│   │   │   └── palette.styl\n│   │   ├── templates (Optional, Danger Zone)\n│   │   │   ├── dev.html\n│   │   │   └── ssr.html\n│   │   ├── config.js (Optional)\n│   │   └── enhanceApp.js (Optional)\n│   │ \n│   ├── README.md\n│   ├── guide\n│   │   └── README.md\n│   └── config.md\n│ \n└── package.json\n")])])]),a("h2",{attrs:{id:"使用佈景主題"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用佈景主題"}},[t._v("#")]),t._v(" 使用佈景主題")]),t._v(" "),a("p",[t._v("目前示範使用 Vue 的預設佈景主題 Default Theme，安裝 Theme 就像安裝 Vue  Plugin 一樣，需要在"),a("code",[t._v("docs/config.js")]),t._v("增加以下內容：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    extend"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vuepress/theme-default'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("code",[t._v("@vuepress/")]),t._v("開頭的主題名稱為 Vue 官方的主題。\n接著就可以在 markdown 文件加入設定值 (此方法只適用於 Default theme)，這段設定其實是 YAML 格式，一定要放在 markdown 文件的第一行開始。這個之後會稱作 "),a("a",{attrs:{href:"https://vuepress.vuejs.org/guide/frontmatter.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Frontmatter"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("home")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("heroImage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /hero.png\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("heroText")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Hero Title\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tagline")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Hero subtitle\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("actionText")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Get Started →\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("actionLink")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /guide/\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("features")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Simplicity First\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("details")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Minimal setup with markdown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("centered project structure helps you focus on writing.\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("Powered\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("details")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Enjoy the dev experience of Vue + webpack"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" use Vue components in markdown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" and develop custom themes with Vue.\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Performant\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("details")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" VuePress generates pre"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("rendered static HTML for each page"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" and runs as an SPA once a page is loaded.\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("footer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" MIT Licensed "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" Copyright © 2018"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("present Evan You\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n")])])]),a("p",[t._v("YAML frontmatter 會使用 "),a("a",{attrs:{href:"https://github.com/jonschlinkert/gray-matter",target:"_blank",rel:"noopener noreferrer"}},[t._v("gray-matter"),a("OutboundLink")],1),t._v(" 處理以上的設定。\n其實你也可以使用 "),a("a",{attrs:{href:"https://vuepress.vuejs.org/guide/frontmatter.html#alternative-frontmatter-formats",target:"_blank",rel:"noopener noreferrer"}},[t._v("json 或 TOML"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("p",[t._v("如果想要複寫主題的樣式，可以參考這個"),a("a",{attrs:{href:"https://vuepress-examples.netlify.com/demos/extending/#modifying-the-default-theme",target:"_blank",rel:"noopener noreferrer"}},[t._v("網站"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("h2",{attrs:{id:"基本頁面元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本頁面元素"}},[t._v("#")]),t._v(" 基本頁面元素")]),t._v(" "),a("h3",{attrs:{id:"navbar-導覽列區塊"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#navbar-導覽列區塊"}},[t._v("#")]),t._v(" Navbar 導覽列區塊")]),t._v(" "),a("h4",{attrs:{id:"logo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#logo"}},[t._v("#")]),t._v(" Logo:")]),t._v(" "),a("p",[a("strong",[a("code",[t._v(".vuepress/config.js")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    logo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/assets/img/logo.png'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("疑，這裡有圖片相對路徑，所以要設定 Base URL，假設你等等要放在 "),a("code",[t._v("yourname.github.io/blogs")]),t._v("，那麼你的 Base URL 就是 "),a("code",[t._v("/blogs/")]),t._v("，設定如下：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    base"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/blogs/'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("在 md 裡面就要使用 HTML 標籤帶入圖片，"),a("code",[t._v("$withBase")]),t._v("讓我們日後更動路徑不需要每個地方改：")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("$withBase('/test.jpg')"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("alt")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("當然如果是要直接部署在"),a("code",[t._v("yourname.github.io")]),t._v("，那麼 base 就是 "),a("code",[t._v("'/'")]),t._v("。")]),t._v(" "),a("h4",{attrs:{id:"超連結"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#超連結"}},[t._v("#")]),t._v(" 超連結 :")]),t._v(" "),a("p",[a("strong",[a("code",[t._v(".vuepress/config.js")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    nav"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Home'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Guide'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/guide/'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'External'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://google.com'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("如果想使用巢狀結構也是可以的：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    nav"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Categories'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/categories/'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Tags'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/tags/'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'About'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/about/'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Frontend'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" items"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Vue'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/posts/frontend/Vue/'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'###'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("附帶一提，Vuepress 會對連外的連結加上 "),a("code",[t._v('target="_blank" rel="noopener noreferrer"')]),t._v("，就是開啟新分頁，而"),a("code",[t._v('rel="noopener noreferrer"')]),t._v("和資安考量有關，詳細請見"),a("a",{attrs:{href:"https://pointjupiter.com/what-noopener-noreferrer-nofollow-explained/",target:"_blank",rel:"noopener noreferrer"}},[t._v("這裡"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("h3",{attrs:{id:"側邊攔"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#側邊攔"}},[t._v("#")]),t._v(" 側邊攔")]),t._v(" "),a("p",[a("strong",[a("code",[t._v(".vuepress/config.js")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    sidebar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/page-a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/page-b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Explicit link text'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("這裡要注意一點，官方文件範例如上，但是這會導致"),a("code",[t._v("文章段落導覽")]),t._v("的功能"),a("code",[t._v("失效")]),t._v("！所以我建議不要在這裡進行 Sidebar 的設定(不要將 "),a("code",[t._v("sidebar[]")]),t._v(" 放入 "),a("code",[t._v("themeConfig{}")]),t._v(" 底下)。文章段落導覽功能，只要在每篇文章的 Frontmatter 放入 "),a("code",[t._v("sidebar: auto")]),t._v(" 即可。")]),t._v(" "),a("p",[t._v("要做額外的客製化，以及文章段落導覽的小小 Hack，後續文章會再說明。")]),t._v(" "),a("h3",{attrs:{id:"全站搜尋功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#全站搜尋功能"}},[t._v("#")]),t._v(" 全站搜尋功能")]),t._v(" "),a("p",[t._v("VuePress 自帶搜尋功能真是太開心了，只要使用內建 plugin 即可。\n"),a("strong",[a("code",[t._v(".vuepress/config.js")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在這裡使用 plugin")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vuepress/search'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            searchMaxSuggestions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"首頁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#首頁"}},[t._v("#")]),t._v(" 首頁")]),t._v(" "),a("p",[t._v("VuePress 其實原本是設計給 Documentation 網頁使用，而首頁就是讓你放大大的 Logo。不過如果是部落格，比較常見是放置最新文章等內容，如何整個改掉的部分後續文章再說明，這裡先按照官方文件。")]),t._v(" "),a("p",[t._v("依照剛才的檔案架構，"),a("code",[t._v("docs")]),t._v(" 是網站的 Root，Root 的 "),a("code",[t._v("README.md")]),t._v(" 裡面為 Frontmatter 加上 "),a("code",[t._v("home:true")]),t._v(" 它就會認定這是首頁囉。其他參數如下：")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("home")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("heroImage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /hero.png\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("heroText")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Hero Title\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tagline")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Hero subtitle\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("actionText")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Get Started →\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("actionLink")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /guide/\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("features")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Simplicity First\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("details")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Minimal setup with markdown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("centered project structure helps you focus on writing.\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("Powered\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("details")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Enjoy the dev experience of Vue + webpack"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" use Vue components in markdown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" and develop custom themes with Vue.\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("title")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Performant\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("details")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" VuePress generates pre"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("rendered static HTML for each page"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" and runs as an SPA once a page is loaded.\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("footer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" MIT Licensed "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" Copyright © 2018"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("present Evan You\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n")])])]),a("p",[t._v("這樣的頁面會長的和 VuePress 官方網站一模一樣。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://i.imgur.com/YEyjlxo.png",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"部署到-github-pages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#部署到-github-pages"}},[t._v("#")]),t._v(" 部署到 Github Pages")]),t._v(" "),a("ol",[a("li",[t._v("確認已經跑過 "),a("code",[t._v("yarn docs:build")]),t._v(" 或 "),a("code",[t._v("vuepress build docs")]),t._v("。")]),t._v(" "),a("li",[t._v("在 "),a("code",[t._v("docs/.vuepress/dist")]),t._v(" 底下初始化一個 Git repo：")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -A\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'deploy'")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[t._v("接著就可以 "),a("code",[t._v("git remote add origin git@github.com:username/repo.git")]),t._v(" 並 "),a("code",[t._v("push")]),t._v(" 上去。如果不熟 Git 和 Github 看"),a("a",{attrs:{href:"https://gitbook.tw/chapters/github/push-to-github.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("這裡"),a("OutboundLink")],1),t._v("。")])]),t._v(" "),a("li",[a("p",[t._v("確認是否成功 deploy 到 Github pages：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://i.imgur.com/wyPFHpN.png",alt:""}})]),t._v(" "),a("p",[t._v("Environment 點進去查看，像下面這樣就表示成功了：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://i.imgur.com/a1YIRND.png",alt:""}})])])]),t._v(" "),a("p",[t._v("之後會發更多 VuePress 客製化過程，包含這個部落格使用的、自行開發的 Tags 功能、分類功能等，因為VuePress 原本都沒有這些功能。")])],1)}),[],!1,null,null,null);s.default=e.exports}}]);