---
title: 计算LocalStorage，SessionStorage的大小
author: lvzl
---

## 计算大小

```js
function getStorageSize(type = 'local') {
  const storage = type === 'local' ? localStorage : sessionStorage
  storage.clear()
  const oneBytes = '8' // 1字节
  const oneKB = new Array(1024).fill(oneBytes).join('') // 1KB
  let key = 0
  let flag = true
  while (flag) {
    try {
      storage.setItem(key + '', oneKB)
      key += 1
    } catch (error) {
      flag = false
      console.log('size:', key / 1024 + 'MB')
      storage.clear()
    }
  }
}
```

## 计算已使用的

```js
function getUsedStorage(type = 'local') {
  const storage = type === 'local' ? localStorage : sessionStorage
  return (
    Object.entries(storage)
      .map(entry => entry.join(''))
      .join('').length /
    1024 /
    1024
  )
}

```