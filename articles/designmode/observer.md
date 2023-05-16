---
title: 观察者模式
author: lvzl
---

## 前言

本文属于我的 [前端需要掌握的设计模式](https://juejin.cn/column/7195725894869254202) 专栏。上一篇：[状态模式 和 策略模式 分不清？可以问问 chatgpt塞](https://juejin.cn/post/7215963267491184700)。

**观察者模式** 和 **发布订阅模式** 与其他的设计模式相比，面试中有更大的几率被问起，在前端领域中也是应用广泛，足以体现其重要性，很多人觉得它们是同一个概念，今天笔者就举一些例子来和各位详细说说。
本文主要内容：
1. **观察者模式**
2. **发布订阅模式**
3. **观察者模式** 与 **发布订阅模式** 的区别

## 观察者模式
就像其名字一样，肯定有 **角色** 观察某个 **事件/消息**
1. 谁 观察？
2. 观察 什么？

然后执行什么动作，那就出现了两种角色：
1. 观察者
2. 发布者（发布消息、事件的角色）

为了更好地理解，举个🌰：

假设🧑🏼‍💻（小明）是一个公司开发 A 产品的骨干程序员，他的🧔🏽（领导）收到公司客户的消息：”公司的产品在客户现场出现了严重的缺陷，必须派人出差到现场解决“。🧔🏽收到消息后想起 A 产品的骨干🧑🏼‍💻，于是在微信给🧑🏼‍💻发消息：”🧑🏼‍💻，准备好到 XX 地出差一趟，解决客户现场 A 产品的紧急缺陷“。🧑🏼‍💻回复：”什么时候动身？“（想挣差补的🧑🏼‍💻已经迫不及待了）。🧔🏽说：”等我和客户确定好再告诉你“。在得知这一消息后，🧑🏼‍💻时不时就会看看微信，看看🧔🏽有没有给他发消息。

在上面的例子中：🧑🏼‍💻作为**观察者**，时刻观察着🧔🏽给他发的出差消息，而🧔🏽作为**发布者**，这就是经典的**观察者模式**。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5295956e77f4987bf83c6511d04013f~tplv-k3u1fbpfcp-watermark.image?)
为了加深印象，用代码来实现这个🌰：

先实现两个基础类—— **Publisher** 和 **Observer**，在实际的业务开发中，我们所有的定制化的发布者/观察者逻辑都可以基于这两个基本类来改写。
```js
// 发布者
class Publisher {
  constructor() {
    this.obs = []
  }

  addObs(ob) {
    this.obs.push(ob)
  }

  removeObs(ob) {
    const index = this.obs.indexOf(ob)
    index > -1 && this.obs.slice(index, 1)
  }

  notifyObs() {
    this.obs.forEach(ob => ob.doSomething(this))
  }
}
// 观察者
class Observer {
  constructor() {

  }

  doSomething() {
    console.log('去做点什么吧')
  }

}
```
让小明从领导那里监听商量好的日期：
```js
class Leader extends Publisher {
  constructor() {
    super()
    this.date = null
  }

  getDate() {
    return this.date
  }

  // 跟客户协商日期
  setDate(date) {
    this.date = date
    this.notifyObs()
  }
}
```
小明得到日期，准备去出差：
```js
class XiaoMing extends Observer {
  constructor() {
    super()
    this.date = null
  }

  doSomething(publisher) {
    this.date = publisher.getDate()
    console.log(this.date + '去出差')
  }
}
```
具体来看看小明 和 领导是怎么玩的：
```js
const leader = new Leader() // 领导

const xiaoming = new XiaoMing() // 小明

leader.addObs(xiaoming) // 告诉小明会去出差，日期待定

// 协商日期...

// 协商好了，告诉小明
leader.setDate('2023-03-31')
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf1b3bedf51c4988841e97187190c40d~tplv-k3u1fbpfcp-watermark.image?)

## 发布订阅模式
可能你会觉得 **观察者模式** 和 **发布订阅模式** 只是名字不一样而已，非严格意义上可以这么说，但是这两者还是存在着细微的差异。

举一个 **发布订阅模式** 的🌰：

微信订阅号 大家都知道吧，这名字取得就很好，我们都知道的，当我们订阅了某个订阅号，当订阅号的运营者发布了文章，微信就会给我们推送文章。这就是一个经典的 **发布订阅模式**。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01b147902422440da94873af934b1b20~tplv-k3u1fbpfcp-watermark.image?)

从上图中不难看出：**发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作，这种叫做发布-订阅模式**。

## **观察者模式** 与 **发布订阅模式**的区别
相信经过上面的🌰，大家都看出了区别：
1. 是否存在第三方
2. 发布者是否可以直接与订阅者通信

## 应用
### Vue2 响应式系统原理
关于这个笔者就不多说了，社区专门讲这个的文章太多了，借用官网的图：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06b8b785b913481c959850e3652aad1e~tplv-k3u1fbpfcp-watermark.image?)
### 实现一个全局事件总线
**全局事件总线** 就相当于**发布订阅模式**中的第三方，所有事件的发布、订阅都经过**全局事件总线**：
```js
class EventEmiter {
  constructor() {
    this.events = {}
  }
  // 监听
  on(name, handle) {
    if (!Reflect.has(this.events, name)) {
      this.events[name] = []
    }
    this.events[name].push(handle)
  }
  // 移除监听
  off(name) {
    Reflect.deleteProperty(this.events, name)
  }
  // 派发事件
  emit(name, ...argu) {
    const cbs = this.events[name]
    cbs && cbs.forEach(cb => cb(...argu))
  }
  // 只调用一次
  once(name, handle) {
    const reWriteHandle = (...argu) => {
      handle(...argu)
      this.off(name)
    }
    this.on(name, reWriteHandle)
  }
}
```
实现的版本较简单，了解个大概思路，通用版本可参考[FaceBook推出的通用EventEmiiter库的源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Femitter "https://github.com/facebook/emitter")。
测试一下：
```js
const bus = new EventEmiter()

bus.on('test', () => {
  console.log('test 被调用了')
})

bus.emit('test')
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1792b7d965b441291288702439676ed~tplv-k3u1fbpfcp-watermark.image?)

## 总结
本文通过两个例子，分别用来理解**观察者模式** 和 **发布——订阅模式** 的区别，其区别就在于：**发布者是直接与订阅者通信 还是 通过第三方**，若有写的不对的地方，欢迎评论区指正✊🏼。如果对您有帮助，别忘了点个赞噢😃！