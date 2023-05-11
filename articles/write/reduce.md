---
title: Array.prototype.reduce
author: lvzl
---

> Array.prototype.reduce((previousValue, currentValue, currentIndex, array) => {}, initialValue)

```js
Array.prototype.myReduce = function (fn, initVal) {
  const arr = this
  let res = initVal
  arr.forEach((item, index) => {
    res = fn.apply(arr, [res, item, index, arr])
  })
  return res
}
```
