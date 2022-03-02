---
date: 2019-12-10T14:55:51+08:00
lang: zh-TW
description: 本篇先介紹 VuePress 的 Components (元件)。因為我接觸 VuePress 時還沒開始學 Vue，在架部落格同時想透過 VuePress 間接摸索 Vue.js，這裡簡單介紹元件的組成以及如何在 VuePress 頁面使用自己寫的元件。
sidebar: auto
tags: ["VuePress"]
categories: ["Frontend"]
title: VuePress 部落格架設與折騰 (二)：Components
aliases: ["/posts/frontend/Vue/vuepress-blog-2.html"]
resources:
- name: "featured-image"
  src: "hero.png"
---

「使用 VuePress 架設部落格~~以及被折騰~~」的系列文，是我架設本部落格的過程筆記，希望日後對有需要使用 VuePress 架設 Blog 的朋友有一點點幫助。內文有誤的部分，敬請指正。

本篇先介紹 VuePress 的 Components (元件)。因為我接觸 VuePress 時還沒開始學 Vue，在架部落格同時想透過 VuePress 間接摸索 Vue.js，這裡簡單介紹元件的組成以及如何在 VuePress 頁面使用自己寫的元件。

## Components 概念

VuePress 的 Vue 元件存放在`.vuepress/theme/components` 下，使用的方式有二：直接在 Markdown 文件嵌入，或在其他 component 再嵌入另一個 component，會依情境而有不同選擇。

`.vuepress/theme/components` 底下的每個 `.vue` 檔都是使用 Vue 的 [Static File Component](https://vuejs.org/v2/guide/single-file-components.html)，其分為三個部分：`template`、`script`和`style`。範例如下：
```html
<template>
  <main class="page">
    <slot name="top" />
    <Content class="theme-default-content" />
    <PageNav v-bind="{ sidebarItems }" />
    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
$page-max-width = 900px

.page-edit 
  margin 0
  padding 0
  max-width $page-max-width

@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

@media (min-width: $MQNarrow)
  .theme-default-content:not(.custom)
    max-width $page-max-width !important
    padding 2rem 5% 2rem 10%
</style>
```
元素裡面可以只有 `template`，也可以沒有`script`或`style`。

`<templates>`標籤內放的就是 HTML，當然也支援 [pug](https://pugjs.org/api/getting-started.html)。注意這裡的 HTML 雖然不是完整頁面的 HTML，但是建議撰寫之前，一切元素都使用`<div><div/>`標籤包起來，以免出現"Component template should contain exactly one root element. " 的錯誤。

`<script>`標籤內放的是 Javascript 或 TypeScript，頁面邏輯運算的部分。這裡的格式是被規定的，一定要使用 `export default`，下一篇會更詳細介紹這裡面一些 Object 的功能。

`<style>`就是頁面的樣式，可以是 CSS 或 [Stylus](http://stylus-lang.com/)，Vue 比較推薦用 Stylus。如果使用 Stylus，可以去 `@require` 其他 `.styl` 檔。 VuePress 預設的樣式放在 `.vuepress/theme/styles` 底下。

接著是使用元件的兩種方法。

## 使用元件

以下兩種方法需要視需求決定使用其中一種，第一種方法適用於大量頁面都需要使用同一個元件，第二種適合用於多個小元件組合成單一大元件的情況。

### 直接將元件嵌入到 Markdown

`.vuepress/theme/components`裡面有一些是預設的 Components，可以去更動它，但千萬別移除。如果有額外自訂的元件(`.vue`檔)，要在`.vuepress/enhanceApp.js` import，如果`enhanceApp.js`不存在，可以自行新增。這裡的例子我加入了兩個自己寫的元件：`TagLinks` 和 `PageEdit`。

**`enhanceApp.js`**
```js
import TagLinks from './theme/components/TagLinks.vue'
import PageEdit from './theme/components/PageEdit.vue'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component('TagLinks', TagLinks)
  Vue.component('PageEdit', PageEdit)
}
```

`enhenceApp.js`的原件所有頁面都可以存取，有全域的概念。在 Markdown 只要加入元件名稱的 HTML 標籤即可。
```markdown
<TagLinks/>
<PageEdit/>
```

### 在其他元件再嵌入另一個元件

參考以下元件的`script`區塊，這個元件嵌入了`SidebarGroup` 和 `SidebarLink` 兩個元件：

```js
<script>
import SidebarGroup from '@theme/components/SidebarGroup.vue'
import SidebarLink from '@theme/components/SidebarLink.vue'
import { isActive } from '../util'

export default {
  name: 'SidebarLinks',

  components: { SidebarGroup, SidebarLink },

  props: [
    'items',
    'depth',  // depth of current sidebar links
    'sidebarDepth' // depth of headers to be extracted
  ],

  data () {
    return {
      openGroupIndex: 0
    }
  },
}
</script>
```

這樣只有這個元件可以使用`SidebarGroup` 和 `SidebarLink`，接著在`template`區塊使用元件，也是加入元件名稱的 HTML 標籤，這裡只須看`<SidebarGroup/>` 和 `<SidebarLink/>`。
```html
<template>
  <ul
    class="sidebar-links"
    v-if="items.length"
  >
    <li v-for="(item, i) in items" :key="i">
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="i === openGroupIndex"
        :collapsable="item.collapsable || item.collapsible"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarLink
        v-else
        :sidebarDepth="sidebarDepth"
        :item="item"
      />
    </li>
  </ul>
</template>
```

中間有一些使用變數和 Template Syntax 的方法，下一篇將透過撰寫標籤功能以及分類功能示範如何使用 Vue 元件進行參數傳遞。

