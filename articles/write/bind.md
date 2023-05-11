---
title: JavaScript bind的模拟实现
author: lvzl
---

## 用ES5实现

```js
Function.prototype.bind2 = function (context) {
    // context 是执行函数时的this指向
    if (typeof this !== "function") {
      throw new Error("only function can use bind");
    }
    var self = this; // 此处的this指向调用bind的函数
    var args = Array.prototype.slice.call(arguments, 1); // 获取除去第一个参数 的参数

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments); // bind返回的函数调用时传递的参数
        // 当返回的函数单独调用时，this指向window  this instanceof fNOP为false 
        // 当返回的函数作为构造函数调用时，this指向fBound this instanceof fNOP为true
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

## 用ES6实现
```js
Function.prototype.myBind = function (ctx, ...argu) {
  ctx = ctx || window
  const fn = this
  return function newFn(...newArgu) {
    if (this instanceof newFn) { // new newFn 的情况
      return new Fn(...argu, ...newArgu)
    }
    return fn.apply(ctx, [...argu, ...newArgu])
  }
}

```

## 测试一下
```js
var value = 2;
var foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';
```