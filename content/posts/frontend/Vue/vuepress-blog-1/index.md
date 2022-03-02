---
date: 2019-12-09T06:37:30+08:00
lang: zh-TW
description: 這個部落格決定使用 VuePress 架設，過程中遇到種種問題以及官方文件寫不清楚的地方，因此這一系列 VuePress 筆記同時也希望幫助到剛接觸的人。會想使用 VuePress，一方面是因為想用 Vue 來寫，另一方面則是需要高度的 Customization。使用其他框架雖然很多功能都已經實現，但是前端很多東西如顏色、Navbar、Sidebar等需要更細的調整，我個人也不想看到整個 Theme 和其他網站「撞衫」，所以比較偏好大部分自己來。
sidebar: auto
tags: ["VuePress"]
categories: ["Frontend"]
title: VuePress 部落格架設與折騰 (一)：Themes、頁面元素、部署至 Github
aliases: ["/posts/frontend/Vue/vuepress-blog-1.html"]
resources:
- name: "featured-image"
  src: "hero.png"
---

這個部落格決定使用 VuePress 架設，過程中遇到種種問題以及官方文件寫不清楚的地方，因此這一系列 VuePress 筆記同時也希望幫助到剛接觸的人。會想使用 VuePress，一方面是因為想用 Vue 來寫，另一方面則是需要高度的 Customization。使用其他框架雖然很多功能都已經實現，但是前端很多東西如顏色、Navbar、Sidebar等需要更細的調整，我個人也不想看到整個 Theme 和其他網站「撞衫」，所以比較偏好大部分自己來。

## 安裝 Yarn 和 VuePress

VuePress 官方建議使用 yarn ，我的環境已經安裝 npm，因此使用npm安裝yarn。
```bash
npm install -g yarn
```
接著 cd 到你的專案路徑地底下，初始化 vuepress
```bash
yarn add -D vuepress
```

新增`docs`資料夾，在底下建立`README.md`，這將會作為首頁的頁面。
VuePress 預設將 `docs` 當成網頁的根目錄，首頁就是`docs/README.md`
接著在`package.json`新增 scripts 段落：
```json
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}
```
> 對 yarn 來說`package.json` 的 scripts 作用 [請見這裡](https://yarnpkg.com/lang/en/docs/package-json/#toc-scripts)

這樣編寫網頁時使用 `yarn docs:dev` 開啟 [localhost:8080](localhost:8080) 開發環境，
編寫完成要 Deploy 時使用`yarn docs:build` 產生靜態網頁檔案，便可以 push 到 github pages。

整個專案架構會像這樣：
```
.
├── docs
│   ├── .vuepress (Optional)
│   │   ├── components (Optional)
│   │   ├── dist (build 好的靜態檔案都在這裡，只要把這裡推上github pages即可)
│   │   ├── theme (Optional)
│   │   │   └── Layout.vue
│   │   ├── public (Optional)
│   │   ├── styles (Optional)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (Optional, Danger Zone)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (Optional)
│   │   └── enhanceApp.js (Optional)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

## 使用佈景主題

目前示範使用 Vue 的預設佈景主題 Default Theme，安裝 Theme 就像安裝 Vue  Plugin 一樣，需要在`docs/config.js`增加以下內容：
```js
module.exports = {
    extend: '@vuepress/theme-default',
}
```
`@vuepress/`開頭的主題名稱為 Vue 官方的主題。
接著就可以在 markdown 文件加入設定值 (此方法只適用於 Default theme)，這段設定其實是 YAML 格式，一定要放在 markdown 文件的第一行開始。這個之後會稱作 [Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html)。
```yaml
---
home: true
heroImage: /hero.png
heroText: Hero Title
tagline: Hero subtitle
actionText: Get Started →
actionLink: /guide/
features:
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```
YAML frontmatter 會使用 [gray-matter](https://github.com/jonschlinkert/gray-matter) 處理以上的設定。
其實你也可以使用 [json 或 TOML](https://vuepress.vuejs.org/guide/frontmatter.html#alternative-frontmatter-formats)。

如果想要複寫主題的樣式，可以參考這個[網站](https://vuepress-examples.netlify.com/demos/extending/#modifying-the-default-theme)。

## 基本頁面元素

### Navbar 導覽列區塊

#### Logo:

**`.vuepress/config.js`**
```js
module.exports = {
    themeConfig: {
    logo: '/assets/img/logo.png',
    }
}
```
疑，這裡有圖片相對路徑，所以要設定 Base URL，假設你等等要放在 `yourname.github.io/blogs`，那麼你的 Base URL 就是 `/blogs/`，設定如下：
```js
module.exports = {
    base: '/blogs/'
}
```
在 md 裡面就要使用 HTML 標籤帶入圖片，`$withBase`讓我們日後更動路徑不需要每個地方改：
```html
<img :src="$withBase('/test.jpg')" alt="foo">
```
當然如果是要直接部署在`yourname.github.io`，那麼 base 就是 `'/'`。

#### 超連結 :

**`.vuepress/config.js`**
```js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' }
    ]
  }
}
```
如果想使用巢狀結構也是可以的：
```js
module.exports = {
  themeConfig: {
    nav: [
        { text: 'Categories', link: '/categories/' },
        { text: 'Tags', link: '/tags/' },
        { text: 'About', link: '/about/' },
        {
            text: 'Frontend', items: [
                { text: 'Vue', link: '/posts/frontend/Vue/' },
                { text: '###', link: '#' },
            ],
        },
    ],
  }
}
```
附帶一提，Vuepress 會對連外的連結加上 `target="_blank" rel="noopener noreferrer"`，就是開啟新分頁，而`rel="noopener noreferrer"`和資安考量有關，詳細請見[這裡](https://pointjupiter.com/what-noopener-noreferrer-nofollow-explained/)。

### 側邊欄

**`.vuepress/config.js`**
```js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```
這裡要注意一點，官方文件範例如上，但是這會導致`文章段落導覽`的功能`失效`！所以我建議不要在這裡進行 Sidebar 的設定(不要將 `sidebar[]` 放入 `themeConfig{}` 底下)。文章段落導覽功能，只要在每篇文章的 Frontmatter 放入 `sidebar: auto` 即可。

要做額外的客製化，以及文章段落導覽的小小 Hack，後續文章會再說明。

### 全站搜尋功能

VuePress 自帶搜尋功能真是太開心了，只要使用內建 plugin 即可。
**`.vuepress/config.js`**
```js
module.exports = {
    plugins: [
        // 在這裡使用 plugin
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
    ]
}
```

### 首頁

VuePress 其實原本是設計給 Documentation 網頁使用，而首頁就是讓你放大大的 Logo。不過如果是部落格，比較常見是放置最新文章等內容，如何整個改掉的部分後續文章再說明，這裡先按照官方文件。

依照剛才的檔案架構，`docs` 是網站的 Root，Root 的 `README.md` 裡面為 Frontmatter 加上 `home:true` 它就會認定這是首頁囉。其他參數如下：
```yaml
---
home: true
heroImage: /hero.png
heroText: Hero Title
tagline: Hero subtitle
actionText: Get Started →
actionLink: /guide/
features:
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

這樣的頁面會長的和 VuePress 官方網站一模一樣。

![](https://i.imgur.com/YEyjlxo.png)

## 部署到 Github Pages

1. 確認已經跑過 `yarn docs:build` 或 `vuepress build docs`。
2. 在 `docs/.vuepress/dist` 底下初始化一個 Git repo：
```bash
git init
git add -A
git commit -m 'deploy'
```
3. 接著就可以 `git remote add origin git@github.com:username/repo.git` 並 `push` 上去。如果不熟 Git 和 Github 看[這裡](https://gitbook.tw/chapters/github/push-to-github.html)。
4. 確認是否成功 deploy 到 Github pages：
    
    ![](https://i.imgur.com/wyPFHpN.png)
    
    Environment 點進去查看，像下面這樣就表示成功了：

    ![](https://i.imgur.com/a1YIRND.png)

之後會發更多 VuePress 客製化過程，包含這個部落格使用的、自行開發的 Tags 功能、分類功能等，因為VuePress 原本都沒有這些功能。
