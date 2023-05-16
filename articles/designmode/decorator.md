---
title: 装饰器模式
author: lvzl
---

## 什么是装饰器模式
指在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式，它属于对象结构型模式。
### ✅ 优点
装饰器模式的主要优点有：

- 装饰器是继承的有力补充，比继承灵活，在不改变原有对象的情况下，动态的给一个对象扩展功能，即插即用。
- 装饰器模式完全遵守开闭原则，因为我们增加功能是在不改变原有对象的情况下。

### ❌ 缺点

装饰器模式过度使用会增加许多额外逻辑，增加程序的复杂性。

## 装饰器的例子
就拿一个 CRUD 的例子来说吧，先有一个用户的表格，现在需要实现一个新增用户的功能，于是你写了：
```js
class UserAction {
  constructor() {
    this.userList = [
      {name: '1', age: '1'},
      {name: '2', age: '2'},
      {name: '3', age: '3'},
    ]
  }
  add(userinfo) {
    this.userList.push(userinfo)
  }
  delete(userinfo) {
    this.userList.splice(this.userList.indexOf(userinfo), 1)
  }
  static getUser() {
    if (UserAction.instance) {
      return UserAction.instance
    }
    UserAction.instance = new UserAction()
    return UserAction.instance
  }
}

const useraction = UserAction.getUser()

useraction.add({name: '4', age: '4'})
```
然后又加了个需求，添加完了要给个提示，添加成功了，你可能觉得很简单：
```js
add(userinfo) {
  this.userList.push(userinfo)
  message('添加成功了')
}
```
但是这样做的话，万一别人用到了你的逻辑，那别的地方也就都会提示，但是你不能确定别人需不需要。而且不符合开闭原则。此时我们就换一种做法：
```js
function addUser(userinfo) {
  useraction.add(userinfo)
  message('添加成功了')
}
```

## 一些很常见的例子
- vscode 的插件（我们需要某个插件，不可能说给人家vscode提需求，让人家搞吧，于是就有了插件系统，暴露了一些类给我们扩展功能）
- webpack、Chrome 的插件同样如此
- 穿衣服的搭配，平时穿衣服可能会搭配围巾、项链、手表、胸针...，这些东西都是装饰，我们不会要求说把围巾和衣服缝合在一起。