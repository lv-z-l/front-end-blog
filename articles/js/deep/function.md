---
title: 深入理解函数
author: lvzl
---

当程序在调用某个函数时，做了以下的工作：准备执行环境，初始函数作用域链和 arguments 参数对象。

## 函数概述

### 函数的声明语句

function 命令声明的代码区块，就是一个函数。function 命令后面是函数名，函数名后面是一对圆括号，里面是传 入函数的参数。函数体放在大括号里面。

```js
function hello(a) {
  console.log(a)
}
// 调用：
hello('hello world')
```

### 函数表达式

采用变量赋值的写法：将一个匿名函数赋值给变量。这时，这个匿名函数又称函数表达式。

```js
var hello = function (a) {
  console.log(a)
}
// 将一个具名函数赋值给变量。
var hello = function fn(a) {
  console.log(a)
  console.log(fn) // fn();
  console.log(fn === hello) // true;
}
console.log(fn) // ReferenceError: fn is not defined;
// 说明，具名函数fn和hello是同一个函数，但是作用范围不一致，fn只能在函数体内使用，相当于函数的一个局部变量，hello可在函数内部，外部调用。
```

### Function 构造函数

```js
var add = new Function('x', 'y', 'return x + y')
//等同于
function add(x, y) {
  return x + y
}
// 可以传递任意数量的参数给Function构造函数，只有最后一个参数会被当做函数体，如果只有一个参数，该参数就是函数体。
// Function构造函数可以不使用new命令，返回结果完全一样。
```

### 函数的返回值 return

return 只能出现在函数体内。
​ 一个函数中可以有多个 return 语句。
​return；（表达式的值为 undefined）代表直接提出函数执行，return 之后除了在 finally{}中的代码，都不会再执行。
​return 可以返回任何数据类型的数据。
​ 如果函数调用时在前面加上了 new 前缀，且返回值不是一个对象或者没有返回值，则返回 this(该新对象)

### 函数调用

#### 函数调用模式

```js
function add(x, y) {
  return x + y
}
var sum = add(3, 4)
console.log(sum) //7
// 使用函数调用模式调用函数时，非严格模式下，this被绑定到全局对象；在严格模式（use strict;）下，this是undefined
```

#### 方法调用模式

​ 当一个函数被保存在对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this 被绑定到该对象。如果 调用表达式包含一个提取属性的动作，那么它就是被当做一个方法来调用。

```js
var p = {
  a: 1,
  fn: function () {
    this.a = 2
  }
}
console.log(p.a) // 1
p.fn()
console.log(p.a) // 2
```

#### 构造器调用模式

​ 如果函数或者方法调用之前带有关键字 new，它就构成构造函数调用。
如果构造函数调用在圆括号内包含一组实参列表，先计算这些实参表达式，然后传入函数内。
如果构造函数没有形参，javascript 构造函数调用的语法是允许省略实参列表和圆括号的。凡是没有形参的构造函数调 用都可以省略圆括号。（var o = new Object() 等价于 var o = new Object）

#### 间接调用模式

​ javascript 中函数也是对象，函数对象也可以包含方法。call()和 apply()方法可以用来间接地调用函数
​ 这两个方法都允许显式指定调用所需的 this 值，也就是说，任何函数可以作为任何对象的方法来调用，哪怕这个函数不 是那个对象的方法。两个方法都可以指定调用的实参。call()方法使用它自有的实参列表作为函数的实参，apply()方法则 要求以数组的形式传入参数。

```js
var obj = {}
function sum(x, y) {
  return x + y
}
console.log(sum.call(obj, 1, 2)) //3
console.log(sum.apply(obj, [1, 2])) //3
```

## 函数参数

JS 是弱类型语言，函数定义时未指定函数形参的类型，函数调用也未对传入的实参值做任何类型检查。实际上， javascript 函数调用甚至不检查传入形参的个数。

### 参数个数

> 1.当实参(函数被调用时掺入的实际参数值)比函数声明指定的形参(函数定义时的参数列表)个数要少，剩下的形参都将设置为 undefined 值。

```js
function add(x, y) {
  return x + y // x:1, y: undefined
}
add(1)
```

> 2.当实参比形参个数要多时，剩下的实参没有办法直接获得，需要使用 arguments 对象来获取。

```js
function add(x, y) {
  console.log(arguments)
  console.log(arguments.length)
  return x + y
}
add(1, 2, 3, 4, 5)
// 控制台：
// Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// arguments是个类数组，有数组的部分属性，如length，可以通过索引去获取对应的参数列表。
```

> 3.函数定义时也可以不给形参，到时直接通过 arguments[索引]去获取实参。

### 同名形参

在非严格模式下，函数中可以出现同名形参，且只能访问最后出现的该名称的形参。

```js
function add(x, x, x) {
  return x
}
console.log(add(1, 2, 3)) // 3
// 严格模式编译报错。
```

### 函数重载

在 java 语言中，函数的重载是这样定义的：方法名相同，参数的个数或者类型必须不同。
javascript 函数不能像 Java 上那样实现重载。只能通过检查传入函数中参数的类型和数量并作出不同的反应，来模仿方法的重载。

```js
function doAdd() {
  if (arguments.length == 1) {
    alert(arguments[0] + 10)
  } else if (arguments.length == 2) {
    alert(arguments[0] + arguments[1])
  }
}
```

### 参数传递

> 值传递
> 值传递：对于基本数据类型的参数传递。比如 String，Number，Boolean 等。在向参数传递基本类型的值时，被传递的值会被复制到一个局部变量(命名参数或 arguments 对象的一个元素)。

```js
function addTen(num) {
  num += 10
  return num
}
var count = 20
var result = addTen(count)
console.log(count) //20，没有变化
console.log(result) //30
```

> 引用传递
> 引用传递：参数为引用类型的数据时(Object, Array)，传递过去的是引用数据的内存地址。会把这个地址复制给一个局部变量，因此这个局部变量的变化会直接改变指向该内存地址的引用数据。

```js
function setName(obj) {
  //obj 在函数内部是一个局部变量
  obj.name = 'test'
}
var person = new Object()
setName(person)
console.log(person.name) //'test'
```

## 函数属性和方法

函数是 javascript 中特殊的对象，可以拥有属性和方法，就像普通的对象拥有属性和方法一样。甚至可以用 Function()构造函数来创建新的函数对象。

### 属性

length 属性：arguments 对象的 length 属性表示实参个数，而参数的 length 属性则表示形参个数。

prototype 属性：每一个函数都有一个 prototype 属性，这个属性指向了一个对象的引用，这个对象叫做原型对象(prototype object)。每一个函数都包含不同的原型对象。将函数用作构造函数时，新创建的对象会从原型对象上继承属性。

```js
function fn() {}
var obj = new fn()
fn.prototype.a = 1
console.log(obj.a) //1
```

name 属性：函数定义了一个非标准的 name 属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在 function 关键字后面的标识符，匿名函数的 name 属性为空。

### 方法

每一个函数都包含两个非继承而来的方法：apply()和 call()方法。这两个方法的用途都是在特定的作用域中调用函数。

call()&apply() 要想以对象 o 的方法来调用函数 f()，可以使用 call()和 apply()。

```js
f.call(o);
f.apply(o);
// 比如：
window.color = "red";
var o = {color: "blue"};
function sayColor(){
  console.log(this.color);
}
sayColor();      //red
sayColor.call(this);  //red
sayColor.call(window); //red
sayColor.call(o);   //blue
sayColor.call(o)等价于:
o.sayColor = sayColor;
o.sayColor();  //blue
delete o.sayColor;
// 调用方式：
func.apply(作用域对象, []);
func.call(作用域对象, a,b,c);
// 在非严格模式下，使用函数的call()或apply()方法时，null或undefined值会被转换为全局对象。而在严格模式下，函数的this值始终是指定的值
```

### 应用:

> 找出数组中最大元素。

```js
var a = [10, 2, 4, 15, 9]
Math.max.apply(null, a) //15
```

> 将类数组转成真正的数组。

```js
var add = function(x,y){
	console.log(Array.prototype.slice.apply(arguments));
};
add(1,2);
控制台：
(2) [1, 2]
```

> 将一个数组的值 push 到另一个数组中。

```js
var a = []
Array.prototype.push.apply(a, [1, 2, 3])
console.log(a) //[1,2,3]
Array.prototype.push.apply(a, [2, 3, 4])
console.log(a) //[1,2,3,2,3,4]
```

> bind()

bind()是 es5 新增的方法，这个方法的主要作用就是将函数绑定到某个对象。
当在函数 f()上调用 bind()方法并传入一个对象 o 作为参数，这个方法将返回一个新的函数。以函数调用的方式调用新的函数将会把原始的函数 f()当做 o 的方法来调用，传入新函数的任何实参都讲传入原始函数。
 bind()方法不仅是将函数绑定到一个对象，它还附带一些其他应用：除了第一个实参之外，传入 bind()的实参也会绑定到 this，这个附带的应用是一种常见的函数式编程技术，有时也被称为’柯里化’(currying)。

```js
function getConfig(colors, size, otherOptions) {
  console.log(colors, size, otherOptions)
}
var defaultConfig = getConfig.bind(null, '#c00', '1024*768')
defaultConfig('123') //'#c00 1024*768 123'
defaultConfig('456') //'#c00 1024*768 456'
```
