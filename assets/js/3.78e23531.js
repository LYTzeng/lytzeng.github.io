(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{123:function(t,e,a){},124:function(t,e,a){},126:function(t,e,a){},135:function(t,e,a){},136:function(t,e,a){},137:function(t,e,a){},138:function(t,e,a){},139:function(t,e,a){},140:function(t,e,a){},141:function(t,e,a){},142:function(t,e,a){},143:function(t,e,a){},144:function(t,e,a){},145:function(t,e,a){},162:function(t,e,a){"use strict";a.r(e);a(117);var i=a(65),n={name:"SidebarGroup",props:["item","open","collapsable","depth"],components:{DropdownTransition:a(163).a},beforeCreate:function(){this.$options.components.SidebarLinks=a(162).default},methods:{isActive:i.d}},s=(a(232),a(0)),r=Object(s.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"sidebar-group",class:[{collapsable:t.collapsable,"is-sub-group":0!==t.depth},"depth-"+t.depth]},[t.item.path?a("router-link",{staticClass:"sidebar-heading clickable",class:{open:t.open,active:t.isActive(t.$route,t.item.path)},attrs:{to:t.item.path},nativeOn:{click:function(e){return t.$emit("toggle")}}},[a("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?a("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]):a("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[a("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?a("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),a("DropdownTransition",[t.open||!t.collapsable?a("SidebarLinks",{staticClass:"sidebar-group-items",attrs:{items:t.item.children,sidebarDepth:t.item.sidebarDepth,depth:t.depth+1}}):t._e()],1)],1)}),[],!1,null,null,null).exports;a(67),a(233);function o(t,e,a,i){return t("router-link",{props:{to:e,activeClass:"",exactActiveClass:""},class:{active:i,"sidebar-link":!0}},a)}function l(t,e,a,n,s){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;return!e||r>s?null:t("ul",{class:"sidebar-sub-headers"},e.map((function(e){var c=Object(i.d)(n,a+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[o(t,a+"#"+e.slug,e.title,c),l(t,e.children,a,n,s,r+1)])})))}var c={functional:!0,props:["item","sidebarDepth"],render:function(t,e){var a=e.parent,n=a.$page,s=(a.$site,a.$route),r=a.$themeConfig,c=a.$themeLocaleConfig,u=e.props,h=u.item,p=u.sidebarDepth,d=Object(i.d)(s,h.path),f="auto"===h.type?d||h.children.some((function(t){return Object(i.d)(s,h.basePath+"#"+t.slug)})):d,v="external"===h.type?function(t,e,a){return t("a",{attrs:{href:e,target:"_blank",rel:"noopener noreferrer"},class:{"sidebar-link":!0}},[a,t("OutboundLink")])}(t,h.path,h.title||h.path):o(t,h.path,h.title||h.path,f),g=[n.frontmatter.sidebarDepth,p,c.sidebarDepth,r.sidebarDepth,1].find((function(t){return void 0!==t})),m=c.displayAllHeaders||r.displayAllHeaders;return"auto"===h.type?[v,l(t,h.children,h.basePath,s,g)]:(f||m)&&h.headers&&!i.c.test(h.path)?[v,l(t,Object(i.b)(h.headers),h.path,s,g)]:v}};a(234);function u(t,e){return"group"===e.type&&e.children.some((function(e){return"group"===e.type?u(t,e):"page"===e.type&&Object(i.d)(t,e.path)}))}var h={name:"SidebarLinks",components:{SidebarGroup:r,SidebarLink:Object(s.a)(c,void 0,void 0,!1,null,null,null).exports},props:["items","depth","sidebarDepth"],data:function(){return{openGroupIndex:0}},created:function(){this.refreshIndex()},watch:{$route:function(){this.refreshIndex()}},methods:{refreshIndex:function(){var t=function(t,e){for(var a=0;a<e.length;a++){var i=e[a];if(u(t,i))return a}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup:function(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive:function(t){return Object(i.d)(this.$route,t.regularPath)}}},p=Object(s.a)(h,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.items.length?a("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(e,i){return a("li",{key:i},["group"===e.type?a("SidebarGroup",{attrs:{item:e,open:i===t.openGroupIndex,collapsable:e.collapsable||e.collapsible,depth:t.depth},on:{toggle:function(e){return t.toggleGroup(i)}}}):a("SidebarLink",{attrs:{sidebarDepth:t.sidebarDepth,item:e}})],1)})),0):t._e()}),[],!1,null,null,null);e.default=p.exports},163:function(t,e,a){"use strict";var i={name:"DropdownTransition",methods:{setHeight:function(t){t.style.height=t.scrollHeight+"px"},unsetHeight:function(t){t.style.height=""}}},n=(a(217),a(0)),s=Object(n.a)(i,(function(){var t=this.$createElement;return(this._self._c||t)("transition",{attrs:{name:"dropdown"},on:{enter:this.setHeight,"after-enter":this.unsetHeight,"before-leave":this.setHeight}},[this._t("default")],2)}),[],!1,null,null,null);e.a=s.exports},168:function(t,e,a){"use strict";var i=a(123);a.n(i).a},169:function(t,e,a){"use strict";var i=a(124);a.n(i).a},178:function(t,e,a){"use strict";var i=a(126);a.n(i).a},217:function(t,e,a){"use strict";var i=a(135);a.n(i).a},219:function(t,e,a){"use strict";var i=a(136);a.n(i).a},220:function(t,e,a){"use strict";var i=a(137);a.n(i).a},221:function(t,e,a){"use strict";var i=a(138);a.n(i).a},230:function(t,e,a){"use strict";var i=a(139);a.n(i).a},231:function(t,e,a){"use strict";var i=a(140);a.n(i).a},232:function(t,e,a){"use strict";var i=a(141);a.n(i).a},234:function(t,e,a){"use strict";var i=a(142);a.n(i).a},235:function(t,e,a){"use strict";var i=a(143);a.n(i).a},236:function(t,e,a){"use strict";var i=a(144);a.n(i).a},237:function(t,e,a){"use strict";var i=a(145);a.n(i).a},242:function(t,e,a){"use strict";a.r(e);a(18),a(70),a(117),a(165);var i=a(65),n={props:{item:{required:!0}},computed:{link:function(){return Object(i.a)(this.item.link)},exact:function(){var t=this;return this.$site.locales?Object.keys(this.$site.locales).some((function(e){return e===t.link})):"/"===this.link}},methods:{isExternal:i.e,isMailto:i.f,isTel:i.g,focusoutAction:function(){this.$emit("focusout")}}},s=a(0),r=Object(s.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.isExternal(t.link)?a("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.isMailto(t.link)||t.isTel(t.link)?null:"_blank",rel:t.isMailto(t.link)||t.isTel(t.link)?null:"noopener noreferrer"},on:{focusout:t.focusoutAction}},[t._v("\n  "+t._s(t.item.text)+"\n  "),a("OutboundLink")],1):a("router-link",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact},nativeOn:{focusout:function(e){return t.focusoutAction(e)}}},[t._v(t._s(t.item.text))])}),[],!1,null,null,null).exports;a(47),a(48),a(167);function o(t,e){return this.$site.pages.filter((function(t){return t.path.indexOf("/posts/")>=0})).sort((function(t,e){var a=new Date(t.firstCreated).getTime();return new Date(e.firstCreated).getTime()-a})).slice(t,e)}var l={data:function(){return{start:0,end:5}},computed:{},methods:{recentPosts:o,scroll:function(){var t=this;window.onscroll=function(){Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)+window.innerHeight===document.documentElement.offsetHeight&&(t.end+=5)}}},mounted:function(){this.scroll()}},c=(a(168),{components:{NavLink:r,RecentPosts:Object(s.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",t._l(t.recentPosts(t.start,t.end),(function(e){return a("li",[a("a",{attrs:{href:e.path}},[t._v(t._s(e.title))]),t._v(" "),a("p",{staticStyle:{"margin-top":"0",color:"#bdbdbd"}},[a("svg",{staticStyle:{display:"inline-block","vertical-align":"middle","will-change":"transform"},attrs:{fill:"#ececec",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M26 4.03h-4v-2h-2v2h-8v-2h-2v2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-20a2 2 0 0 0-2-2zm0 22H6v-14h20zm0-16H6v-4h4v2h2v-2h8v2h2v-2h4z"}}),a("title",[t._v("Calendar")])]),t._v("\n        "+t._s(e.firstCreated)+" \n        "),a("svg",{staticStyle:{display:"inline-block","vertical-align":"middle","will-change":"transform","padding-left":"8px"},attrs:{fill:"#ececec",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M11.17 6l3.42 3.41.58.59H28v16H4V6h7.17m0-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H16l-3.41-3.41A2 2 0 0 0 11.17 4z"}}),a("title",[t._v("Folder")])]),t._v(" "),a("router-link",{staticStyle:{display:"inline","font-size":"16px","padding-left":"0","padding-right":"0",color:"#bdbdbd"},attrs:{to:{path:"/categories/#"+e.frontmatter.category}}},[t._v(t._s(e.frontmatter.category)+" ")]),t._v(" "),a("br",{staticClass:"new-line-for-mobile"}),t._v(" "),a("svg",{staticClass:"post-icon",staticStyle:{display:"inline-block","vertical-align":"middle","will-change":"transform"},attrs:{fill:"#ececec",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M18.52 30a3 3 0 0 1-2.12-.88L2.88 15.61A3 3 0 0 1 2 13.49V5a3 3 0 0 1 3-3h8.49a3 3 0 0 1 2.12.88l13.51 13.51a3 3 0 0 1 0 4.25l-8.48 8.48a3 3 0 0 1-2.12.88zM5 4a1 1 0 0 0-1 1v8.49a1 1 0 0 0 .3.71l13.51 13.51a1 1 0 0 0 1.41 0l8.49-8.49a1 1 0 0 0 0-1.41L14.2 4.3a1 1 0 0 0-.71-.3H5z"}}),a("path",{attrs:{d:"M10 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"}}),a("title",[t._v("Tag")])]),t._v(" "),t._l(e.frontmatter.tags,(function(e){return a("span",[t._v(t._s(e)+"  ")])}))],2),t._v(" "),a("p",[t._v(t._s(e.frontmatter.description)),a("a",{staticStyle:{display:"inline","font-size":"16px","padding-left":"0"},attrs:{href:e.path}},[t._v(" ... Read more")])])])})),0)])}),[],!1,null,null,null).exports},computed:{data:function(){return this.$page.frontmatter},actionLink:function(){return{link:this.data.actionLink,text:this.data.actionText}}}}),u=(a(169),Object(s.a)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"home",attrs:{"aria-labelledby":"main-title"}},[a("div",{staticClass:"bio",staticStyle:{width:"80%","padding-left":"10%","padding-right":"10%"}},[t._m(0),t._v(" "),a("p",{staticClass:"name"},[t._v("Oscar Tseng")]),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"center","padding-top":"10px",margin:"0"}},[a("span",[a("a",{attrs:{href:"https://github.com/LYTzeng",target:"_blank",rel:"noopener",title:"Github"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45 3 3 0 0 0 4.08 1.16 2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76 5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7 5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z"}})])])]),t._v(" "),a("span",[a("a",{attrs:{href:"https://www.linkedin.com/in/li-yen-tseng/",target:"_blank",rel:"noopener",title:"Linkedin"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M26.21 4H5.79A1.78 1.78 0 0 0 4 5.73V26.2a1.77 1.77 0 0 0 1.79 1.73h20.42A1.77 1.77 0 0 0 28 26.2V5.73A1.78 1.78 0 0 0 26.21 4zm-15.1 20.41H7.59V13h3.52zm-1.72-13a2.07 2.07 0 0 1-2.07-2.02 2 2 0 0 1 2.07-2.07 2.07 2.07 0 0 1 0 4.13zm15.09 12.93H21v-5.58c0-1.33 0-3.06-1.86-3.06S17 17.16 17 18.63v5.65h-3.56V13h3.32v1.5h.07a3.72 3.72 0 0 1 3.39-1.86c3.59 0 4.26 2.4 4.26 5.45z"}})])])]),t._v(" "),a("span",[a("a",{attrs:{href:"mailto:oscar217b@gmail.com",target:"_blank",rel:"noopener",title:"mail"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-2.2 2L16 14.78 6.2 8zM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24z"}}),a("title",[t._v("Email")])])])]),t._v(" "),a("span",[a("a",{attrs:{href:"/rss.xml",target:"_blank",rel:"noopener",title:"rss",type:"application/rss+xml"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M8 18c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm22-4h-2C28 13 19 4 8 4V2c12.1 0 22 9.9 22 22z"}}),a("path",{attrs:{d:"M22 24h-2c0-6.6-5.4-12-12-12v-2c7.7 0 14 6.3 14 14z"}}),a("title",[t._v("Rss")])])])]),t._v(" "),t._m(1)]),t._v(" "),a("Content",{staticClass:"theme-default-content custom short-aboutme"})],1),t._v(" "),a("RecentPosts")],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-holder"},[e("img",{attrs:{src:"https://avatars3.githubusercontent.com/u/30722178?s=460&v=4"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("a",{attrs:{href:"https://netlab.csie.ntut.edu.tw",target:"_blank",rel:"noopener",title:"NTUT Netlab"}},[e("img",{staticStyle:{height:"32px",width:"auto"},attrs:{src:"/Netlab.svg"}})])])}],!1,null,null,null).exports),h=a(240),p=(a(178),Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sidebar-button",on:{click:function(e){return t.$emit("toggle-sidebar")}}},[a("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"}},[a("path",{attrs:{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"}})])])}),[],!1,null,null,null).exports),d=(a(179),a(69),a(241)),f=(a(52),a(67),a(163)),v=a(218),g=a.n(v),m={components:{NavLink:r,DropdownTransition:f.a},data:function(){return{open:!1}},props:{item:{required:!0}},computed:{dropdownAriaLabel:function(){return this.item.ariaLabel||this.item.text}},methods:{toggle:function(){this.open=!this.open},isLastItemOfArray:function(t,e){return g()(e)===t}},watch:{$route:function(){this.open=!1}}},b=(a(219),{components:{NavLink:r,DropdownLink:Object(s.a)(m,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dropdown-wrapper",class:{open:t.open}},[a("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":t.dropdownAriaLabel},on:{click:t.toggle}},[a("span",{staticClass:"title"},[t._v(t._s(t.item.text))]),t._v(" "),a("span",{staticClass:"arrow",class:t.open?"down":"right"})]),t._v(" "),a("DropdownTransition",[a("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"nav-dropdown"},t._l(t.item.items,(function(e,i){return a("li",{key:e.link||i,staticClass:"dropdown-item"},["links"===e.type?a("h4",[t._v(t._s(e.text))]):t._e(),t._v(" "),"links"===e.type?a("ul",{staticClass:"dropdown-subitem-wrapper"},t._l(e.items,(function(i){return a("li",{key:i.link,staticClass:"dropdown-subitem"},[a("NavLink",{attrs:{item:i},on:{focusout:function(a){t.isLastItemOfArray(i,e.items)&&t.isLastItemOfArray(e,t.item.items)&&t.toggle()}}})],1)})),0):a("NavLink",{attrs:{item:e},on:{focusout:function(a){t.isLastItemOfArray(e,t.item.items)&&t.toggle()}}})],1)})),0)])],1)}),[],!1,null,null,null).exports},computed:{userNav:function(){return this.$themeLocaleConfig.nav||this.$site.themeConfig.nav||[]},nav:function(){var t=this,e=this.$site.locales;if(e&&Object.keys(e).length>1){var a=this.$page.path,i=this.$router.options.routes,n=this.$site.themeConfig.locales||{},s={text:this.$themeLocaleConfig.selectText||"Languages",ariaLabel:this.$themeLocaleConfig.ariaLabel||"Select language",items:Object.keys(e).map((function(s){var r,o=e[s],l=n[s]&&n[s].label||o.lang;return o.lang===t.$lang?r=a:(r=a.replace(t.$localeConfig.path,s),i.some((function(t){return t.path===r}))||(r=s)),{text:l,link:r}}))};return[].concat(Object(d.a)(this.userNav),[s])}return this.userNav},userLinks:function(){return(this.nav||[]).map((function(t){return Object.assign(Object(i.h)(t),{items:(t.items||[]).map(i.h)})}))},repoLink:function(){var t=this.$site.themeConfig.repo;return t?/^https?:/.test(t)?t:"https://github.com/".concat(t):null},repoLabel:function(){if(this.repoLink){if(this.$site.themeConfig.repoLabel)return this.$site.themeConfig.repoLabel;for(var t=this.repoLink.match(/^https?:\/\/[^/]+/)[0],e=["GitHub","GitLab","Bitbucket"],a=0;a<e.length;a++){var i=e[a];if(new RegExp(i,"i").test(t))return i}return"Source"}}}}),_=(a(220),Object(s.a)(b,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.userLinks.length||t.repoLink?a("nav",{staticClass:"nav-links"},[t._l(t.userLinks,(function(t){return a("div",{key:t.link,staticClass:"nav-item"},["links"===t.type?a("DropdownLink",{attrs:{item:t}}):a("NavLink",{attrs:{item:t}})],1)})),t._v(" "),t.repoLink?a("a",{staticClass:"repo-link",attrs:{href:t.repoLink,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n    "+t._s(t.repoLabel)+"\n    "),a("OutboundLink")],1):t._e()],2):t._e()}),[],!1,null,null,null).exports);function w(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var x={components:{SidebarButton:p,NavLinks:_,SearchBox:h.a,AlgoliaSearchBox:{}},data:function(){return{linksWrapMaxWidth:null}},mounted:function(){var t=this,e=parseInt(w(this.$el,"paddingLeft"))+parseInt(w(this.$el,"paddingRight")),a=function(){document.documentElement.clientWidth<719?t.linksWrapMaxWidth=null:t.linksWrapMaxWidth=t.$el.offsetWidth-e-(t.$refs.siteName&&t.$refs.siteName.offsetWidth||0)};a(),window.addEventListener("resize",a,!1)},computed:{algolia:function(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch:function(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}}},k=(a(221),Object(s.a)(x,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",{staticClass:"navbar"},[a("SidebarButton",{on:{"toggle-sidebar":function(e){return t.$emit("toggle-sidebar")}}}),t._v(" "),a("router-link",{staticClass:"home-link",attrs:{to:t.$localePath}},[t.$site.themeConfig.logo?a("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e(),t._v(" "),t.$siteTitle?a("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.logo}},[t._v(t._s(t.$siteTitle))]):t._e()]),t._v(" "),a("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[t.isAlgoliaSearch?a("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search&&!1!==t.$page.frontmatter.search?a("SearchBox"):t._e(),t._v(" "),a("NavLinks",{staticClass:"can-hide"})],1)],1)}),[],!1,null,null,null).exports),C=a(62),y=a(222),$=a.n(y),S=a(71),L=a.n(S),O={name:"PageNav",props:["sidebarItems"],computed:{prev:function(){return T(M.PREV,this)},next:function(){return T(M.NEXT,this)}}};var M={NEXT:{resolveLink:function(t,e){return z(t,e,1)},getThemeLinkConfig:function(t){return t.nextLinks},getPageLinkConfig:function(t){return t.frontmatter.next}},PREV:{resolveLink:function(t,e){return z(t,e,-1)},getThemeLinkConfig:function(t){return t.prevLinks},getPageLinkConfig:function(t){return t.frontmatter.prev}}};function T(t,e){var a=e.$themeConfig,n=e.$page,s=e.$route,r=e.$site,o=e.sidebarItems,l=t.resolveLink,c=t.getThemeLinkConfig,u=t.getPageLinkConfig,h=c(a),p=u(n),d=L()(p)?h:p;return!1===d?void 0:$()(d)?Object(i.i)(r.pages,d,s.path):l(n,o)}function z(t,e,a){var i=[];!function t(e,a){for(var i=0,n=e.length;i<n;i++)"group"===e[i].type?t(e[i].children||[],a):a.push(e[i])}(e,i);for(var n=0;n<i.length;n++){var s=i[n];if("page"===s.type&&s.path===decodeURIComponent(t.path))return i[n+a]}}var A=O,E=(a(230),Object(s.a)(A,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.prev||t.next?a("div",{staticClass:"page-nav"},[a("p",{staticClass:"inner"},[t.prev?a("span",{staticClass:"prev"},[t._v("\n      ←\n      "),t.prev?a("router-link",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v(t._s(t.prev.title||t.prev.path))]):t._e()],1):t._e(),t._v(" "),t.next?a("span",{staticClass:"next"},[t.next?a("router-link",{attrs:{to:t.next.path}},[t._v(t._s(t.next.title||t.next.path))]):t._e(),t._v("\n      →\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null).exports),j={components:{PageEdit:C.a,PageNav:E},props:["sidebarItems"]},N=(a(231),Object(s.a)(j,(function(){var t=this.$createElement,e=this._self._c||t;return e("main",{staticClass:"page"},[this._t("top"),this._v(" "),e("Content",{staticClass:"theme-default-content"}),this._v(" "),e("PageNav",this._b({},"PageNav",{sidebarItems:this.sidebarItems},!1)),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null).exports),H=(a(33),a(34),a(162)),P={computed:{tags:function(){var t={},e=!0,a=!1,i=void 0;try{for(var n,s=this.$site.pages[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){var r=n.value;for(var o in r.frontmatter.tags){var l=r.frontmatter.tags[o];l in t?t[l].push(r):t[l]=[r]}}}catch(t){a=!0,i=t}finally{try{e||null==s.return||s.return()}finally{if(a)throw i}}return t}}},I=(a(235),Object(s.a)(P,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tags"},t._l(Object.keys(t.tags),(function(e){return a("span",[a("Badge",{attrs:{id:e}},[a("router-link",{attrs:{to:{path:"/tags/"+e}}},[a("div",[t._v(t._s(e)+"\n        "),a("div",{staticClass:"tagcount"},[t._v(t._s(t.tags[e].length))])])])],1)],1)})),0)}),[],!1,null,null,null).exports),V={name:"Sidebar",components:{SidebarLinks:H.default,NavLinks:_,Tags:I},props:["items"],methods:{recentPosts:o},computed:{numOfPosts:function(){return this.$site.pages.filter((function(t){return t.path.indexOf("/posts/")>=0})).length},numOfTags:function(){var t={},e=0,a=!0,i=!1,n=void 0;try{for(var s,r=this.$site.pages[Symbol.iterator]();!(a=(s=r.next()).done);a=!0){var o=s.value;for(var l in o.frontmatter.tags){var c=o.frontmatter.tags[l];c in t||(t[c]=[o],e++)}}}catch(t){i=!0,n=t}finally{try{a||null==r.return||r.return()}finally{if(i)throw n}}return e}}},B=(a(236),{components:{Home:u,Page:N,Sidebar:Object(s.a)(V,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("aside",{staticClass:"sidebar"},[a("div",{staticClass:"bio bio-sidebar"},[t._m(0),t._v(" "),a("p",{staticClass:"name"},[t._v("Oscar Tseng")]),t._v(" "),a("div",{staticStyle:{"border-bottom":"1px solid hsl(0, 0%, 30%)","border-top":"1px solid hsl(0, 0%, 30%)"}},[a("div",{staticStyle:{display:"inline-block",padding:"0 10px","border-right":"1px solid hsl(0, 0%, 30%)",margin:"5px 0"}},[a("router-link",{attrs:{to:{path:"/categories/"}}},[a("span",{staticStyle:{display:"block","font-family":"'Noto Sans TC Medium'","font-size":"20px"}},[t._v(t._s(t.numOfPosts))]),t._v(" "),a("span",[t._v("Posts")])])],1),t._v(" "),a("div",{staticStyle:{display:"inline-block",padding:"0 10px",margin:"5px 0"}},[a("router-link",{attrs:{to:{path:"/tags/"}}},[a("span",{staticStyle:{display:"block","font-family":"'Noto Sans TC Medium'","font-size":"20px"}},[t._v(t._s(t.numOfTags))]),t._v(" "),a("span",[t._v("Tags")])])],1)]),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"center","padding-top":"5px","padding-bottom":"5px","border-bottom":"1px solid hsl(0, 0%, 30%)"}},[a("span",{staticStyle:{width:"32px",height:"32px"}},[a("a",{attrs:{href:"https://github.com/LYTzeng",target:"_blank",rel:"noopener",title:"Github"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45 3 3 0 0 0 4.08 1.16 2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76 5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7 5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z"}})])])]),t._v(" "),a("span",{staticStyle:{width:"32px",height:"32px"}},[a("a",{attrs:{href:"https://www.linkedin.com/in/li-yen-tseng/",target:"_blank",rel:"noopener",title:"Linkedin"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M26.21 4H5.79A1.78 1.78 0 0 0 4 5.73V26.2a1.77 1.77 0 0 0 1.79 1.73h20.42A1.77 1.77 0 0 0 28 26.2V5.73A1.78 1.78 0 0 0 26.21 4zm-15.1 20.41H7.59V13h3.52zm-1.72-13a2.07 2.07 0 0 1-2.07-2.02 2 2 0 0 1 2.07-2.07 2.07 2.07 0 0 1 0 4.13zm15.09 12.93H21v-5.58c0-1.33 0-3.06-1.86-3.06S17 17.16 17 18.63v5.65h-3.56V13h3.32v1.5h.07a3.72 3.72 0 0 1 3.39-1.86c3.59 0 4.26 2.4 4.26 5.45z"}})])])]),t._v(" "),a("span",{staticStyle:{width:"32px",height:"32px"}},[a("a",{attrs:{href:"mailto:oscar217b@gmail.com",target:"_blank",rel:"noopener",title:"mail"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-2.2 2L16 14.78 6.2 8zM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24z"}}),a("title",[t._v("Email")])])])]),t._v(" "),a("span",{staticStyle:{width:"32px",height:"32px"}},[a("a",{attrs:{href:"/rss.xml",target:"_blank",rel:"noopener",title:"rss",type:"application/rss+xml"}},[a("svg",{staticStyle:{"will-change":"transform"},attrs:{fill:"#e6e6e6",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32","aria-hidden":"true"}},[a("path",{attrs:{d:"M8 18c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm22-4h-2C28 13 19 4 8 4V2c12.1 0 22 9.9 22 22z"}}),a("path",{attrs:{d:"M22 24h-2c0-6.6-5.4-12-12-12v-2c7.7 0 14 6.3 14 14z"}}),a("title",[t._v("Rss")])])])])])]),t._v(" "),a("NavLinks"),t._v(" "),t._t("top"),t._v(" "),a("SidebarLinks",{attrs:{depth:0,items:t.items}}),t._v(" "),a("div",{staticClass:"sidebar-links"},[t._m(1),t._v(" "),a("ul",t._l(t.recentPosts(0,5),(function(e){return a("li",[a("a",{staticClass:"sidebar-link recentTitle",attrs:{href:e.path}},[t._v(t._s(e.title))])])})),0)]),t._v(" "),a("div",{staticClass:"sidebar-links"},[t._m(2),t._v(" "),a("Tags",{staticClass:"sidebar-tags sidebar-link"})],1),t._v(" "),t._t("bottom")],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-holder"},[e("img",{attrs:{src:"https://avatars3.githubusercontent.com/u/30722178?s=460&v=4"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"sidebar-heading"},[e("span",[this._v("近期文章")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"sidebar-heading"},[e("span",[this._v("Tags")])])}],!1,null,null,null).exports,Navbar:k},data:function(){return{isSidebarOpen:!1}},computed:{shouldShowNavbar:function(){var t=this.$site.themeConfig;return!1!==this.$page.frontmatter.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar:function(){var t=this.$page.frontmatter;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems:function(){return Object(i.j)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses:function(){var t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted:function(){var t=this;this.$router.afterEach((function(){t.isSidebarOpen=!1}))},methods:{toggleSidebar:function(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart:function(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd:function(t){var e=t.changedTouches[0].clientX-this.touchStart.x,a=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(a)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}}),R=(a(237),Object(s.a)(B,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?a("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),a("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),a("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar}},[t._t("sidebar-top"),t._v(" "),t._t("sidebar-bottom")],2),t._v(" "),t.$page.frontmatter.home?a("Home"):a("Page",{attrs:{"sidebar-items":t.sidebarItems}},[t._t("page-top"),t._v(" "),t._t("page-bottom")],2),t._v(" "),t._m(0)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("footer",[e("div",[this._v("\n      Copyright © 2019-present Li Yen Tseng, Powered by "),e("a",{attrs:{href:"http://vuepress.vuejs.org"}},[this._v("VuePress")])])])}],!1,null,null,null));e.default=R.exports}}]);