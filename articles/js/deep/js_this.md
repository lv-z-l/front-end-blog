---
title: 深入理解this指向
author: lvzl
---

### 默认绑定 （this绑定到window 的情况）

- 全局环境下 

```js
console.log(this === window); //true
```

- 函数独立调用时

```js
function foo(){
  console.log(this === window);
}
foo();//true
```

- 被嵌套的函数独立调用时，this默认绑定到window

```js
var a = 0;
var obj = {
  a: 2,
  foo: function () {
    function test() {
      console.log(this);
    }
    test();
  }
}
obj.foo();
```

- IIFE立即执行函数

```js
var a = 0;
function foo() {
  (function test() {
    console.log(this.a);
  })()
};
var obj = {
  a: 2,
  foo: foo
}
obj.foo();//0
```

- 闭包

```js
var a = 0;
function foo() {
    console.log(this.a); // 2
  function test() {
    console.log(this.a); // 0
  }
  test();
}
var obj = {
  a: 2,
  foo: foo
}
obj.foo();
```



### 隐式绑定

被直接对象所包含的函数调用，也被称为方法地调用，this隐式绑定到该直接对象

```js
function foo() {
  console.log(this.a);
}
var obj1 = {
  a: 1,
  foo: foo,
  obj2: {
    a: 2,
    foo: foo
  }
}
//foo()函数的直接对象是obj1,this隐式绑定到obj1
obj1.foo();//1
//foo()函数的直接对象是obj2,this隐式绑定到obj2
obj1.obj2.foo();//2
```

### 隐式丢失

隐式丢失是指被隐式绑定的函数丢失绑定对象，从而默认绑定到window。这种情况容易出错却又常见
- 函数别名（将函数赋值给一个变量）

```js
var a = 0;
function foo1() {
  console.log(this.a);
}
var obj = {
  a: 1,
  foo: foo1
}
var obj2 = {
  a: 2,
  fun: ''
}
obj2.fun = obj.foo;
var func = obj.foo;
obj2.fun(); // 2
func(); // 0
```



- 参数传递（将函数当作一个参数传递）

```js
var a = 0;
function foo() {
  console.log(this.a);
}
function bar(fn) {
  fn();
}
var obj = {
  a: 2,
  foo: foo
}
// 把obj.foo当做参数传递给bar函数时,有隐式的函数赋值 fn = obj.foo,只是把foo函数赋给了fn,而fn与obj对象毫无关系
bar(obj.foo); // 0
```



- 回调函数（将一个函数当做参数传递给setTimeOut()，setInterval()，forEach()，map()等方法时）

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
}
setTimeout(obj.foo, 100);//0
```



- 间接引用

```js
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo();//3;
//将o.foo函数赋值给p.foo函数，然后立即执行。相当于仅仅是foo()函数的立即调用
(p.foo = o.foo)();//2
p.foo(); // 4
```



- 其他情况

```js
var a = 0;
var obj = {
  a: 2,
  foo: foo
}
function foo() {
  console.log(this.a);
}
(obj.foo = obj.foo)();//0
(false || obj.foo)();//0
(1, obj.foo)();//0
```



### 显示绑定

通过call()、apply()、bind()方法把对象绑定到this上，叫做显示绑定。对于被调用的函数来说，叫做间接调用。
普通的显示绑定无法解决隐式丢失问题。

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2
};
var obj2 = {
  a: 5
}
foo();//0
foo.call(obj); // 2
foo.apply(obj); // 2
foo.bind(obj)(); // 2
obj2.func = foo.bind(obj);
obj2.func(); // 2
obj2.func.call(obj2); // 2
obj2.func.bind(obj2)(); // 2
```



- 硬绑定

```js
var a = 0;
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2
};
var bar = function () {
  foo.call(obj);
}
//在bar函数内部手动调用foo.call(obj)。无论之后如何调用函数bar，它总会手动会在obj上调用foo
bar();//2
setTimeout(bar, 2000);//2
bar.call(window);//2
```



- JavaScript内置函数显示绑定

  javascript中新增了许多内置函数，具有显式绑定的功能，如数组的5个迭代方法：map()、forEach()、filter()、some()、every()

```js
var id = 'window';
function foo(el){
  console.log(el,this.id);
}
var obj = {
  id: 'fn'
};
[1,2,3].forEach(foo);//1 "window" 2 "window" 3 "window"
[1,2,3].forEach(foo,obj);//1 "fn" 2 "fn" 3 "fn"
```



### new 绑定

如果函数或者方法调用之前带有关键字new，它就构成构造函数调用。对于this绑定来说，称为new绑定。
- 构造函数中没有使用return语句，用于初始化对象

```js
function fn(){
  this.a = 2;
}
var test = new fn();
console.log(test);//{a:2}
```

- 构造函数中使用了return语句，但没有返回值

```js
function fn(){
  this.a = 2;
  return;
}
var test = new fn();
console.log(test);//{a:2}
```

- 构造函数中使用了return返回一个对象

```js
var obj = {a:1};
function fn(){
  this.a = 2;
  return obj;
}
var test = new fn();
console.log(test);//{a:1}
```

- 注意

  尽管有时候构造函数看起来像一个方法调用，它依然会使用这个新对象作为this。也就是说，在表达式new o.m()中，this并不是o。

```js
var o = {
  m:function(){
    return this;
  }
}
var obj = new o.m();
console.log(obj,obj === o);//{} false
console.log(obj.contructor === o.m);//true
```



### 严格模式

- 使用函数的call()和apply()时,严格模式下，this始终是绑定的值。非严格模式下，当call()和apply()里面如果指向的是null或者undefined，会指向window。

- 严格模式下，独立调用的函数，this为undefined

### 总结

this的四种绑定规则：

- 默认绑定
- 隐式绑定
- 显式绑定
- new绑定

分别对应函数的四种调用方式：

- 独立调用，指向window
- 方法调用，指向该方法属于的那个对象
- 间接调用，指向call，apply传入的对象
- 构造函数调用，指向实例对象
