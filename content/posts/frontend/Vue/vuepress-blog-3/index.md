---
date: 2019-12-11T14:07:14+08:00
lang: zh-TW
description: VuePress 原本是提供官方文件網站一個產生靜態頁面的框架，因此許多部落格應有的功能都是缺乏的。例如標籤、分類和留言等都需要自己做，因為我想掌控排版和背後的邏輯，所以就寫起來囉。這篇會討論 Components 的應用、標籤（Tags)和分類（Categories)的實做部分。範例程式碼就是直接從這個部落格的原始碼節錄的。
sidebar: auto
tags: ["VuePress"]
categories: ["Frontend"]
title: VuePress 部落格架設與折騰 (三)：Global Computed、標籤與分類功能、Components 的應用
aliases: ["/posts/frontend/Vue/vuepress-blog-3.html"]
resources:
- name: "featured-image"
  src: "hero.png"
---

「使用 VuePress 架設部落格~~以及被折騰~~」的系列文，是我架設本部落格的過程筆記，希望日後對有需要使用 VuePress 架設 Blog 的朋友有一點點幫助。內文有誤的部分，敬請指正。

VuePress 原本是提供官方文件網站一個產生靜態頁面的框架，因此許多部落格應有的功能都是缺乏的。例如標籤、分類和留言等都需要自己做，因為我想掌控排版和背後的邏輯，所以就寫起來囉。這篇會討論 Components 的應用、標籤（Tags)和分類（Categories) 的實做部分。範例程式碼就是直接從這個部落格的原始碼節錄的。

## Global Computed 與 Frontmatter

### Frontmatter
我在本系列文第一篇提過 Frontmatter，就是在每篇 Markdown 最前面的 YAML 區塊，而 Frontmatter 除了 YAML，也可以使用 JSON 或 [TOML](https://github.com/toml-lang/toml)。下面是本篇文章的 Frontmatter：
```yaml
---
lang: zh-TW
description: VuePress 原本是提供官方文件網站一個產生靜態頁面的框架，因此許多部落格應有的功能都是缺乏的。例如標籤、分類和留言等都需要自己做，因為我想掌控排版和背後的邏輯，所以就寫起來囉。這篇會討論 Components 的應用、標籤（Tags)和分類（Categories)的實做部分。範例程式碼就是直接從這個部落格的原始碼節錄的。
sidebar: auto
tags: ["VuePress"]
category: Frontend
---
```

Frontmatter 一部分是 VuePress 預設的，而其餘可以自行新增資料。VuePress 預設的幾項設定如下：
#### title
型態：`string` \
預設值為 `h1_title || siteConfig.title` \
例如本篇標題「VuePress 部落格架設與折騰 (三)」，本站名稱(定義於`.vuepress/config.js`)為「Oscar's Pathways」，就會呈現 「VuePress 部落格架設與折騰 (三) | Oscar's Pathways」。

#### lang
型態：`string` \
預設值為 `en-US` \
設定網站語系，這是讓瀏覽器去讀取的，和SEO比較有關。中文的話就是`zh-Hant-TW`，注意大小寫與 Dash 的部分，為什麼不是`zh-TW`呢？我一開始也以為是`zh-TW`，這部分請看 IETF，錯不了的：[RFC 4646](https://www.ietf.org/rfc/rfc4646.txt)。

#### description
型態：`string` \
預設值為 `siteConfig.descripton` \
我把這個變數當作文章大綱和首頁預覽功能使用。

其他官方定義的變數可以到[這裡](https://vuepress.vuejs.org/guide/frontmatter.html#predefined-variables)查看。

### Global Computed

Global Computed 是一系列以 `$` 開頭為名的變數，都是 Object，皆可從任何頁面讀取這些變數。下面列出我接下來寫標籤與分類會用到的變數。

#### $site
這個變數是「全站」的所有變數，如果有100篇文章，`"pages"`就會是一個包含100個元素的 Array。
```json{5}
{
  "title": "VuePress",
  "description": "Vue-powered static site generator",
  "base": "/",
  "pages": [
    {
      "lastUpdated": 1524027677000,
      "path": "/",
      "title": "VuePress",
      "frontmatter": {}
    },
    ...
  ]
}
```

#### $page
這個變數是「本頁」的變數，也就是你所在的頁面的相關參數都在裡面，包含自己定義的 Frontmatter。
```json
{
  "title": "Global Computed",
  "frontmatter": {},
  "regularPath": "/guide/global-computed.html",
  "key": "v-d4cbeb69eff3d",
  "path": "/guide/global-computed.html",
  "headers": [
    {
      "level": 2,
      "title": "$site",
      "slug": "site"
    },
    {
      "level": 2,
      "title": "$page",
      "slug": "$page"
    },
    ...
  ]
}
```
#### $frontmatter
等同`$page.frontmatter`。

我當初在嘗試時經常在 Vue 元件的`Script`區塊中`export default`底下使用`console.log(this.$page)`查看變數。如果要查看`$site`就是`console.log(this.$site)`，以此類推。

**`xxx.vue` 某元件內**
```js{5}
<script>
export default {
  computed: {
    category () {
      console.log(this.$page);
      return this.$page.frontmatter.category
    },
  }
}
</script>
```
## 標籤
接下來開始製作標籤功能。參考其他部落格(像是用 Hexo 製作的那種)，一篇文章包含多個標籤，而我可以點選標籤查看具有該標籤的所有文章，同時可以顯示該標籤所包含的文章總數。

首先來定義 Frontmatter，因為可能有多個標籤，所以用陣列。
```yaml
---
...
tags: ["Tag1", "Tag2"]
...
---
```
接著我希望在文章、側邊欄和首頁最新文章都可以看到每篇文章包含的標籤，因此需要製作 Components。 \
首先是文章頂端的標籤，結果如下(藍色方塊的部分)：

![](https://i.imgur.com/NKMMYZ6.png)

撰寫元素：

**`TagLinks.vue`**
```html{3-8}
<template lang="html">
  <div class="taglinks">
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tags/${tag}`}">
      <Badge :text="tag"/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TagLinks",
}
</script>

<style lang="stylus">
.taglinks > a
  padding-right 5px
  font-family 'Noto Sans TC Medium'
</style>
```

`template`裡面，`router-link`標籤是類似 HTML 的`<a></a>`提供超連結的功能，目的地則是定義在`to=`，如果要使用變數只要在前面加上冒號即可：`:to=`。注意例子中`:to="{ path `...` }"`，`path` 提供相對路徑的效果，一定要用大括號包起來，後面是相對路徑，這裡使用到`tag`變數，要用`${tag}`的形式嵌入。假設我的網站 Root 為 `https://lytzeng.github.io`，這個連結就會變成`https://lytzeng.github.io/tags/tagXXX`。

在來是 `v-for`，它讓這個標籤可以跑 for loop，每跑一次就產生一個`router-link`，邏輯就是有 n 個標籤在陣列 `$page.frontmatter.tags` 中，就產生 n 個藍色標籤方塊。`key` 則是讓 Vue 內部演算法可以增加物件的重複使用率，這個不一定要設置。

接著是側邊欄顯示所有標籤的部分，同時每個標籤都顯示包含的文章總數，完成後如下圖。

![](https://i.imgur.com/oE7N2Fv.png)

由於這裡是顯示全站的標籤，故使用`$site`而不是`$page`。我們先建立一個元件叫`Tags.vue`，先把整段程式碼放上來，方便討論。

**`Tags.vue`**
```html
<template>
  <div class="tags">
    <span v-for="tag in Object.keys(tags)">
      <Badge :id="tag">
        <router-link :to="{ path: `/tags/${tag}`}">
          <div>{{tag}}
          <div class="tagcount">{{tags[tag].length}}</div></div>
        </router-link>
      </Badge>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    tags() {
      let tags = {};
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index];
          if (tag in tags) {
            tags[tag].push(page);
          } else {
            tags[tag] = [page];
          }
        }
      }
      return tags;
    }
  }
};
</script>
```

這裡開始用到一個作法：「從 template 的 HTML 中呼叫 Scripts 區塊中的函式」。 Scripts 區塊的寫法也是被定義的，接下來開始說明。

### Scripts

`script` 中一定要使用 `export default` ，function 可以放在幾個地方:`computed`, `methods`, `data`, `mounted` 等等，這部分可以直接參考 Vue 的文件，下面簡單說明一下他們的差別。

#### Computed
:::v-pre
上段程式碼的寫法屬於 Getter，目的在於避免 template 存在複雜的邏輯，以免未來看 code 會看不懂。注意在 `template` 區塊中使用 global computed 時可以直接使用像 `{{$page.frontmatter}}` 的寫法，但在`script` 中必須使用 `this.$page.frontmatter` 這種方法，注意`this`的差別。
:::
而 `computed` 有 Getter 和 Setter 的寫法，需要搭配 [v-model](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components)，如下面是文件範例:

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

#### data

`data` 的部分可以直接用來放定義的變數，但是注意 `data` 內的寫法，一定要使用 function，再把 Object 丟出去。
```js
data() {
    return {
      message: 'about page'
    }
}
```

#### methods

其實上面提到，`computed` 下的 function 其實也可以改放在 `methods` 裡，它們的行為是一樣的。差別在於：`computed` 會 cache，除非裡面的參數有改變（比如透過 setter ），不然每次call `computed` 內的 function 所回傳的值都會是第一次的運算結果。而`methods`則是每次呼叫、每次重新計算。使用方法如下：

```js
// in component
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

:::v-pre
在 `template` 使用時插入 `{{ reversedMessage() }}` 即可。

```html
<p>Reversed message: "{{ reverseMessage() }}"</p>
```
:::
#### mounted

這個通常用在頁面載入後，對 DOM 進行操作。如果要在頁面載入前對 DOM 操作，使用`beforeMount`。只能在這兩個底下對 DOM 進行操作。

### 應用

回到剛才的 **`Tags.vue`** ，這時元件已經完成，我們可以嵌入到 `Sidebar.vue` 中。

**`Sidebar.vue`**
```html{3,8,13}
//...
<template>
<Tags/>
</template>

<script>
//...
import Tags from "@theme/components/Tags.vue"
//...
export default {
  name: "Sidebar",
 // ...
  components: { "....", Tags },
 //...
};
</script>
```

為了讓每個標籤都有文章數量顯示，**`Tags.vue`** 這段程式碼可以計算每個標籤的文章數量。

```js
computed: {
    tags() {
      let tags = {};
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index];
          if (tag in tags) {
            tags[tag].push(page);
          } else {
            tags[tag] = [page];
          }
        }
      }
      return tags;
    }
  }
```

接著`router-link`讓我們點擊標籤時可以到達標籤頁面，顯示相同標籤文章。

```html
<router-link :to="{ path: `/tags/${tag}`}">
<!-- ... -->
</router-link>
```

所以要製作標籤頁面，先新增元件 **`GetPagesByTag.vue`**，這個元件將嵌入到 Markdown 中，我會為每個標籤建立一個 Markdown，在裡面加入 `<GetPagesByTag/>`，透過標題決定顯示哪一種標籤。

:::v-pre
**`GetPagesByTag.vue`**
```html
<template>
  <div class="tag-posts">
    <ul>
      <li v-for="page in thisTag">
        <router-link :to="{ path: page.path}">
          <h1>{{page.title}}</h1>
          <p>{{page.frontmatter.description}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GetPagesByTag",
  computed: {
    thisTag() {
      let tags = {};
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index];
          if (tag in tags) {
            tags[tag].push(page);
          } else {
            tags[tag] = [page];
          }
        }
      }
      return tags[this.$page.title];
    }
  }
};
</script>
```
:::

## 類別

實作類別功能時，我只想使用單層的類別，有些部落格可以有像檔案系統般的類別，但我只想做單層。先端上結果：

![](https://i.imgur.com/oE7N2Fv.png)

就是那個資料夾圖案，做法和標籤是一樣的，只是一篇文章只會有一個類別，所以不用跑迴圈。因為我想讓類別和標籤顯示在同一行，所以寫在同一個元件比較方便，一樣寫在 **`TagLinks.vue`** 中。

我在 Template 中新增這段
:::v-pre
```html{5}
<router-link :key="category" :to="{ path: `/categories/#${category}` }">
    <div style="display: inline;">
        <svg fill="#14cdef" focusable="false" preserveAspectRatio="xMidYMid meet" style="display: inline-block; vertical-align: middle; will-change: transform;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M11.17 6l3.42 3.41.58.59H28v16H4V6h7.17m0-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H16l-3.41-3.41A2 2 0 0 0 11.17 4z"></path><title>Folder</title></svg>
    </div>
    {{ category }}
</router-link>
```
:::

附帶一提，中間那段是 SVG 圖示(資料夾小圖示)，網頁中的 icon 最好盡量用 SVG ，載入速度較圖片快，也支援無線的縮放不失真。

Scripts 中新增這段：
```js
export default {
  name: "TagLinks",
  computed: {
    category () {
      return this.$page.frontmatter.category
    },
  }
}
```

再來是製作類別總覽的頁面，我想使用比較特別的做法，整個頁面會顯示所有類別以及底下所有文章，在其他頁面點選特定類別時，跳到類別總覽的特定類別位置 (可以點[這裡](/categories/)先看結果)。怎麼做到呢？在目的地網址加入`#element-id` 就可，element-id 是你想要捲動到該物件的 id。類別總覽元件：**`Categories.vue`**，注意有深色標示的程式碼部分。因為要跑過所有文章與類別，這裡使用一層 for loop。

```html{4,6,7,20-41}
<template>
  <div class="categories" v-if="categories">
    <div class="tilesWrap">
      <div v-for="cat in Object.keys(categories)" :id="cat" class="category-card-container">
        <div class="category-card">
          <div class="category-name">{{ cat }}</div>
          <router-link v-for="page of categories[cat]" :to="{ path: `${page.path}`}">
            <div class="cat-page-title">{{ page.title }}</div>
            <p>{{ page.frontmatter.description }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  computed: {
    categories() {
      let categories = {};
      let posts = this.$site.pages.filter(p => {
        return p.path.indexOf("/posts/") >= 0;
      });
      this.$page["headers"] = [];
      for (let post of posts) {
        const cat = post.frontmatter.category;
        let postArr = [post];
        if (cat in categories) categories[cat].push(post);
        else {
          categories[cat] = postArr;
          this.$page["headers"].push({
            level: 2,
            slug: cat,
            title: cat
          })
        } 
      }
      console.log(this.$page)
      return categories;
    }
  }
};
</script>
```

終於到這篇結尾，目前我都省略 CSS 樣式的部分，也就是`<style>`裡面的內容不提，之後會單獨一篇討論如何客製化 VuePress 的顏色設計等等，以及 Stylus 的部分。
這篇東西比較多，如果之後發現有遺漏的部分，我會回來補上。
