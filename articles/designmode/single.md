---
title: 单例设计模式
author: lvzl
---

## 定义

> 是一种创建型模式，提供了一种创建对象的最佳方式，这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建，在应用程序运行期间，单例模式只会在全局作用域下创建一次实例对象，让所有需要调用的地方都共享这一单例对象，比如Vuex Vue-Router

## 实现

### 先实现一个简单的类
```js
class Single {
  constructor(instanceInfo) {
    const {name, age} = instanceInfo
    this.name = name
    this.age = age
  }

  printInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}
```
### 用闭包实现

```js
const ProxySingle = (function () {
  let instance = null
  return function(info) {
    if (instance) {
      return instance
    }
    instance = new Single(info)
    return instance
  }
})()
```
### 用类的静态方法
```js
Single.getSingleIntance = function(info){
  if (this.intance) {
    return this.intance
  }
  this.intance = new Single(info)
  return this.intance
}
```

### 测试
```js
// const singleOne = Single.getSingleIntance({name: '1', age: 2})
// const singleTwo = Single.getSingleIntance({name: '2', age: 4})
const singleOne = ProxySingle({name: '1', age: 2})
const singleTwo = ProxySingle({name: '2', age: 4})

console.log(singleOne === singleTwo) // true
```
