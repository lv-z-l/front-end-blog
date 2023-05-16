---
title: 单例模式
author: lvzl
---

## 前言
大家好，我是 [Lvzl](https://juejin.cn/user/1055186511205390)，本文属于[我的专栏——前端需要掌握的设计模式](https://juejin.cn/column/7195725894869254202)系列，上一篇[前端要掌握的设计模式——工厂模式](https://juejin.cn/post/7197070078361436221)。本文主要内容是**单例模式**。

## 什么是单例模式
从名字上就能看出一些端倪，单例 —— 独一无二的实例，没错，就是指一个类只有一个实例，在一个应用中访问到的都是这个实例，这样的模式就是**单例模式**。

## 如何实现单例模式
### 提供获取实例的静态方法
通过在 class 上提供一个静态方法用于获取该 class 的实例。
```js
class Single {
  constructor() {
    //...
  }
  // 实例方法，通过实例对象 调用
  say() {
    console.log('我是一个单例对象')
  }
  // 静态方法，通过 Single.getInstance 调用
  static getInstance() {
    if (!Single.instance) {
      Single.instance = new Single()
    }
    return Single.instance
  }
}

const s1 = Single.getInstance()
const s2 = Single.getInstance()

console.log(s1 === s2) // true
```
### 闭包实现
```js
class Single {
  constructor() {
    //...
  }
  say() {
    console.log('我是一个单例对象')
  }
}

Single.getInstance = (() => {
  let instance
  return () => {
    if (!instance) {
      instance = new Single()
    }
    return instance
  }
})()

const s1 = Single.getInstance()
const s2 = Single.getInstance()

console.log(s1 === s2) // true
```
以上两种实现都是提供了一个获取实例的方法，但是在工作中，我们在没有仔细看别人代码的时候，可能不会按别人预期那样创建类的实例，比如我们大概率会去直接 new，那上面这两种并不能保证获取到的实例唯一。那该如何实现呢？

### new 多次也没问题
```js
let Single = (() => {
  let instance
  class SingleClass {
    constructor() {
      //...
    }
    say() {
      console.log('我是一个单例对象')
    }
  }
  return function() {
    if (!instance) {
      instance = new SingleClass()
    }
    return instance
  }
})()

const s1 = new Single()
const s2 = new Single()

console.log(s1 === s2)
```

## 常见的单例模式应用

| 应用 | 描述 |
| --- | --- |
|  VueX | Vuex 使用**单一状态树**，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a653ed7c31444b548b7617ba00a56e49~tplv-k3u1fbpfcp-watermark.image?) |
| VueRouter | 虽然官网没有说，但是从安装的逻辑是可以看出来的：![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd56e182093c40eab73dfd1e055b6247~tplv-k3u1fbpfcp-watermark.image?)|
| 还有很多 | ... |

## 总结
1. 什么是单例模式？
**类的实例只有一个**
2. 如何实现单例模式？
**类的静态方法 或 闭包实现**
4. 常见的应用有哪些？
**在一个一个应用中全局唯一的实例，就可以用单例模式实现。**