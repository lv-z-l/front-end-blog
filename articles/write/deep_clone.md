---
title: 深拷贝
author: lvzl
---

## 深拷贝
```js
function clone(dest, source, map = new WeakMap()) {
  if (!isObjectOrArray(dest) || !isObjectOrArray(source)) {
    return dest
  }
  if (map.get(source)) {
    return source
  }
  map.set(source, true)
  for (const key in source) {
    if(isObject(source[key])) {
      dest[key] = clone({}, source[key], map)
    } else if(Array.isArray(source[key])) {
      dest[key] = clone([], source[key], map)
    } else {
      dest[key] = source[key]
    }
  }
  return dest
}

function isObjectOrArray(obj) {
  const type = Object.prototype.toString.call(obj)
  return type === '[object Object]' || type === '[object Array]'
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(obj) {
  return Array.isArray(obj)
}

// test
const source = {
  a: 1,
  b: 2,
  c: null,
  d: undefined,
  e: '',
  f: [1,2,3],
  g: {
    h: 20,
    i: {j: '123', k: [{l: 888}]}
  }
}
source.s = source

const aaa = clone({}, source)
```