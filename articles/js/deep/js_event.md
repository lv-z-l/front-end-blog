---
title: 事件模型
author: lvzl
---

<script setup>
  import useFancybox from '@use/useFancybox.js'
  useFancybox()
</script>

## 事件模型

### 什么是事件？
事件是用户操作网页时发生的交互动作，比如 `click`， 事件除了用户触发的动作外，还可以是文档加载，窗口滚动和大小调整。事件被封装成一个 `event` 对象，包含了该事件发生时的所有相关信息（ `event` 的属性）以及可以对事件进行的操作（ `event` 的方法）。事件是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型。


### DOM0 级事件模型
这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义。监听函数，也可以通过 `js` 属性来指定监听函数。所有浏览器都兼容这种方式。直接在 `dom` 对象上注册事件名称。

文字太干不想看？那么看下面的例子：
```html
<body onclick="console.log('body')">
  <ul onclick="console.log('ul')">
    <li onclick="console.log('li')">1</li>
  </ul>
</body>
```
点击 `li` 元素，将依次打印: `li => ul => body`，像这种直接在HTML元素上通过`onxxx`定义事件监听就是 `DOM0` 级事件模型, 不要再项目中这么干！

### IE 事件模型
在该事件模型中，一次事件共有两个过程，事件处理阶段和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过 `attachEvent` 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。

还是来一个例子：
```html
<body>
  <ul>
    <li id="liid">1</li>
  </ul>
  <script>
    const body = document.querySelector('body')
    const ul = document.querySelector('ul')
    const li = document.getElementById('liid')
    body.attachEvent('onclick', () => console.log('body'))
    ul.attachEvent('onclick', () => console.log('ul'))
    li.attachEvent('onclick', () => console.log('li'))
  </script>
</body>
```

<img data-fancybox="gallery"  src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/dom1-event.png" />

点击 `li` 元素，将依次打印: `li => ul => body`，这种通过`attachEvent`定义事件监听就是 `IE` 事件模型。

### DOM2 级事件模型
在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 `document` 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 `IE` 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 `addEventListener`，其中第三个参数可以指定事件是否在捕获阶段执行。
还是来一个例子：
```html
<body>
  <ul>
    <li id="liid">1</li>
  </ul>
  <script>
    const body = document.querySelector('body')
    const ul = document.querySelector('ul')
    const li = document.getElementById('liid')
    // 先捕获，目标事件执行，然后冒泡
    body.addEventListener('click', () => console.log('body'))
    ul.addEventListener('click', () => console.log('ul'))
    li.addEventListener('click', () => console.log('li'))
    // 点击 `li` 元素，将依次打印: `li => ul => body`

    // 如果是这样，事件将在捕获阶段执行
    body.addEventListener('click', () => console.log('body'), true)
    ul.addEventListener('click', () => console.log('ul'), true)
    li.addEventListener('click', () => console.log('li'), true)
    // 点击 `li` 元素，将依次打印: `body => ul => li`
  </script>
</body>
```
<img data-fancybox="gallery"  src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/dom2-event.png" />

这种通过`addEventListener`定义事件监听就是 `DOM2` 级事件模型。