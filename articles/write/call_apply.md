---
title: JavaScript call和apply的模拟实现
author: lvzl
---

## call

简单的介绍call的作用：

> 我们可通过call()方法在指定this指向和传递若干个参数的条件下调用某个函数（function）。

举个简单的例子：

```js
var obj = {
    val: '2021'
}
function testCall(){
    console.log(this.val);
}
testCall.call(obj);
// 2021
```

两点：

1.testCall函数中的this指向了obj

2.testCall函数执行了

### 模拟实现（第一步）

那么我们该怎么模拟实现这两个效果呢？

试想当调用 call 的时候，把 obj 对象改造成如下：

```
var obj = {
    val: '2021',
    testCall: function() {
        console.log(this.val)
    }
};

obj.testCall(); // 2021
```

这个时候 this 就指向了 obj，是不是很简单呢？

但是这样却给 obj 对象本身添加了一个属性，这可不行呐！

不过也不用担心，我们用 delete 再删除它不就好了~

所以我们模拟的步骤可以分为：

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

```js
Function.prototype.mycall = function(context){
    context.fn = this;
    context.fn();
    delete context.fn;
}
```

测试一下：

```js
var obj = {
    val: '2021'
}
function testCall(){
    console.log(this.val);
}
testCall.mycall(obj);

// PS C:\GitHub\Blog\demos\call&&apply模拟实现> node .\0301.js
// 2021
// PS C:\GitHub\Blog\demos\call&&apply模拟实现> 
```

测试通过了。

### 模拟实现（第二步）

call还支持传递若干个函数参数来执行函数，而且传入的参数不定长。

比如：

```js
function testCall1(name, age){
    console.log(this.val, 'name ' + name, 'age ' + age);
}
testCall1.call(obj, '小明', '18');
// 2021 name 小明 age 18
```

处理参数，然后有了第二版的代码：

```js
Function.prototype.mycall = function(context){
    context.fn = this;
    var args = [];
    for(var i = 1; i < arguments.length; i++){
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}
```

### 模拟实现（第三步）

注意下两个小细节：

1. this可以传入null，并且此时this指向window
2. 函数是有返回值的

第三版代码：

```JS
Function.prototype.mycall = function(context, firstParam){
    var context = Object(context) || window;
    var result;
    context.fn = this;
    if (!firstParam) {
        result = context.fn();
    } else {
        var args = [];
        for(var i = 1; i < arguments.length; i++){
            args.push('arguments[' + i + ']');
        }
        result = eval('context.fn(' + args +')');
    }
    delete context.fn;
    return result;
}
```

```js
// 用Es6实现
Function.prototype.mycall = function(context, ...argu) {
  context = context || window
  const funcid = Symbol()
  context[funcid] = this // 调用call的函数
  const result = context[funcid](...argu)
  delete context[funcid]
  return result
}
```

测试一下：

```js
var obj = {
    val: '2021'
}
function testCall(name, age){
    console.log(this.val, 'name' + name, 'age' + age);
    return this.val;
}
console.log(testCall.mycall(obj, '小明', '18'));
// 2021 name小明 age18
// 2021
```


## apply

> apply和call的作用类似，只不过传递参数时，apply要将所有参数放到一个数组中。

举个例子：

```js
var obj = {
    val: '2021'
}
function testCall(name, age){
    console.log(this.val, 'name' + name, 'age' + age);
    return this.val;
}
console.log(testCall.apply(obj, ['小明', '18']));
```

实现几乎一致，直接粘代码了

```js
Function.prototype.myApply = function(context, paramArr){
    var context = Object(context) || window;
    var result;
    context.fn = this;
    if (!paramArr || !Array.isArray(paramArr)) {
        result = context.fn();
    } else {
        var args = [];
        for(var i = 0; i < paramArr.length; i++){
            args.push('paramArr[' + i + ']');
        }
        result = eval('context.fn(' + args +')');
    }
    delete context.fn;
    return result;
}
```
```js
// ES6
Function.prototype.myApply = function(ctx, argu = []){
  ctx = ctx || window
  const funcId = Symbol()
  ctx[funcId] = this
  const result = ctx[funcId](...argu)
  Reflect.deleteProperty(ctx, 'funcId')
  return result
}
```

