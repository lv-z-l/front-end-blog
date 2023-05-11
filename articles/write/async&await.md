---
title: async await
author: lvzl
---

## 是什么

- 是能够让我们以同步的方式来编写异步代码的语法糖

比如下面的两个函数：
```js
// 在1s后resolve promise
function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}
// 在2s后resolve promise
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  })
}
```
我们想要的效果应该是隔1s打印1，隔2s打印2

```js
// 错误示范
function test() {
  const res1 = fn1()
  console.log(res1) // Promise {<pending>}
  const res2 = fn2()
  console.log(res2) // Promise {<pending>}
}

// 正常应该这么写
function test() {
  const res1 = fn1()
  res1.then(() => {
    console.log(res1) // 1
    const res2 = fn2()
    res2.then(() => {
      console.log(res2) // 2
    })
  })
}

// 用async await语法糖
async function test() {
  const res1 = await fn1()
  console.log(res1) // 1
  const res2 = await fn2()
  console.log(res2) // 2
}
```
> 所以说 async await 是能够让我们以同步的方式来编写异步代码的语法糖

> 那要怎么来实现这么一个效果呢？

## 使用ES2015的新特性 ———— generator函数

不熟悉请移步[ES6入门教程](https://es6.ruanyifeng.com/#docs/generator)

先看个例子：
```js

function* asdff() {
  const res1 = yield fn1()
  const res2 = yield fn2()
  return res1 * res2
}

const ss = asdff()
const res1 = ss.next()
console.log(res1) // 1
const res2 = ss.next(2)
console.log(res2) // 2
console.log(ss.next(2)) // 4



function generatorToAsync(generator) {
  const ss = generator()
  const next1 = ss.next()
  next1.value.then(res1 => {
    console.log(res1) // 1
    const next2 = ss.next(res1)
    next2.value.then(res2 => {
      console.log(res2) // 2
      console.log(ss.next()) //4
    })
  })
}

```

## 通用实现
```js
function generatorToAsync(generator) {
  return function (...args) { // 有可能传参
    const generatorRes = generator.apply(this, args)
    return new Promise((resolve, reject) => { // async 就是返回Promise
      const callNext = current => { // 用于递归调用next()，直到done === true
        if (current.done) { // done === true 调用完了
          return resolve(current.value)
        }
        let newCurrent
        // current.value需要包装成Promise，因为有可能不是Promise
        Promise.resolve(current.value).then(res => {
          try {
            newCurrent = generatorRes.next(res) // 执行next，从第二次next开始，next的参数，作上一个yield表达式的返回值
          } catch (error) {
            return reject(error)
          }
          callNext(newCurrent) // 递归
        })
      }
      const first = generatorRes.next()
      callNext(first)
    })
  }
  
}
// 测试一下
const likeAsync = generatorToAsync(asdff)
likeAsync().then(res => console.log(res))

```

