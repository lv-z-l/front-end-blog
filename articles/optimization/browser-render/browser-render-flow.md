---
title: 浏览器运行机制
author: lvzl
---

<img data-fancybox="gallery" src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/browser-run.png"/>

<script setup>
  import useFancybox from '@use/useFancybox.js'
  useFancybox()
</script>

### HTML、CSS、JS 阻塞渲染

- **HTML 本身需要解析成 DOM，肯定是阻塞渲染的。**
- **CSS 需要解析成 CSS DOM，也是阻塞的，它可以和 DOM 并行构建，一般情况下不会阻塞 DOM 构建。**
- **JS 可以操作 DOM、CSS，并阻塞 DOM、CSSDOM 的构建，间接的阻塞渲染。**

### 提升渲染速度的一些方式

- 将 CSS 放在 head 标签中，让 CSS DOM 更早的开始构建，以加快渲染
- 将 JS 放在 HTML 最后加载，防止其阻塞渲染
- 在 **script** 标签配置 **async，异步请求 JS 文件，请求成功立即执行（请求中一般不阻塞 DOM 构建），但是需要考虑 JS 模块之间的依赖关系（依赖关系不强可用 async）**
- 在 **script** 标签配置 **defer，延迟 JS 的执行时间到 DomContentLoaded 事件即将被触发时顺序执行。（依赖关系强 用 defer）**
- **DNS 预解析** **<link rel="dns-prefetch" href="" />**
- **preload**
- **prefetch**
- **preload**、**prefetch**有什么区别
  1.  可以让你按照自己的想法**给重要的资源一个更高的优先级， 无论是 preload 还是 prefetch，都只会加载，不会执行**
  2.  **preload**：以高优先级为当前页面加载资源
  3.  **prefetch**：以低优先级为后面的页面加载未来需要的资源，只会在空闲时才去加载
  4.  文件加载
  ```html
  <link rel="preload" href="main.js" as="script">
  <link rel="prefetch" href="news.js" as="script">
  ```
  5.  文件执行
  ```html
  <script src="main.js" defer></script>
  ```
  6.  **preload 的资源应该在当前页面立即使用**，如果不**加上 script 标签执行**预加载的资源，控制台中会显示警告，提示预加载的资源在当前页面没有被引用
  7.  **prefetch**的目的是取未来会使用的资源，所以当用户从 A 页面跳转到 B 页面时，进行中的**preload**的资源会被中断，而**prefetch**不会
  8.  使用**preload**时，应配合**as**属性，表示该资源的优先级，使用** as="style" **属性将获得最高的优先级，**as ="script"**将获得低优先级或中优先级，其他可以取的值有**font/image/audio/video**
  9.  **preload **字体时要加上 **crossorigin **属性，即使没有跨域，否则会重复加载**<link rel="preload href="font.woff" as="font" crossorigin>**

### 回流和重绘

#### 回流

更改了 DOM 的几何属性，比如 width、height、margin、padding 等，或者隐藏了元素，都会引起回流，也就是上图中的直接回到第一步了。
引起回流的操作：

- 更改了 DOM 的几何属性
- 隐藏、显示了元素（影响到布局的那种）
- 改变 DOM 树的结构
- 获取这些属性：offsetTop、offsetLeft、offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight 时
- 调用了 **getComputedStyle**

#### 重绘

没有更改几何属性，只是颜色，背景这些变化，会进行重绘。
