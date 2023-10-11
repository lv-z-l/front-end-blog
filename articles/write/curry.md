---
title: 函数柯里化
author: lvzl
---

```js
function curry(fn) {
  return function curried(...argu) {
    if(argu.length >= fn.length) {
      return fn.apply(null, argu)
    }
    return curried.bind(null, ...argu)
  }
}
```