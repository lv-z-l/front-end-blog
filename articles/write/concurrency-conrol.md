---
title: 请求并发控制——字节面试题
author: lvzl
---

```js
// -----------------mock一些请求
const request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

const request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
const request3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 300);
  });
const request4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 400);
  });
```
实现一个 scheduler 函数，满足以下要求：
1. 接收一个参数 max 控制最大并发请求量
2. 执行以下代码依次输出：2、3、1、4
```js
const addRequest = scheduler(2);
addRequest(request1).then(res => {
  console.log(res);
});
addRequest(request2).then(res => {
  console.log(res);
});
addRequest(request3).then(res => {
  console.log(res);
});
addRequest(request4).then(res => {
  console.log(res);
});
```

```js
function scheduler(max) {
  // 存储待发请求
  const reqs = []
  // 请求中的数量
  let requesting = 0
  // 返回一个函数，接收一个参数，添加请求，并返回请求对应的响应
  return function(request) {
      const runTask = () => {
        // 只要有待发请求，并且满足请求中数量小于并发控制
        while(reqs.length && requesting < max) {
          // 取出执行
          const newReq = reqs.shift()
          // 请求中的数量++
          requesting++
          newReq().then(num => {
            // 执行成功后请求中的数量--
            requesting--
            // 接着调用别的请求
            runTask()
            // 调用各自的resolve
            newReq.reslove(num)
          })
        }
      }
      return new Promise((resolve) => {
        // 每个请求的resolve，缓存到请求上，等待请求成功调用
        request.reslove = resolve
        // 将请求添加到待发请求数组中
        reqs.push(request)
        // 开始调用
        runTask() 
      })
  }
}
```

> 😭没写出来，学艺不精，面试过后仔细梳理了一下，才写出来。

