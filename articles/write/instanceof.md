---
title: instanceof运算符
author: lvzl
---

> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

- instanceof 是用来判断A是否为B的实例，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。
- instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
- 不能检测基本数据类型，在原型链上的结果未必准确，不能检测null,undefined
- 实现：遍历左边变量的原型链，直到找到右边变量的 prototype，如果没有找到，返回 false

## ES5

```js
function MyInstanceOf(ins, insOf) {
  let _proto_ = Object.getPrototypeOf(ins)
  // let _proto_ = ins.__proto__
  const _prototype_ = insOf.prototype
  while(_proto_ !== null){
    if (!_proto_) {
      return false
    }
    if (_proto_ === _prototype_) {
      return true
    }
    _proto_ = Object.getPrototypeOf(_proto_)
    // _proto_ = _proto_.__proto__
  }
}

// < -------------TEST------------- >
class A{
  constructor(obj) {
    this.name = obj.name
  }
}

const a = new A({name: 'lvzl'})

console.log(MyInstanceOf(a, A))
```

## ES6

```js
function MyInstanceOf(ins, insOf) {
  return insOf.prototype.isPrototypeOf(ins)
}
```