---
title: Object.create
author: lvzl
---

> 可以指定原型对象和属性，返回一个新的对象

```js
function create(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
```
