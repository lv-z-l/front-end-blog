---
title: offset、client、scroll
author: lvzl
---

## offset

偏移量(offset dimension)是 javascript 中的一个重要的概念。涉及到偏移量的主要是`offsetLeft`、`offsetTop`、`offsetHeight`、`offsetWidth`这四个属性。当然，还有一个偏移参照——定位父级`offsetParent`。本文将详细介绍该部分内容。

### 定位父级

<!-- ![offset](C:\work\study\img\offset.png) -->
在理解偏移大小之前，首先要理解 offsetParent。人们并没有把 offsetParent 翻译为偏移父级，而是翻译成定位父级，很大原因是 offsetParent 与定位有关。

定位父级 offsetParent 的定义是：**与当前元素最近的经过定位(position 不等于 static)的父级元素，主要分为下列几种情况**

1. 元素自身有 fixed 定位，offsetParent 的结果为 null。当元素自身有固定定位时，我们知道固定定位的元素相对于浏览器窗口进行定位，此时没有定位父级，offsetParent 的结果为 null。
2. 元素自身无 fixed 定位，且父元素都没有设置定位，offsetParent 的结果为 body。
3. 元素自身无 fixed 定位，且父级元素存在经过定位的元素，offsetParent 的结果为离自身元素最近的经过定位的父级元素。
4. `<body>`元素的 offsetParent 是 null。

### 偏移量

偏移量共包括了 offsetHeight、offsetWidth、offsetLeft、offsetTop 这四个属性。

- offsetWidth 表示元素在水平方向上占用的空间大小，无单位(以像素 px 计)
- offsetHeight 表示元素在垂直方向上占用的空间大小，无单位(以像素 px 计)
- offsetTop 表示元素的上外边框至 offsetParent 元素的上内边框之间的像素距离
- offsetLeft 表示元素的左外边框至 offsetParent 元素的左内边框之间的像素距离

> _注意：如果想修改盒子的大小，请使用 xxx.style.width 进行设置。offsetWidth 和 offsetHeight 是只读属性_

> 总结：相对于父元素（看父元素是否有定位，如果有定位，以父元素为基础，如果没有继续往上寻找，如果一直没有找到，则以 body 为基准）的左边距和上边距。
>
> 要知道某个元素在页面上的偏移量，将这个元素的 offsetLeft 和 offsetTop 与其 offsetParent 的相同属性相加，并加上 offsetParent 的相应方向的边框，如此循环直到根元素，就可以得到元素到页面的偏移量。

```html
<div style="padding: 20px;border:1px solid black;position:absolute;">
  <div id="test" style="width:100px; height:100px; margin:10px;background-color: red;"></div>
</div>
<script type="text/javascript">
  var test = document.getElementById('test')
  console.log(getElementLeft(test)) //39px
  console.log(getElementTop(test)) // 39px
  function getElementLeft(ele) {
    var actualLeft = ele.offsetLeft
    var parent = ele.offsetParent
    while (parent != null) {
      actualLeft = actualLeft + parent.offsetLeft + parent.clientLeft
      parent = parent.offsetParent
    }
    return actualLeft + 'px'
  }
  function getElementTop(ele) {
    var actualTop = ele.offsetTop
    var parent = ele.offsetParent
    while (parent != null) {
      actualTop = actualTop + parent.offsetTop + parent.clientTop
      parent = parent.offsetParent
    }
    return actualTop + 'px'
  }
</script>
```

## client

关于元素尺寸，一般地，有偏移大小 offset、客户端大小 client 和滚动大小 scroll。

<!-- ![client](C:\work\study\img\client.png) -->
客户区大小 client 指的是元素内容及其内边距所占据的空间大小。

- clientHeight 属性返回元素节点的客户区高度 clientHeight = padding-top + height + padding-bottom
- clientWidth 属性返回元素节点的客户区宽度 clientWidth = padding-left + width + padding-right
- clientLeft 属性返回左边框的宽度
- clientTop 属性返回上边框的宽度

#### 页面大小

常用 document.documentElement 的 client 属性来表示页面大小(不包含滚动条宽度)

**所有的 client 属性都是只读的**

**如果给元素设置了 display:none，则客户区 client 属性都为 0**

**每次访问客户区 client 属性都需要重新计算，重复访问需要耗费大量的性能，所以要尽量避免重复访问这些属性。如果需要重复访问，则把它们的值保存在变量中，以提高性能**

```html
document.documentElement.clientWidth; document.documentElement.clientHeight;
```

## scroll

- scrollHeight 表示元素的总高度，包括由于溢出而无法展示在网页的不可见部分
- scrollWidth 表示元素的总宽度，包括由于溢出而无法展示在网页的不可见部分
- scrollTop 属性表示被隐藏在内容区域上方的像素数。元素未滚动时，scrollTop 的值为 0，如果元素被垂直滚动了，scrollTop 的值大于 0，表示元素上方不可见内容的像素高度
- scrollLeft 属性表示被隐藏在内容区域左侧的像素数。元素未滚动时，scrollLeft 的值为 0，如果元素被水平滚动了，scrollLeft 的值大于 0，且表示元素左侧不可见内容的像素宽度

- **没有滚动条时，scrollHeight 与 clientHeight 属性结果相等，scrollWidth 与 clientWidth 属性结果相等**

- **存在滚动条时，但元素设置宽高大于等于元素内容宽高时，scroll 和 client 属性的结果相等**

- **当滚动条滚动到内容底部时，符合以下等式**

```html
scrollHeight = scrollTop + clientHight
```

- **与 scrollHeight 和 scrollWidth 属性不同的是，scrollLeft 和 scrollTop 是可写的**

大部分的浏览器通过 document.documentElement.scrollTop 和 scrollLeft 可以反映和控制页面的滚动；safari 浏览器是通过 document.body.scrollTop 和 scrollLeft 来控制的。

- var docScrollTop = document.documentElement.scrollTop || document.body.scrollTop
- scrollTo(x,y)方法滚动当前 window 中显示的文档，让文档中由坐标 x 和 y 指定的点位于显示区域的左上角
