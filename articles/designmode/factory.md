---
title: 工厂模式
author: lvzl
---

## 前言
大家好，我是 [Lvzl](https://juejin.cn/user/1055186511205390)，本文属于[我的专栏——前端需要掌握的设计模式](https://juejin.cn/column/7195725894869254202)系列，上一篇[前端要掌握的设计模式——原型模式 & 构造器模式](https://juejin.cn/post/7196859948553994299)。本文主要内容是**工厂模式**。
## 以一个🌰为引
在说**工厂模式**之前，先看个🌰：公司新上线管理系统，系统中用户角色决定了用户操作权限，现有个职工A要使用系统，让你为其创建用户。

你可能会这么写：
```js
class Worker {
  constructor(name) {
    this.name = name
    this.role = 'worker'
    this.oauth = ['C01', 'C02'] // 权限
  }
}
const a = new Worker('A')
```
接着，现有个经理B要使用系统，让你为其创建用户。
```js
class Manager {
  constructor(name) {
    this.name = name
    this.role = 'manager'
    this.oauth = ['C01', 'C02', 'C03', 'C04', 'C05']
  }
}
const b = new Manager('B')
```
然后Boss找你说要用系统...
```js
class Boss {
  constructor(name) {
    this.name = name
    this.role = 'boss'
    this.oauth = ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08']
  }
}
const boss = new Boss('Boss')
```
然后给了你一个名单，名单上有 name 和 role 信息，让你为名单上面的员工全部创建账号并分配账号权限。你可能会这么做：
```js
function createCount(userList) {
  const counts = []
  for (let i = 0; i < userList.length; i++) {
    const { name, role } = userList[i];
    let res
    if (role === 'worker') {
      res = new Worker(name)
    } else if (role === 'manager') {
      res = new Manager(name)
    } else if (role === 'boss') {
      res = new Boss(name)
    }
    // ...
    counts.push(res)
  }
  return counts
}
```
下面看看用工厂模式如何做。
## 工厂模式
找到以上需求中不变的点：

很明显，不管是worker，还是manager，还是boss，都有三个属性（name、role、oauth）。

变化的点：
1. name、role、oauth属性值不同。
2. oauth 根据 role 的不同而不同。

使用工厂模式实现：
```js
// 封装不变
class User {
  constructor(name, role, oauth) {
    this.name = name
    this.role =  role
    this.oauth = oauth
  }
}

// 封装变化
function Factory(name, role) {
  let oauth = ['C01', 'C02']
  switch (role) {
    case 'worker':
      oauth = ['C01', 'C02']
      break;
    case 'manager':
      oauth = ['C01', 'C02', 'C03', 'C04', 'C05']
      break;
    case 'boss':
      oauth = ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08']
      break;
    //...
  }
  return new User(name, role, oauth)
}
 
function createCount(userList) {
  const counts = []
  for (let i = 0; i < userList.length; i++) {
    const { name, role } = userList[i];
    counts.push(Factory(name, role))
  }
  return counts
}
```
省了两个构造器！

Factory 干了啥？从逻辑上可以看到，主要是**封装了创建对象的过程**
## 总结
**工厂模式封装了创建对象的过程**。

适用场景：当我们写了好几个构造函数、用了好几次 new 操作符，当你看自己的代码都想骂人的时候，就应该思考是不是可以用工厂模式重构一下了。


