---
title: JavaScript深入之new的模拟实现
author: lvzl
---

## new关键字的作用：

1.创建一个空对象，作为将要返回的对象实例。

2.将这个空对象的原型，指向了构造函数的`prototype`属性。

3.将这个空对象赋值给函数内部的`this`关键字。

4.开始执行构造函数内部的代码。

## ES5实现

```js
/**
 * 模拟实现new关键字的功能
 */
function imitateNew (){
    var args = Array.prototype.slice.apply(arguments); // 将arguments类数组对象装成数组对象
    var constructor =  args.shift(); // 取到第一个参数，也就是构造函数
    var obj = Object.create(constructor.prototype); // 创建一个对象
    var res = constructor.apply(obj, args); // 执行构造函数
    return (typeof res == 'object' && res != null) ? res : obj; // 返回
}
function cons (name, age){
    this.name = name;
    this.age = age;
    this.height = 180;
}
cons.prototype.log = function () {
    console.log(this.name + ' ' +this.age);
}
var a = new cons('lvzl', 23);
console.log('a----------------',a);
var b = imitateNew(cons, 'lvzl', 23);
console.log('b----------------',b);

// a---------------- cons { name: 'lvzl', age: 23, height: 180 }
// b---------------- cons { name: 'lvzl', age: 23, height: 180 }
```

## ES6实现
```js
/**
 * @param {*} ctor 构造函数
 * @param  {...any} argu 参数
 * @returns 
 */
function myNew(ctor, ...argu) {
  if (!ctor || typeof ctor !== 'function') {
    throw ('ctor must be a function')
  }
  const instance = Object.create(ctor.prototype)
  const ctorRes = ctor.apply(instance, argu)
  if (typeof ctorRes === 'object' && ctorRes !== null) {
    return ctorRes
  }
  return instance
}
```







