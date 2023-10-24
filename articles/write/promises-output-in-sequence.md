---
title: 多个Promise按顺序输出——字节面试题
author: lvzl
---

现有一个 mock 请求函数 request，用于模拟请求.
```js
const request = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(i), Math.random() * 1000)
  })
}

// 改动以下代码，使最终打印的数字顺序 与 遍历的顺序一致。即 0，1，2，..., 9
for(let i = 0; i < 10; i++) {
  request(i).then(res => console.log(res))
}
```

可以使用`Promise.all`:
```js
const reqs = []
for(let i = 0; i < 10; i++) {
  reqs.push(request(i).then(res => res))
}

Promise.all(reqs).then(results => {
  while(results.length) {
    console.log(results.shift())
  }
})
```