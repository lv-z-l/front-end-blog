---
title: CSS
author: lvzl
---

## 什么是 CSS

### 什么是 CSS

cascading Style Sheet 层叠级联样式表, 用于美化网页, 比如高度, 宽度, 文字, 阴影, 背景, 超链接, 列表, 渐变效果...

### CSS 发展史

CSS1.0 只能做一些简单的样式调整,比如字体加粗等.

CSS2.0 DIV + CSS, HTML 与 CSS 结构分离, 代码变得简洁, 利于 SEO

CSS2.1 浮动, 定位

CSS3.0 圆角, 阴影, 动画...

## 快速入门(怎么使用)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <h1>标题</h1>
  </body>
</html>
```

```css
h1 {
  color: aqua;
}
```

CSS 的优势:

1. 内容和表现分离
2. 网页结构表现统一, 可以实现复用
3. 样式丰富
4. 利于 SEO, 搜索引擎优化

CSS 的导入方式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <!--  内部样式  -->
    <style>
      h1 {
        color: black;
      }
      /*外部样式写法2*/
      /* @import url('css/style.css'); */
    </style>

    <!--外部样式写法1-->
    <!-- <link rel="stylesheet" href="css/style.css" /> -->
  </head>
  <body>
    <!--行内样式-->
    <h1 style="color: blanchedalmond">标题</h1>
  </body>
</html>
```

样式优先级: 就近原则.

外部样式的两种写法区别:

- link 标签引入: CSS3 推荐使用的方法

```html
<link rel="stylesheet" href="css/style.css" />
```

- `@import` 导入: CSS2.1, 预览一些复杂的页面时, 会先渲染出一个页面的骨架, 然后再渲染样式. 不推荐使用.

```html
<!-- @import url("css/style.css"); -->
```

## CSS 选择器

### 基本选择器:标签选择器, 类选择器, id 选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      /*标签选择器,格式: 标签名{}, 会选择到页面上所有这个标签的元素*/
      h2 {
        color: black;
      }
      /*类选择器, 格式: .类名{}, 可以多个标签归类, 是同一个class, 可复用*/
      .h21 {
        color: aquamarine;
      }
      /*id 选择器, 格式: #id{}, 全局唯一*/
      #h22 {
        color: beige;
      }
      /*优先级: 内联样式>id选择器> 类选择器> 标签选择器*/
    </style>
  </head>
  <body>
    <h2 class="h21">选择器</h2>
    <h2 id="h22">选择器</h2>
    <p class="h21">选择器</p>
  </body>
</html>
```

### 层次选择器:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      /*后代选择器,选择body元素内部的所有<p>标签的元素*/
      body p {
        background: aqua;
      }
      span h1 {
        background: aqua;
      }
      /* 子选择器, 选择所有父级是 body 元素的 p 元素 */
      body > p {
        background: blanchedalmond;
      }
      /*相邻兄弟选择器,选择所有紧接着 span 元素之后的 p 元素, p3*/
      span + p {
        background: coral;
      }
      /*通用选择器,选择p元素之后的每一个ul元素*/
      p ~ ul {
        background: #c8ff97;
      }
    </style>
  </head>
  <body>
    <p>p1</p>
    <p>p2</p>
    <span>
      <h1>111</h1>
      <h1>121</h1>
      <h1>122</h1>
    </span>
    <p>p3</p>
    <ul>
      <li>
        <p>p4</p>
      </li>
      <li>
        <p>p5</p>
      </li>
      <li>
        <p>p6</p>
      </li>
    </ul>
  </body>
</html>
```

### 结构伪类选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      /* ul 的第一个元素*/
      ul li:first-child {
        background: red;
      }
      /* ul 的最后一个元素*/
      ul li:last-child {
        background: blue;
      }
      /*选择每个 p 元素是其父级的第二个子元素*/
      p:nth-child(2) {
        background: aquamarine;
      }
      /*选择每个 p 元素是其父级的第二个p元素*/
      p:nth-of-type(2) {
        background: aqua;
      }
    </style>
  </head>
  <body>
    <p>p1</p>
    <p>p2</p>
    <span>
      <h1>111</h1>
      <h1>121</h1>
      <h1>122</h1>
    </span>
    <p>p3</p>
    <ul>
      <li>
        <p>p4</p>
        <p>p4</p>
      </li>
      <li>
        <p>p5</p>
        <p>p5</p>
      </li>
      <li>
        <p>p6</p>
        <p>p6</p>
      </li>
    </ul>
  </body>
</html>
```

### 属性选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      .demo a {
        display: block;
        background: red;
        border-radius: 5px;
        text-align: center;
        width: 50px;
        height: 50px;
        text-decoration: none;
        float: left;
        margin-right: 10px;
        font: bold 20px/50px Arial;
      }
      /*选中有id属性的a标签*/
      a[id] {
        background: aqua;
      }
      /*选中有id属性为first的a标签*/
      a[id='first'] {
        background: blue;
      }
      /*选中有class属性包含links的a标签*/
      a[class*='links'] {
        background: beige;
      }
      /*选中有href属性以https开头的a标签*/
      a[href^='https'] {
        background: coral;
      }
      /*选中有href属性以pdf结尾的a标签*/
      a[href$='pdf'] {
        background: #ff58ee;
      }
    </style>
  </head>
  <body>
    <div class="demo">
      <a href="https://www.baidu.com" class="first items" id="first">1</a>
      <a href="https://www.baidu.com" class="first items">2</a>
      <a href="https://www.baidu.com" class="first items">3</a>
      <a href="https://www.baidu.com" class="first items">4</a>
      <a href="http://www.baidu.com" class="first items">5</a>
      <a href="http://www.baidu.com" class="first items">6</a>
      <a href="http://www.baidu.com" class="first items">7</a>
      <a href="http://www.baidu.com" class="first items">8</a>
      <a href="http://www.baidu.com" class="first items links">9</a>
      <a href="http://www.baidu.pdf" class="first items links">10</a>
    </div>
  </body>
</html>
```

更多参考:[CSS 选择器](https://www.runoob.com/cssref/css-selectors.html)

| 选择器                                                                                     | 示例                  | 示例说明                                                     | CSS |
| :----------------------------------------------------------------------------------------- | :-------------------- | :----------------------------------------------------------- | :-- |
| [._class_](https://www.runoob.com/cssref/sel-class.html)                                   | .intro                | 选择所有 class="intro"的元素                                 | 1   |
| [#_id_](https://www.runoob.com/cssref/sel-id.html)                                         | #firstname            | 选择所有 id="firstname"的元素                                | 1   |
| [\*](https://www.runoob.com/cssref/sel-all.html)                                           | \*                    | 选择所有元素                                                 | 2   |
| _[element](https://www.runoob.com/cssref/sel-element.html)_                                | p                     | 选择所有 p 元素                                              | 1   |
| _[element,element](https://www.runoob.com/cssref/sel-element-comma.html)_                  | div,p                 | 选择所有 div 元素和 p 元素                                   | 1   |
| [_element_ _element_](https://www.runoob.com/cssref/sel-element-element.html)              | div p                 | 选择 div 元素内的所有 p 元素                                 | 1   |
| [_element_>_element_](https://www.runoob.com/cssref/sel-element-gt.html)                   | div>p                 | 选择所有父级是 div 元素的 p 元素                             | 2   |
| [_element_+_element_](https://www.runoob.com/cssref/sel-element-pluss.html)                | div+p                 | 选择所有紧接着 div 元素之后的 p 元素                         | 2   |
| [[*attribute*\]](https://www.runoob.com/cssref/sel-attribute.html)                         | [target]              | 选择所有带有 target 属性元素                                 | 2   |
| [[*attribute*=*value*\]](https://www.runoob.com/cssref/sel-attribute-value.html)           | [target=-blank]       | 选择所有使用 target="-blank"的元素                           | 2   |
| [[*attribute*~=*value*\]](https://www.runoob.com/cssref/sel-attribute-value-contains.html) | [title~=flower]       | 选择标题属性包含单词"flower"的所有元素                       | 2   |
| [[*attribute*\|=*language*\]](https://www.runoob.com/cssref/sel-attribute-value-lang.html) | [lang\|=en]           | 选择 lang 属性以 en 为开头的所有元素                         | 2   |
| [:link](https://www.runoob.com/cssref/sel-link.html)                                       | a:link                | 选择所有未访问链接                                           | 1   |
| [:visited](https://www.runoob.com/cssref/sel-visited.html)                                 | a:visited             | 选择所有访问过的链接                                         | 1   |
| [:active](https://www.runoob.com/cssref/sel-active.html)                                   | a:active              | 选择活动链接                                                 | 1   |
| [:hover](https://www.runoob.com/cssref/sel-hover.html)                                     | a:hover               | 选择鼠标在链接上面时                                         | 1   |
| [:focus](https://www.runoob.com/cssref/sel-focus.html)                                     | input:focus           | 选择具有焦点的输入元素                                       | 2   |
| [:first-letter](https://www.runoob.com/cssref/sel-firstletter.html)                        | p:first-letter        | 选择每一个 p 元素的第一个字母                                | 1   |
| [:first-line](https://www.runoob.com/cssref/sel-firstline.html)                            | p:first-line          | 选择每一个 p 元素的第一行                                    | 1   |
| [:first-child](https://www.runoob.com/cssref/sel-firstchild.html)                          | p:first-child         | 指定只有当 p 元素是其父级的第一个子级的样式。                | 2   |
| [:before](https://www.runoob.com/cssref/sel-before.html)                                   | p:before              | 在每个 p 元素之前插入内容                                    | 2   |
| [:after](https://www.runoob.com/cssref/sel-after.html)                                     | p:after               | 在每个 p 元素之后插入内容                                    | 2   |
| [:lang(_language_)](https://www.runoob.com/cssref/sel-lang.html)                           | p:lang(it)            | 选择一个 lang 属性的起始值="it"的所有 p 元素                 | 2   |
| [_element1_~_element2_](https://www.runoob.com/cssref/sel-gen-sibling.html)                | p~ul                  | 选择 p 元素之后的每一个 ul 元素                              | 3   |
| [[*attribute*^=*value*\]](https://www.runoob.com/cssref/sel-attr-begin.html)               | a[src^="https"]       | 选择每一个 src 属性的值以"https"开头的元素                   | 3   |
| [[*attribute*$=*value*\]](https://www.runoob.com/cssref/sel-attr-end.html)                 | a[src$=".pdf"]        | 选择每一个 src 属性的值以".pdf"结尾的元素                    | 3   |
| [[*attribute**=*value*\]](https://www.runoob.com/cssref/sel-attr-contain.html)             | a[src*="runoob"]      | 选择每一个 src 属性的值包含子字符串"runoob"的元素            | 3   |
| [:first-of-type](https://www.runoob.com/cssref/sel-first-of-type.html)                     | p:first-of-type       | 选择每个 p 元素是其父级的第一个 p 元素                       | 3   |
| [:last-of-type](https://www.runoob.com/cssref/sel-last-of-type.html)                       | p:last-of-type        | 选择每个 p 元素是其父级的最后一个 p 元素                     | 3   |
| [:only-of-type](https://www.runoob.com/cssref/sel-only-of-type.html)                       | p:only-of-type        | 选择每个 p 元素是其父级的唯一 p 元素                         | 3   |
| [:only-child](https://www.runoob.com/cssref/sel-only-child.html)                           | p:only-child          | 选择每个 p 元素是其父级的唯一子元素                          | 3   |
| [:nth-child(_n_)](https://www.runoob.com/cssref/sel-nth-child.html)                        | p:nth-child(2)        | 选择每个 p 元素是其父级的第二个子元素                        | 3   |
| [:nth-last-child(_n_)](https://www.runoob.com/cssref/sel-nth-last-child.html)              | p:nth-last-child(2)   | 选择每个 p 元素的是其父级的第二个子元素，从最后一个子项计数  | 3   |
| [:nth-of-type(_n_)](https://www.runoob.com/cssref/sel-nth-of-type.html)                    | p:nth-of-type(2)      | 选择每个 p 元素是其父级的第二个 p 元素                       | 3   |
| [:nth-last-of-type(_n_)](https://www.runoob.com/cssref/sel-nth-last-of-type.html)          | p:nth-last-of-type(2) | 选择每个 p 元素的是其父级的第二个 p 元素，从最后一个子项计数 | 3   |
| [:last-child](https://www.runoob.com/cssref/sel-last-child.html)                           | p:last-child          | 选择每个 p 元素是其父级的最后一个子级。                      | 3   |
| [:root](https://www.runoob.com/cssref/sel-root.html)                                       | :root                 | 选择文档的根元素                                             | 3   |
| [:empty](https://www.runoob.com/cssref/sel-empty.html)                                     | p:empty               | 选择每个没有任何子级的 p 元素（包括文本节点）                | 3   |
| [:target](https://www.runoob.com/cssref/sel-target.html)                                   | #news:target          | 选择当前活动的#news 元素（包含该锚名称的点击的 URL）         | 3   |
| [:enabled](https://www.runoob.com/cssref/sel-enabled.html)                                 | input:enabled         | 选择每一个已启用的输入元素                                   | 3   |
| [:disabled](https://www.runoob.com/cssref/sel-disabled.html)                               | input:disabled        | 选择每一个禁用的输入元素                                     | 3   |
| [:checked](https://www.runoob.com/cssref/sel-checked.html)                                 | input:checked         | 选择每个选中的输入元素                                       | 3   |
| [:not(_selector_)](https://www.runoob.com/cssref/sel-not.html)                             | :not(p)               | 选择每个并非 p 元素的元素                                    | 3   |
| [::selection](https://www.runoob.com/cssref/sel-selection.html)                            | ::selection           | 匹配元素中被用户选中或处于高亮状态的部分                     | 3   |
| [:out-of-range](https://www.runoob.com/cssref/sel-out-of-range.html)                       | :out-of-range         | 匹配值在指定区间之外的 input 元素                            | 3   |
| [:in-range](https://www.runoob.com/cssref/sel-in-range.html)                               | :in-range             | 匹配值在指定区间之内的 input 元素                            | 3   |
| [:read-write](https://www.runoob.com/cssref/sel-read-write.html)                           | :read-write           | 用于匹配可读及可写的元素                                     | 3   |
| [:read-only](https://www.runoob.com/cssref/sel-read-only.html)                             | :read-only            | 用于匹配设置 "readonly"（只读） 属性的元素                   | 3   |
| [:optional](https://www.runoob.com/cssref/sel-optional.html)                               | :optional             | 用于匹配可选的输入元素                                       | 3   |
| [:required](https://www.runoob.com/cssref/sel-required.html)                               | :required             | 用于匹配设置了 "required" 属性的元素                         | 3   |
| [:valid](https://www.runoob.com/cssref/sel-valid.html)                                     | :valid                | 用于匹配输入值为合法的元素                                   | 3   |
| [:invalid](https://www.runoob.com/cssref/sel-invalid.html)                                 | :invalid              | 用于匹配输入值为非法的元素                                   | 3   |

## css 继承、层叠以及特殊性

#### 继承性

在 css 中**某些样式**是具有继承性的，那么什么是继承呢？官方解释，继承是一种规则，它允许样式不仅应用于特定的 html 标签元素，而且应用于其后代元素。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>继承性</title>
    <style type="text/css">
      div {
        color: red;
      }
    </style>
  </head>
  <body>
    <div>我是你们</div>
  </body>
</html>
```

那么该颜色不仅仅应用在了 div 标签，还应用与 div 标签中的所有子元素(`包括div中的文本和span包含的文本`)文本。

> 注意：某些属性是可以继承下来的，比如常见的 color、font 系列的、text-\*系列的等等。
>
> 但有些属性是不可以继承下来的，比如 border:1px solid green;

比如我们在去设计网站的时候，网站统一的字体颜色为 gray,字体大小为 14px。那么我们可以很好的利用 css 的继承性来实现此效果。

```css
body {
  color: gray;
  font-size: 14px;
}
```

#### 层叠

<!-- ![](img\css权重计算规则.png) -->

#### !important

我们在做网页代码时，有些特殊的情况需要为某些样式设置具有最高权值，怎么办？比如我们知道内联样式的权值是 1000，比较大，那么我们可以使用!important 来解决。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>!important的使用</title>
    <style type="text/css">
      div {
        color: green !important;
      }
    </style>
  </head>
  <body>
    <div id="box" style="color:red;">
      <span>MJJ</span>
    </div>
  </body>
</html>
```

> 效果发现文本变为了绿色。但是使用!important 是一个坏习惯，应该尽量避免，因为这严重破坏了样式表中固有的**权值比较规则**，使得在调试 bug 变得更加困难。当两条相互冲突的带有!important 规则作用与同一个标签，那么拥有最大优先级的将会被采用。

## 常用样式

- text-align 文本对齐方式
- text-indent: 2em; 文本缩进 2 个字符
- line-height:2em;表示 2 倍行间距。行高，设置行高等于块元素的 height 可实现文本在块元素中间
- font-size： 字体大小
- text-decoration : none 无修饰；underline：下划线；overline 上划线；line-through：穿过文本的线。
- font-weight：字体粗细
- i 标签 斜体
- font-family：字体样式
- background 背景
- border 边框
- border-radius 边框圆角
- text-shadow 文本阴影
- text-overflow 如何显示溢出内容 text-overflow:clip(修剪文本)|ellipsis(超出显示省略符号)
- box-shodow: 水平阴影的位置 垂直阴影的位置 模糊程度 阴影大小 颜色 内阴影|外阴影
- background-size: cover|contain; [cover 将背景图片按照原来的缩放比，将整个容器铺满；contain 将背景图片按照原来的缩放比，完整的显示到容器中]

## 盒子模型

html 中的标签元素大体被分为三种不同的类型：块状元素、内联元素(也叫行内元素)和内联块元素。

#### 特点

| 标签类别   | 特点                                          |
| ---------- | --------------------------------------------- |
| 块状元素   | 1.独自占据整一行 2.可以设置宽高               |
| 内联元素   | 1.所有的内联元素在一行内显示 2.不可以设置宽高 |
| 行内块元素 | 1.在一行内显示 2.可以设置宽高                 |

所有 HTML 元素可以看作盒子，在 CSS 中，"box model"这一术语是用来设计和布局时使用。

CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：边距，边框，填充，和实际内容。

盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

下面的图片说明了盒子模型(Box Model)：

![css 盒子模型](https://www.runoob.com/images/box-model.gif)

不同部分的说明：

- **Margin(外边距)** - 清除边框外的区域，外边距是透明的。
- **Border(边框)** - 围绕在内边距和内容外的边框。
- **Padding(内边距)** - 清除内容周围的区域，内边距是透明的。
- **Content(内容)** - 盒子的内容，显示文本和图像。

为了正确设置元素在所有浏览器中的宽度和高度，你需要知道的盒模型是如何工作的。

当您指定一个 CSS 元素的宽度和高度属性时，你只是设置内容区域的宽度和高度。要知道，完整大小的元素，你还必须添加内边距，边框和边距。

- 最终元素的总宽度计算公式是这样的：总元素的宽度=宽度+左填充+右填充+左边框+右边框+左边距+右边距

- 元素的总高度最终计算公式是这样的：总元素的高度=高度+顶部填充+底部填充+上边框+下边框+上边距+下边距

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>title</title>
    <style>
      .ex {
        width: 220px;
        padding: 10px;
        border: 5px solid gray;
        margin: 0px;
      }
    </style>
  </head>

  <body>
    <img src="250x250px.gif" width="250" height="250" />

    <div class="ex">上面的图片是250 px宽。 这个元素的总宽度也是250 px。</div>
  </body>
</html>
```

## BFC

BFC(Block formatting context)直译为”块级格式化上下文”。它是一个独立的渲染区域，只有 Block-level box 参与， 它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。

（1）B: BOX 即盒子，页面的基本构成元素。分为 inline 、 block 和 inline-block 三种类型的 BOX

（2）FC: Formatting Context 是 W3C 的规范中的一种概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。常见的 Formatting Context 有 Block fomatting context (简称 BFC)和 Inline formatting context (简称 IFC)

**BFC 布局规则**

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
3. 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC 的区域不会与 float 元素重叠。
5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算 BFC 的高度时，浮动元素也参与计算

**那些元素会生成 BFC**

1. 根元素
2. float 属性不为 none
3. position 为 absolute 或 fixed
4. display 为 inline-block
5. overflow 不为 visible

## CSS Sprite 雪碧图

CSS 雪碧图技术：即 CSS Sprite,也有人叫它 CSS 精灵图，是一种图像拼合技术。该方法是将多个小图标和背景图像合并到一张图片上，然后利用 css 的背景定位来显示需要显示的图片部分。

<img src="https://book.apeland.cn/media/images/2019/05/26/image-20190226145938211.png" style="zoom: 25%;" />

**使用雪碧图的使用场景**

- 静态图片，不随用户信息的变化而变化
- 小图片，图片容量比较小(2~3k)
- 加载量比较大
- 一些大图不建议制作雪碧图

**优点**

- 有效的减少 HTTP 请求数量
- 加速内容显示

每次请求一次，就会和服务器连接一次，建立连接是需要额外的时间开销的。

**雪碧图的实现原理**

它通过 css 的背景属性的 backrground-position 的来控制雪碧图的显示。

控制一个层，可显示的区域范围大消息，通过一个窗口，进行背景图的移动。

## display

#### 块级元素，内联元素

**块级元素(block)特性：**

- 总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;
- 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;

**内联元素(inline)特性：也叫行内元素**

- 和相邻的内联元素在同一行;
- 宽度(width)、高度(height)、内边距的 top/bottom(padding-top/padding-bottom)和外边距的 top/bottom(margin-top/margin-bottom)都不可改变，就是里面文字或图片的大小;

**块级元素主要有：**

- address , blockquote , center , dir , div , dl , fieldset , form , h1 , h2 , h3 , h4 , h5 , h6 , hr , isindex , menu , noframes , noscript , ol , p , pre , table , ul , li

**内联元素主要有：**

- a , abbr , acronym , b , bdo , big , br , cite , code , dfn , em , font , i , img , input , kbd , label , q , s , samp , select , small , span , strike , strong , sub , sup ,textarea , tt , u , var

#### 隐藏元素 - display:none 或 visibility:hidden

隐藏一个元素可以通过把 display 属性设置为"none"，或把 visibility 属性设置为"hidden"。

- visibility:hidden 可以隐藏某个元素，但隐藏的元素仍需占用与未隐藏之前一样的空间。也就是说，该元素虽然被隐藏了，但仍然会影响布局。
- display:none 可以隐藏某个元素，且隐藏的元素不会占用任何空间。也就是说，该元素不但被隐藏了，而且该元素原本占用的空间也会从页面布局中消失。

利用 CSS 我们可以摆脱上面表格里 HTML 标签归类的限制，自由地在不同标签/元素上应用我们需要的属性。

主要用的 CSS 样式有以下三个：

- display:block -- 显示为块级元素, 拥有块级元素的特性。
- display:inline -- 显示为内联元素，拥有内联元素的特性。
- display:inline-block -- 显示为内联块元素，表现为同行显示并可修改宽高内外边距等属性。

比如将所有 li 元素加上 display:inline-block 样式，原本垂直的列表就可以水平显示了。

#### overflow 属性

有时候元素的内容会溢出元素的边框，简单来说也就是盒子太小装不下这么多东西，这时候如果不想改变盒子的大小就可以使用 overflow 属性；

| 值      | 描述                                                     |
| :------ | :------------------------------------------------------- |
| visible | **默认值**。溢出内容不会被修剪，会呈现在元素框之外。     |
| hidden  | 内容会被修剪，溢出内容不可见。                           |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
| auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |
| inherit | 规定应该从父元素继承 overflow 属性的值。                 |

#### overflow-x 属性

如果元素的内容溢出了元素的内容区-剪辑 div 元素的左/右边缘内容；

| 值         | 描述                                   |
| :--------- | :------------------------------------- |
| visible    | 不裁剪内容，可能会显示在内容框之外。   |
| hidden     | 裁剪内容 - 不提供滚动机制。            |
| scroll     | 裁剪内容 - 提供滚动机制。              |
| auto       | 如果溢出框，则应该提供滚动机制。       |
| no-display | 如果内容不适合内容框，则删除整个框。   |
| no-content | 如果内容不适合内容框，则隐藏整个内容。 |

#### overflow-y 属性

如果元素的内容溢出了元素的内容区-剪辑 div 元素的顶部/底部边缘内容；

| 值         | 描述                                   |
| :--------- | :------------------------------------- |
| visible    | 不裁剪内容，可能会显示在内容框之外。   |
| hidden     | 裁剪内容 - 不提供滚动机制。            |
| scroll     | 裁剪内容 - 提供滚动机制。              |
| auto       | 如果溢出框，则应该提供滚动机制。       |
| no-display | 如果内容不适合内容框，则删除整个框。   |
| no-content | 如果内容不适合内容框，则隐藏整个内容。 |

## CSS 定位机制

CSS 有三种基本的定位机制：普通流、浮动（float）和绝对定位（position）。

除非专门指定，否则所有框都在普通流中定位。也就是说，普通流中的元素的位置由元素在 (X)HTML 中的位置决定。

块级框从上到下一个接一个地排列，框之间的垂直距离是由框的垂直外边距计算出来。

行内框在一行中水平布置。可以使用水平内边距、边框和外边距调整它们的间距。但是，垂直内边距、边框和外边距不影响行内框的高度。由一行形成的水平框称为*行框（Line Box）*，行框的高度总是足以容纳它包含的所有行内框。不过，设置行高可以增加这个框的高度。

### 标准文档流的概念

标准流指的是在不使用其他的与排列和定位相关的特殊 CSS 规则时，各种元素的排列规则。HTML 文档中的元素可以分为两大类：行内元素和块级元素。

1. 行内元素不占据单独的空间，依附于块级元素，行内元素没有自己的区域，从左到右排列。它同样是 DOM 树中的一个节点，在这一点上行内元素和块级元素是没有区别的。
2. 块级元素总是以块的形式表现出来，并且跟同级的兄弟块依次竖直排列，左右自动伸展，直到包含它的元素的边界，在水平方向不能并排。

### float

- 浮动的元素脱离了标准文档流，即脱标
- 浮动的元素互相贴靠
- 浮动的元素会产生”字围“效果
- 浮动元素有收缩效果

### position

通过使用 [position 属性](https://www.w3school.com.cn/cssref/pr_class_position.asp)，我们可以选择 4 种不同类型的定位，这会影响元素框生成的方式。

position 属性值的含义：

- static（默认值）

  元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。此时 `top`, `right`, `bottom`, `left` 和 `z-index`属性无效。

- relative

  元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。

  (相对于原来本身的位置通过 top,bottom,left,right 定位，并且可以通过 z-index 进行层次分级。)

- absolute

  元素框从文档流完全删除（脱离标准文档流），并相对于其包含块定位。包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。

  （通过 top,bottom,left,right 定位，定位的起始位置为最近的父元素(postion 不为 static)，否则为 Body 坐标原点，可以通过 z-index 进行层次分级。）

- fixed

  元素框的表现类似于将 position 设置为 absolute，不过其包含块是视窗本身。

  （固定定位，脱离文档流，相对于浏览器窗口进行定位，在拖拽页面滚动条时，该元素不会随其一起滚动，可以通过 z-index 进行层次分级。）

**FAQ：**相对定位实际上被看作普通流定位模型的一部分，因为元素的位置相对于它在普通流中的位置。

#### 相对定位

position: relative;

相对于原来的位置,进行指定像素的偏移, 任然在标准文档流中,原来的位置会被保留.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>相对定位</title>
    <style>
      div {
        margin: 0px auto;
        padding: 0px;
        line-height: 10px;
      }
      .position {
        border: solid 1px coral;
        width: 300px;
        height: 300px;
      }
      a {
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: aqua;
        display: block;
        text-decoration: none;
      }

      a:hover {
        background: #4b9fff;
      }
      .a1 {
        position: relative;
        top: 0px;
        left: 0px;
      }
      .a2 {
        position: relative;
        top: -100px;
        right: -200px;
      }
      .a3 {
        position: relative;
        top: -100px;
        left: 100px;
      }
      .a4 {
        position: relative;
        bottom: 100px;
        left: 0px;
      }
      .a5 {
        position: relative;
        bottom: 200px;
        right: -200px;
      }
    </style>
  </head>
  <body>
    <div class="position">
      <div class="a1">
        <a href="https://www.baidu.com">a1</a>
      </div>
      <div class="a2">
        <a href="https://www.baidu.com">a2</a>
      </div>
      <div class="a3">
        <a href="https://www.baidu.com">a3</a>
      </div>
      <div class="a4">
        <a href="https://www.baidu.com">a4</a>
      </div>
      <div class="a5">
        <a href="https://www.baidu.com">a5</a>
      </div>
    </div>
  </body>
</html>
```

<!-- <img src="C:\Users\62741\Desktop\work\study\img\相对定位.png" style="zoom:80%;" /> -->

#### 绝对定位

```html
position: absolute;
```

相对于原来的位置,进行指定像素的偏移, 不在标准文档流中,原来的位置不会被保留.

没有父级元素定位的前提下,相对于浏览器定位.

假设父级元素存在定位, 相对于父级元素进行偏移. 在父级元素范围内移动.

#### 固定定位

position: fixed;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      body {
        height: 1200px;
      }
      /*绝对定位*/
      div:nth-of-type(1) {
        width: 100px;
        height: 100px;
        background: aqua;
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
      /*固定定位*/
      div:nth-of-type(2) {
        width: 50px;
        height: 50px;
        background: coral;
        position: fixed;
        bottom: 0px;
        right: 0px;
      }
    </style>
  </head>
  <body>
    <div>div1</div>
    <div>div2</div>
  </body>
</html>
```

<!-- ![](C:\Users\62741\Desktop\work\study\img\固定定位.png) -->

### 父级边框塌陷问题

如果使用 position:absolute 和 position:fixed 都会导致元素脱离文档流，由此就会产生相应的问题：子元素脱离文档流，父元素无法被撑开。

- 增加父级边框的高度
- 增加一个空的 div 标签, 清除浮动
- 设置 overflow 属性

```css
overflow: scroll;
```

- 父类增加一个伪类

```css
.demo:after {
  content: '';
  display: block;
  clear: both;
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      .demo {
        border: solid 1px red;
        /*1.设置高度*/
        /*height: 1200px;*/
        /*2.overflow属性*/
        /*overflow: scroll;*/
      }
      /*4.父类增加一个伪类(推荐用法)*/
      .demo:after {
        content: '';
        display: block;
        clear: both;
      }
      .img1 {
        border: coral dashed 1px;
        display: inline-block;
        float: left;
      }
      .img2 {
        border: coral dashed 1px;
        display: inline-block;
        float: left;
      }
      .img3 {
        border: coral dashed 1px;
        display: inline-block;
        float: left;
      }
      .img4 {
        border: coral dashed 1px;
        display: inline-block;
        float: left;
        line-height: 20px;
        font-size: 20px;
      }
      /*3.新增一个空的div标签,清除浮动*/
      /*.img5{*/
      /*    clear: both;*/
      /*}*/
    </style>
  </head>
  <body>
    <div class="demo">
      <div class="img1">
        <img src="images/one.jpg" alt=" " />
      </div>
      <div class="img2">
        <img src="images/two.jpg" alt="" />
      </div>
      <div class="img3">
        <img src="images/three.jpg" alt="" />
      </div>
      <div class="img4">lalalallalalaaaaaaaaaaaaaaaaaaaaaaa</div>
      <!--    <div class="img5">-->
      <!--    </div>-->
    </div>
  </body>
</html>
```

## z-index

用于设置元素的堆叠顺序，拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。仅能在定位元素上奏效例如：（position: absolute）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>z-index</title>
    <style>
      .index {
        margin: 0px;
        padding: 0px;
        width: 450px;
        font-size: 12px;
        line-height: 25px;
        border: coral 1px solid;
      }
      ul,
      li {
        margin: 0px;
        padding: 0px;
        list-style: none;
      }
      .index,
      ul {
        position: relative;
      }
      .tipText,
      .tipBg {
        position: absolute;
        width: 450px;
        height: 25px;
        top: 262px;
      }
      .tipText {
        color: aliceblue;
        z-index: 999;
      }
      .tipBg {
        background: #000000;
        opacity: 0.2;
      }
    </style>
  </head>
  <body>
    <div class="index">
      <ul>
        <li><img src="images/two.jpg" alt="" /></li>
        <li class="tipText">imgages</li>
        <li class="tipBg"></li>
        <li>time:2020-06-28</li>
        <li>lalala</li>
      </ul>
    </div>
  </body>
</html>
```

## CSS3 新特性

### 选择器

#### 属性选择器

选中所有带有 class 属性的元素设置样式

```
[class]{
	color: red;
}
```

选中`class=“active“`的所有元素设置样式

```
[class=active]{
	border: 1px solid #000;
}
```

#### 伪类和伪元素选择器

```txt
1.a标签的爱恨准则
a:link{} 没有被访问过
a:visited{} 访问过后
a:hover{} 鼠标悬停
a:active{} 鼠标摁住
2.伪元素选择器
::after{
    content:'hello world'
}
::before{
    content:"hello"
}
```

#### 其它选择器

```txt
:first-child{} 第一个元素
:last-child{} 最后一个元素
:nth-child(n){} 当前指定的元素
:nth-child(2n){} 偶数
:nth-child(2n-1){} 奇数
:nth-child(xn+1){} 隔x-1行选中元素
```

### 颜色渐变

css3 渐变(gradients)可以让两个或多个指定颜色之间显示平稳的过渡。之前显示颜色渐变是通过图片。但是,通过使用 css3 渐变，你可以减少下载的时间和宽带的使用。此外，渐变效果的元素在放大时看起来效果更好。因为渐变是由浏览器产生的。

为了让各大浏览器上都识别对应的属性，要加上对应的浏览器引擎前缀：
-ms- 兼容 IE 浏览器
-moz- 兼容 firefox
-o- 兼容 opera
-webkit- 兼容 chrome 和 safari

#### 线性渐变

语法:

```
background: liner-gradient(方向,颜色1,颜色2,....);
```

**线性渐变-从上往下(默认)**

```txt
background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
background: -o-linear-gradient(red, blue); /* Opera 11.1 - 12.0 */
background: -moz-linear-gradient(red, blue); /* Firefox 3.6 - 15 */
background: linear-gradient(red, blue); /* 标准的语法 */
```

**线性渐变-从左往右**

```
background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
background: linear-gradient(to right, red , blue); /* 标准的语法 */
```

**线性渐变-对角**

```
background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
```

##### 使用角度

在渐变的方向上做更多的操作，你可以定义一个角度

角度是指水平线和渐变线之间的角度，逆时针方向计算。换句话说，0deg 将创建一个从下到上的渐变，90deg 将创建一个从左到右的渐变。

```
background: -webkit-linear-gradient(180deg, red, blue); /* Safari 5.1 - 6.0 */
background: -o-linear-gradient(180deg, red, blue); /* Opera 11.1 - 12.0 */
background: -moz-linear-gradient(180deg, red, blue); /* Firefox 3.6 - 15 */
background: linear-gradient(180deg, red, blue); /* 标准的语法 */
```

##### 重复的线性渐变

```
/* Safari 5.1 - 6.0 */
background: -webkit-repeating-linear-gradient(red, yellow 10%, green 20%);
/* Opera 11.1 - 12.0 */
background: -o-repeating-linear-gradient(red, yellow 10%, green 20%);
/* Firefox 3.6 - 15 */
background: -moz-repeating-linear-gradient(red, yellow 10%, green 20%);
/* 标准的语法 */
background: repeating-linear-gradient(red, yellow 10%, green 20%);
```

#### 径向渐变

径向渐变由它的中心定义。

为了创建一个径向渐变，你也必须至少定义两种颜色结点。颜色结点即你想要呈现平稳过渡的颜色。同时，你也可以指定渐变的中心、形状（圆形或椭圆形）、大小。默认情况下，渐变的中心是 `center`（表示在中心点），渐变的形状是 `ellipse`（表示椭圆形），渐变的大小是 `farthest-corner`（表示到最远的角落）。

语法：

```
background:radial-gradient(center,形状 大小,开始的颜色,....,最后的颜色);
```

##### 颜色均匀分布(默认)

```
background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */background: radial-gradient(red, green, blue); /* 标准的语法 */
```

##### 不均匀分布

```
background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法 */
```

##### 设置形状

可以通过第一个参数是`circle`或`ellipse`来定义当前的形状。其中`ellipse`是默认值。

```
background: -webkit-radial-gradient(circle, red, yellow, black); /* Safari 5.1 - 6.0 */background: -o-radial-gradient(circle, red, yellow, black); /* Opera 11.6 - 12.0 */background: -moz-radial-gradient(circle, red, yellow, black); /* Firefox 3.6 - 15 */background: radial-gradient(circle, red, yellow, black 50%); /* 标准的语法 */
```

##### 重复的径向渐变

```
/* Safari 5.1 - 6.0 */background: -webkit-repeating-radial-gradient(red, yellow 10%, green 15%);/* Opera 11.6 - 12.0 */background: -o-repeating-radial-gradient(red, yellow 10%, green 15%);/* Firefox 3.6 - 15 */background: -moz-repeating-radial-gradient(red, yellow 10%, green 15%);/* 标准的语法 */background: repeating-radial-gradient(red, yellow 10%, green 15%);
```

### 2D 转换

CSS3 准换可以对元素进行**移动**、**缩放**、**转动**、**拉长或拉伸**

首先我们需要给元素设置 transform 属性

语法:

```
transform: 移动|缩放|转动|拉伸
```

#### translate()方法

该方法，根据 x 轴和 y 轴位置给定的参数，从当前元素**移动**。

```
transform:translate(30px,20px);-ms-transform: translate(30px,20px);-webkit-transform: translate(30px,20px);
```

水平反向移动 30px,垂直方向移动 20px,如果是负值表示反方向

#### rotate()方法

rotate()方法，在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转。

```
transform: rotate(30deg);-ms-transform: rotate(30deg); /* IE 9 */-webkit-transform: rotate(30deg); /* Safari and Chrome */
```

表示顺时针旋转 30 度

#### scale()方法

使元素增加或减小。取决于此方法的第一个参数(宽度)和第二个参数(高度)

语法:

```
transform:scale(2,3);
```

`scale（2,3）`转变宽度为原来的大小的 2 倍，和其原始大小 3 倍的高度。

#### skew()方法

语法:

```
transform: skew(x轴角度,y轴角度);
transform: skew(30deg,20deg);-ms-transform: skew(30deg,20deg); /* IE 9 */-webkit-transform: skew(30deg,20deg); /* Safari and Chrome */
```

在 x 轴和 y 轴上倾斜 20 度和 30 度

### 3D 转换

css3 允许使用 3D 转换对元素进行格式化。

#### 转换属性

##### perspective

在设置 3D 效果之前，要给父元素设置`perspective`属性，此值通常在 600 到 1000 之间。才能看出 3D 效果。通常该属性与 perspective-origin 属性一同使用，这样就能改变 3D 元素的地底部位置。

```
perspective:1000px;
```

##### perspective-origin

定义 3D 元素所基于的 x 轴和 y 轴。该属性允许改变 3D 元素的底部位置。

```
perspective-origin:50% 50%;
```

##### transform-style

指定嵌套元素是怎么样在三维空间中呈现。

> 注意：使用该属性必须先使用 transform 属性

```
transform-style: flat|preserve-3d
```

- flat: 表示所有子元素在 2D 平面呈现
- preserve-3d: 表示所有子元素在 3D 空间中呈现

#### 3D 转换方法

| translateX(_x_)               | 定义 3D 转化，仅使用用于 X 轴的值。       |
| :---------------------------- | ----------------------------------------- |
| translateY(_y_)               | 定义 3D 转化，仅使用用于 Y 轴的值。       |
| translateZ(_z_)               | 定义 3D 转化，仅使用用于 Z 轴的值。       |
| scale3d(_x_,_y_,_z_)          | 定义 3D 缩放转换。                        |
| scaleX(_x_)                   | 定义 3D 缩放转换，通过给定一个 X 轴的值。 |
| scaleY(_y_)                   | 定义 3D 缩放转换，通过给定一个 Y 轴的值。 |
| scaleZ(_z_)                   | 定义 3D 缩放转换，通过给定一个 Z 轴的值。 |
| rotate3d(_x_,_y_,_z_,_angle_) | 定义 3D 旋转。                            |
| rotateX(_angle_)              | 定义沿 X 轴的 3D 旋转。                   |
| rotateY(_angle_)              | 定义沿 Y 轴的 3D 旋转。                   |
| rotateZ(_angle_)              | 定义沿 Z 轴的 3D 旋转                     |

### 新特性之过渡

在 css3 中，为了添加某个效果可以从一种样式转变到另一个样式，无需使用 flash 动画或 JavaScript。

#### 过渡属性 transition

| 属性                       | 描述                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| transition                 | 简写属性，用于一个属性中设置四个过渡属性                                                                                  |
| transition-property        | 规定应用过渡的 css 属性的名称。                                                                                           |
| transiton-duration         | 过渡的时间，默认是 0                                                                                                      |
| transition-timing-function | 规定过渡效果的时间曲线。默认是 ease:慢->快->慢，ease-in:慢速开始，ease-out：慢速结束，ease-in-out:慢->快->慢，linear:匀速 |
| transition-delay           | 延迟几秒之后执行。默认是 0                                                                                                |

设置多个值

```
div{
	transition: width 2s,height 2s, transform 2s;
}
```

#### [@keyframes](https://github.com/keyframes)

要创建 css3 的动画，你必须知道`@keyframes`规则。它的规则是创建动画。规则内指定一个 css 样式和动画开始以及结束的样式

```css
@keyframes change {
  from {
    background-color: red;
  }
  to {
    background-color: green;
  }
}
```

定义好规则之后，把它绑定到一个选择器，否则动画不会有任何效果。

#### animation

```
.box{
	width: 200px;
	height: 200px;
	animation: change 3s;
	background-color: green;
}
```

你可以用百分比规定变化发生的事件。from 和 to，等同于 0%和 100%。0%是动画的开始，100%是动画的完成。

```
@keyframes change{    0%   {background: red;}    25%  {background: yellow;}    50%  {background: blue;}    100% {background: green;}}
```

#### css3 的动画属性

| 属性                                       | 描述                                                     |         |
| ------------------------------------------ | -------------------------------------------------------- | ------- |
| [@keyframes](https://github.com/keyframes) | 规定动画                                                 |         |
| animation                                  | 所有动画属性的简写属性                                   |         |
| animation-name                             | 规定[@keyframes](https://github.com/keyframes)动画的名称 |         |
| animation-duration                         | 规定动画执行的时间。默认是 0                             |         |
| animation-timeing-function                 | 规定动画的速度曲线。跟 transition-timing-function 值一样 |         |
| animation-delay                            | 延迟几秒执行动画                                         |         |
| animation-iteration-count                  | 规定动画被播放的次数。默认是 1。通常取值 infinite:永远   |         |
| animation-direction                        | 规定动画是否在下一周期逆向地播放。normal\                | reverse |

### 新特性之网页布局

#### 多列布局

css 可将文本内容涉及成像报纸一样的多列布局。

#### 多列属性

- `column-count` 指定元素应该被分割的列数
- `column-gap` 指定列和列之间的间隙
- `column-rule-style` 列边框的样式
- `column-rule-width`列边框的宽度
- `column-rule-color` 列边框的颜色
- `column-rule` 列边框的简写
- `column-span` 跨域多少列
- `column-width` 指定列的宽度

#### 弹性盒布局

布局的传统解决方案，基于盒子模型，依赖 display 属性+position 属性+float 属性好。它对于那么特殊的布局非常不方便。比如垂直居中就不容易实现。

2009 年，W3C 提出了一种新的方案——Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

Flex 布局将成为未来布局的首选方案。

##### 1.Flex 布局是什么

Flex 是 Flexible Box 的缩写，也叫”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局

```
.box{    display:flex}
```

> 注意：设置 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效

一旦给父元素设置了`display:flex;`，这个父元素称为 Flex 容器。它的所有子元素自动成为该容器成员，称为 Flex 项目，简称项目。

![](https://book.apeland.cn/media/images/2019/07/19/image-20190709104344921.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。**项目默认沿主轴排列。**

##### 2.容器的常用属性

```
flex-direction : 定义主轴的方向
flex-wrap : 项目在主轴上是否换行
flex-flow : flex-direction和flex-wrap的简写方式
justify-content :定义项目在主轴上的排列方式
align-items: 定义项目在垂直交叉轴的排列方式
align-content:定义多根轴线的对齐方式
```

##### 3.容器 item 属性

```
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

## FAQ

制作网页时，我们要清除元素默认的 padding 和 margin;

**行内元素水平居中显示:**

- line-height+text-align
- 给父元素设置`display:table-cell;`,并且设置`vertical-align:middle`

**块级元素水平垂直居中:**

**方法一：**

- **position+margin**

- **display:table-cell**

- **纯 position**
