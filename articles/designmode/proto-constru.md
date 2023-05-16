---
title: 原型模式、构造器模式
author: lvzl
---

## 前言
大家好，我是 [Lvzl](https://juejin.cn/user/1055186511205390)，本文属于[我的专栏——前端需要掌握的设计模式](https://juejin.cn/column/7195725894869254202)系列，上一篇文章 [前端需要掌握的设计模式——开篇](https://juejin.cn/post/7195792730573439032)，今天正式开始学习设计模式。

咱先来看看设计模式的分类，下图中共有23种设计模式，分为3大类，分别是创建型、结构型、行为型。
<p align=center><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/6/169f16406d230ffe~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt="" width="50%" /></p>

上图来源：[掘金小册——JavaScript 设计模式核⼼原理与应⽤实践](https://s.juejin.cn/ds/BMW6gQ3/)

今天的主要内容是创建型中的 **原型模式** 和 **构造器模式**两种。

所谓的 **创建型**，其实简单理解，就是指  **创建对象** 的方式。

下面的内容会涉及到 JavaScript 中的一些知识点，比如构造函数、原型、原型对象、new操作符的原理、prototype等，需要熟悉的可以移步我的另一篇文章 [当面试被问到JavaScript面向对象，需要掌握哪些知识点？](https://juejin.cn/post/7195369668146626617)

## 原型模式
**原型模式** 让所有实例共享原型对象的属性和方法，不必在构造函数中定义对象实例的信息。
```js
function Person(name, age){
  Person.prototype.name = name;
  Person.prototype.age = age;
  Person.prototype.sayName = function(){
    console.log(this.name);
  }
}
var p1 = new Person('mjj', 28);
p1.sayName();//"mjj"

```
或者用一个包含所有**属性**和**方法**的对象字面量来重写整个原型对象。
```js
function Person(){};
Person.prototype = {
  constructor:Person,
  name:'mjj',
  age:28,
  sayName:function(){
    console.log(this.name);
  }
}
var p1 = new Person();
p1.sayName();//"mjj"
```
存在的问题：
1. 引用类型值属性会被所有的实例对象共享并修改，所以这种模式几乎不会单独使用。
2. 实例的属性值没法单独设置

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e42878617a014f0ea1f9cc800932e516~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" /></p>

在上图中，我们期望 p1 的 age 为 12，p2 的 age 为 13。但在初始化 p2 之后，p1 的属性也跟着变了。
## 构造器模式
看一段代码你就懂了，做前端的你绝对见过。
```js
function Person(name,age){
  this.name = name;
  this.age = age;
  this.sayName = function(){
    alert(this.name);
  };
}
var person1 = new Person("mjj",28);
var person2 = new Person("alex",25);
```
**构造器模式** 就是在**构造函数**中 初始化**实例对象**的**属性**和**方法**。上面的代码中**Person**就是一个构造器。在这个构造器中，我们能够观察到：实例的共同点（都有name、age、sayName属性/方法），不同点（name、age的属性值各个实例不同），由此可见，**构造器封装了实例对象的“变”与“不变”**。

缺点：
1. 每个方法都要在每个实例上重新创建一遍，创建多个完全相同任务的方法完全没有必要，浪费内存空间

## 总结
1. 原型模式、构造器模式可能你不知道这还是一种设计模式，但是各位应该都知道它的实现，毕竟这是JavaScript的基础知识。
2. 构造器封装了实例对象的“变”与“不变”。
3. 这两种设计模式平时几乎不会单独去使用任何一种，缺点很明显。
4. 平时最常用的是将以上两种组合起来使用——组合模式（在构造器中定义**实例对象**的**属性**和**方法**，在**原型**上定义公有的**属性**和**方法**）。

```js
function Person(name,age){
  // 各个实例的属性值不一样
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor:Person,
  // 共有的属性
  isPerson: true,
  sayName:function(){
    console.log(this.name);
  }
}
var p1 = new Person('mjj',28);
var p2 = new Person('jjm',30);
alert(p1.sayName === p2.sayName);// true
```
