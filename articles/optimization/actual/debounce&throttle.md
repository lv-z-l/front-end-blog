---
title: 节流 & 防抖
author: lvzl
---
scroll 事件，resize 事件、鼠标事件（比如 mousemove、mouseover 等）、键盘事件（keyup、keydown 等）、input 事件会频繁地触发回调，造成大量计算引发页面的抖动甚至卡顿。为了规避这种情况，我们需要一些手段来控制事件被触发的频率。就是在这样的背景下，throttle（事件节流）和 debounce（事件防抖）出现了
```javascript
function debounce(fn, time) {
  let timer
  return function (...argu) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(null, argu)
      clearTimeout(timer)
    }, time)
  }
}


function throttle(fn, time) {
  let flag = true
  return function (...argu) {
    if (!flag) {
      return
    }
    flag = false
    let timer = setTimeout(() => {
      fn.apply(null, argu)
      flag = true
      clearTimeout(timer)
    }, time)
  }
}
```
