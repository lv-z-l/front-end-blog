---
title: JS异步执行机制
author: lvzl
---

<script setup>
  import useFancybox from '@use/useFancybox.js'
  useFancybox()
</script>

## JS 异步执行机制

在 js 执行过程中有 **微任务** 和 **宏任务** 之分, 且 JS 在执行下一个宏任务之前会保证微任务队列为空。

## 微任务

`Promise.then`, `process.nextTick(node)`

## 宏任务

`整体的JS代码`, `setTimeout`, `setInterval`

## demo

```js
const { log } = console;
log(1); // 首先呢，JS代码是从上至下逐行执行，到这里先打印 1
setTimeout(() => { // 到了这里，遇到了异步任务，把异步操作加到异步队列中，然后接着往下执行JS代码
  log(2);
});
new Promise((resolve, reject) => {
  log(3); // 执行到这里，这里的代码也是同步的，因此打印 3
  resolve(); // resolve 执行以后会进入.then, .then里面也是异步执行， 因此加入异步队列，整个的JS代码第一次就执行完了
}).then(() => {
  log(4);
});
// 现在异步队列中有两个任务, setTimeout，Promise.then. JS在执行下一个宏任务之前会保证微任务队列为空，因此会先打印 4, 再打印 2
// 正确答案: 1342
```

## 再看一个比较复杂的 demo

```js
setTimeout(() => {
    console.log('set1 ')
    new Promise((resolve, reject) => {
        console.log('pr1 ')
        resolve()
    }).then(() => {
        console.log('then1 ');
    })
})

setTimeout(() => {
    console.log('set2 ')
})

new Promise((resolve, reject) => {
    console.log('pr2 ')
    resolve()
}).then(() => {
    console.log('then2 ');
})

new Promise((resolve, reject) => {
    console.log('pr3 ')
    resolve()
    setTimeout(() => {
        console.log('set3 ');
    })
}).then(() => {
    console.log('then3 ');
})
console.log(1);
```

> 正确答案：pr2 pr3 1 then2 then3 set1 pr1 then1 set2 set3

## 流程图

<img data-fancybox="gallery"  src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/js-run-async.jpg" />

## 参考

1. [网易云课堂公开课视频](https://study.163.com/course/courseLearn.htm?courseId=1210407064)

2. [tasks-microtasks-queues-and-schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules)
