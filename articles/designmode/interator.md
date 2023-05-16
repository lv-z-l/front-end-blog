---
title: 迭代器模式
author: lvzl
---

## 前言
本文属于我的 [前端需要掌握的设计模式](https://juejin.cn/column/7195725894869254202) 专栏。上一篇：[# 说说 观察者模式 和 发布——订阅模式 的区别](https://juejin.cn/post/7216994437246255161)。

本文以 **用 `for of`遍历 `Object`** 为引 来聊聊 **迭代器模式**。

## 什么是迭代器模式
> 迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。 ——《设计模式：可复用面向对象软件的基础》

可以说**迭代器模式**就是为了遍历存在的。提到遍历，大家都对那些手段耳熟能详了，下面我们先简单列一下各种数据类型的遍历：
### 遍历数组
1. `for` 循环
2. `forEach`
3. `map`
4. `reduce`
5. `keys`
6. `values`
7. `for of`
8. ......

其中`keys` `values` `for of` 需要`Iterator`支持，后面会介绍`Iterator`

### 遍历 `Map/Set`
1. `keys`
2. `entries`
3. `forEach`
4. ......

### 遍历 `Object`
1. `for in`
2. 先`Object.keys(obj)`得到对象每个属性的数组, 然后使用数组的遍历方法遍历每个 `key`，就能获取 每个 `key` 对应的 `value`

### `Iterator` 和 `for of`
`Iterator`是ES6提出的一个接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作。

#### `Iterator` 的作用
1. 为各种数据结构，提供一个统一的、简便的访问接口。
2. ES6提出了新的遍历命令`for...of`循环，`Iterator` 接口主要供`for...of`消费。

#### `Iterator` 的遍历过程
既然数组是支持`for...of`循环的，那数组肯定部署了 `Iterator` 接口，我们通过它来看看`Iterator` 的遍历过程。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f73968885ad74dfaa4745e3cdf70ca82~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />

从图中我们能看出：
1. `Iterator` 接口返回了一个有`next`方法的对象。
2. 每调用一次 next，依次返回了数组中的项，直到它指向数据结构的结束位置。
3. 返回的结果是一个对象，对象中包含了当前值`value` 和 当前是否结束`done`

## 用 for of 遍历 Object
回到标题中的问题，我们现在如何去让一个对象也可以用 `for of` 来遍历它呢？
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d19577c549ca42ffbd080e4242d1d63f~tplv-k3u1fbpfcp-watermark.image?)

根据上面讲到的内容，需要给对象也部署 `Iterator` 接口（其实就是在`Object.prototype`上实现一个以`Symbol.iterator`为名的`function`，这个`function`返回一个有`next`方法的对象，每调用一次 `next`, 能够依次返回数组中的项，直到它指向数据结构的结束位置 ）

```js
function objectIterator() {
  const keys = Object.keys(this)
  let index = 0
  return {
    next: () => {
      const done = index >= keys.length
      const value = done ? undefined : this[keys[index]]
      index++
      return {
        done,
        value
      }
    }
  }
}

Object.prototype[Symbol.iterator] = objectIterator

const obj = {
  key: '1',
  value: '2'
}

for (const iterator of obj) {
  console.log(iterator)
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03f9c632c8cb42649000c90a519f548f~tplv-k3u1fbpfcp-watermark.image?)