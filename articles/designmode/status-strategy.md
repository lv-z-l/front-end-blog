---
title: 状态模式
author: lvzl
---

本文主要内容：
1. **状态模式** 
2. **状态模式 与 策略模式 的区别**

本文属于我的[前端需要掌握的设计模式](https://juejin.cn/column/7195725894869254202 "https://juejin.cn/column/7195725894869254202")专栏。上一篇[# 很多人早都已经实践策略模式了，却说不知道策略模式是啥？](https://juejin.cn/post/7215465880883675195)

## 状态模式是啥

### 定义
有状态的模式？我们先看看百度百科对其定义：
> 允许一个对象在其内部状🤛🏻态改变时改变它的行为。

还真是和状态有关系。看完有点似懂非懂的样子，那要不问一下 chatgpt ？chatgpt 的回答是这样的：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4967b06720eb472ebcb90825dd033753~tplv-k3u1fbpfcp-watermark.image?)

😌说得还挺详细哈！感觉快懂了，让他举个例子加深一下理解：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/211b0034afdb46cfa5e57e028ff40878~tplv-k3u1fbpfcp-watermark.image?)

好的，我差不多明白了，谢谢您嘞！

### 🌰
相信掘友们看完 chatgpt 的回答，都大概知道了 状态模式 是个啥，接下来就以 chatgpt 给的例子模拟一台自动售货机。

**假设我们的机器只卖一种商品 && 假设找的零钱都是 1 元硬币。**
```js
const { log } = console

class AutoSellMachine {
  constructor() {
    // 状态：
    // 无货： out-of-stock
    // 正常： normal
    // 有货无法找零：unable-to-change
    this.state = 'normal' // 初始化是正常状态
    this.count = 100 // 商品数量
    this.price = 5 // 单价
    this.realMoney = 0 // 找零后的钱
    this.money = 100 // 机器里用来找零的钱
  }
  getState(byCount, money) {
    if (this.count < byCount) {
      return 'out-of-stock'
    } else if (this.money < money - byCount * this.price) {
      return 'unable-to-change'
    } else {
      return 'normal'
    }
  }
  onBusiness(byCount, money) {
    this.state = this.getState()
    if (this.state = 'out-of-stock') {
      log('抱歉！没货啦')
    } else if (this.state = 'unable-to-change') {
      log('抱歉！找不了零钱啦')
    } else {
      const temp = byCount * this.price
      this.realMoney += temp
      this.money -= temp
      this.count -= byCount
      this.state = this.count === 0 ? 'out-of-stock' : 'normal' // 卖掉这次之后的状态
      log('购买成功啦')
    }
  }
}
```

哎，不对呀，这个 if/else 怎么越看越不顺眼呢？学过策略模式的你见到这个代码可能手痒痒了，一顿操作后：
```js
const { log } = console

class AutoSellMachine {
  constructor() {
    // 状态：
    // 无货： out-of-stock
    // 正常： normal
    // 有货无法找零：unable-to-change
    this.state = 'normal' // 初始化是正常状态
    this.count = 100 // 商品数量
    this.price = 5 // 单价
    this.realMoney = 0 // 找零后的钱
    this.money = 100 // 机器里用来找零的钱
  }
  getState(byCount, money) {
    if (this.count < byCount) {
      return 'out-of-stock'
    } else if (this.money < money - byCount * this.price) {
      return 'unable-to-change'
    } else {
      return 'normal'
    }
  }
  onBusiness(byCount, money) {
    this.state = this.getState(byCount, money)
    diffProcess[this.state](byCount)
  }
}

const diffProcess = {
  normal(byCount) {
    const temp = byCount * this.price
    this.realMoney += temp
    this.money -= temp
    this.count -= byCount
    this.state = this.count === 0 ? 'out-of-stock' : 'normal' // 卖掉这次之后的状态
  },
  'out-of-stock'() {
    log('抱歉！没货啦')
  },
  'unable-to-change'() {
    log('抱歉！找不了零钱啦')
  }
}
```
完了你发现，这不就是策略模式么？所以这两种模式的区别到底在哪里？于是又开始去问 chatgpt:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51cb8b0b7c2445459ade2213c5d1e968~tplv-k3u1fbpfcp-watermark.image?)

看完过后还是不太清楚？仔细看看最后的代码，你就能找到一点端倪。
```js
const diffProcess = {
  normal(byCount) {
    const temp = byCount * this.price
    this.realMoney += temp
    this.money -= temp
    this.count -= byCount
    this.state = this.count === 0 ? 'out-of-stock' : 'normal' // 卖掉这次之后的状态
  },
}
```
上面这段逻辑实际运行是会报错的，里面的 this 是有问题的，此处的 this 指向 diffProcess，但我们期望它指向 AutoSellMachine 实例，因为逻辑中的运算需要实例的状态。

我们应该这么来：
```js
const { log } = console

class AutoSellMachine {
  constructor() {
    // 状态：
    // 无货： out-of-stock
    // 正常： normal
    // 有货无法找零：unable-to-change
    this.state = 'normal' // 初始化是正常状态
    this.count = 100 // 商品数量
    this.price = 5 // 单价
    this.realMoney = 0 // 找零后的钱
    this.money = 100 // 机器里用来找零的钱
  }
  diffProcess = {
    instance: this,
    normal(byCount) {
      const temp = byCount * instance.price
      instance.realMoney += temp
      instance.money -= temp
      instance.count -= byCount
      instance.state = instance.count === 0 ? 'out-of-stock' : 'normal' // 卖掉这次之后的状态
    },
    'out-of-stock'() {
      log('抱歉！没货啦')
    },
    'unable-to-change'() {
      log('抱歉！找不了零钱啦')
    }
  }

  getState(byCount, money) {
    if (this.count < byCount) {
      return 'out-of-stock'
    } else if (this.money < money - byCount * this.price) {
      return 'unable-to-change'
    } else {
      return 'normal'
    }
  }
  onBusiness(byCount, money) {
    this.state = this.getState(byCount, money)
    this.diffProcess[this.state](byCount)
  }
}
```

是不是瞬间恍然大悟，那来总结一下：
- 共同点
  - 状态模式、策略模式封装行为、都通过委托来实现行为分发。
- 不同点
  - 状态模式封装的行为会依赖类实例的状态，也就是和实例存在一定的关联；策略模式则没有关联。

## 总结
本文主要通过一个例子讲了下面两点内容：
1. **状态模式** 
2. **状态模式 与 策略模式 的区别**

若有说得不对的，欢迎评论区指正噢😃