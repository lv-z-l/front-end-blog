---
title: display 属性
author: lvzl
next: false
prev: false
---

## 块级元素，内联元素

**块级元素(block)特性：**

- 总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;
- 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;

**内联元素(inline)特性：也叫行内元素**

- 和相邻的内联元素在同一行。
- 宽度(width)、高度(height)、padding-top/padding-bottom 和 margin-top/margin-bottom 设置无效，就是里面文字或图片的大小。

**块级元素主要有：**

address , blockquote , center , dir , div , dl , fieldset , form , h1 , h2 , h3 , h4 , h5 , h6 , hr , isindex , menu , noframes , noscript , ol , p , pre , table , ul , li

**内联元素主要有：**

a , abbr , acronym , b , bdo , big , br , cite , code , dfn , em , font , i , img , input , kbd , label , q , s , samp , select , small , span , strike , strong , sub , sup ,textarea , tt , u , var

## 隐藏元素

1. **CSS 属性 `display: none;`：**
   这是最常见和简单的隐藏元素的方式之一。通过设置 `display: none;`，元素会被完全从页面布局中移除，并且不会占据空间。

   ```css
   .hidden-element {
     display: none;
   }
   ```

   特点：

   - 元素不占用空间，对布局没有影响。
   - 不会触发元素的渲染和交互事件。
   - 可以通过 JavaScript 动态地切换元素的显示与隐藏。

2. **CSS 属性 `visibility: hidden;`：**
   使用 `visibility: hidden;` 可以隐藏元素，但元素仍然占据空间，不会改变布局。

   ```css
   .hidden-element {
     visibility: hidden;
   }
   ```

   特点：

   - 元素仍占用空间，对布局有影响。
   - 不会触发元素的渲染和交互事件。
   - 适用于需要占位但暂时隐藏的元素。

3. **CSS 属性 `opacity: 0;`：**
   通过将元素的不透明度设置为 0，可以隐藏元素，但仍然会占据空间，并影响布局。

   ```css
   .hidden-element {
     opacity: 0;
   }
   ```

   特点：

   - 元素仍占用空间，对布局有影响。
   - 元素在渲染时会被处理，可能会影响性能。
   - 可以通过 CSS 动画实现渐变隐藏和显示效果。

4. **CSS 属性 `position: absolute; left: -9999px;`：**
   将元素移出可视区域，通常结合绝对定位来实现。

   ```css
   .hidden-element {
     position: absolute;
     left: -9999px;
   }
   ```

   特点：

   - 元素不占用空间，对布局没有影响。
   - 可以在屏幕外使用，但需要注意滚动问题。
   - 适用于需要在 DOM 结构中保留元素，但不需要显示的情况。
