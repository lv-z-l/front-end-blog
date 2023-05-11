---
title: 深入理解闭包
author: lvzl
---

javascript语言特有的链式作用域结构,子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见，反之则不成立。

简单理解闭包：定义在一个函数内部的函数。闭包就是函数内部和函数外部链接的一座桥梁。

闭包需要满足三个条件：

- 访问所在作用域
- 函数嵌套 
- 在所在作用域外被调用

## 使用闭包需要注意的问题

- 循环和闭包的错误理解

```js
function foo() {
	var arr = [];
	for (let i = 0; i < 2; i++) {
		arr[i] = function() {
		return i;
	}
}
	return arr;
}
var bar = foo();
console.log(bar[0]()); //2
```
在循环的过程中，并没有把函数的返回值赋值给数组元素，而仅仅是把函数赋值给了数组元素。这就使得在调用匿名函数时，通过作用域找到的执行环境中储存的变量的值已经不是循环时的瞬时索引值，而是循环执行完毕之后的索引值。
  正确的做法：
```js
function foo() {
  var arr = [];
  for (var i = 0; i < 2; i++) {
    arr[i] = (function (j) {
      return function () {
        return j;
      }
    })(i)
  }
  return arr;
}
// 或者
function foo() {
  var arr = [];
  for (var i = 0; i < 2; i++) {
    (function (j) {
      arr[i] = function () {
        return j;
      }
    })(i)
  }
  return arr;
}
// 或者
function foo() {
  var arr = [];
  for (let i = 0; i < 2; i++) {
    arr[i] = function () {
      return i;
    }
  }
  return arr;
}
```
- this指向问题

```js
var object = {
  name: "object",
  getName: function () {
    return function () {
      console.info(this.name)
    }
  }
}
object.getName()()
// underfined
// 因为里面的闭包函数是在window作用域下执行的，也就是说，this指向windows
```

- 内存泄露问题

```js
function showId() {
  var el = document.getElementById("app")
  el.onclick = function () {
    aler(el.id)  // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
  }
}

// 改成下面
function showId() {
  var el = document.getElementById("app")
  var id = el.id
  el.onclick = function () {
    aler(id)
  }
  el = null  // 主动释放el
}
```



## 自执行函数

在 Javascript 中，圆括号()是一种运算符，跟在函数名之后，表示调用该函数。比如，fn()就表示调用fn函数。
但有时需要定义函数之后，立即调用该函数。这种函数就叫做立即执行函数，全称为立即调用的函数表达式IIFE(Imdiately Invoked Function Expression)

```js
(function () {
  /* code */
}());
//或者
(function () {
  /* code */
})()
```

### 自执行函数用途

IIFE一般用于构造私有变量，避免全局污染。

```js
// 实现一个累加器
var add = (function () {
  var counter = 0;
  return function () {
    return ++counter;
  }
})();
```



## 闭包的用途
- 返回值

```js
var fn = function () {
  var a = 'mjj';
  var b = function () {
    return a;
  }
  return b; // 第一种
}
```

- 函数赋值

```js
var fn2;
var fn = function () {
  var a = 'mjj';
  var b = function () {
    return a;
  }
  fn2 = b;  // 第二种
}
```

- 函数参数

```js
var fn3 = function (argu) {
  /**
   * code
   */
};
var fn = function () {
  var a = 'mjj';
  var b = function () {
    return a;
  }
  fn3(b);  // 第三种
}
```

- IIFE

```js
function fn4(fn) {
  console.log(fn());
}
(function () {
  var a = 'mjj';
  var b = function () {
    return a;
  }
  fn4(b);
})();
```

- getter和setter

```js
var getValue, setValue;
(function () {
  var secret = 0;
  getValue = function () {
    return secret;
  }
  setValue = function (v) {
    if (typeof v === 'number') {
      secret = v;
    }
  }
})();
console.log(getValue());//0
setValue(1);
console.log(getValue());//1
```



- 迭代器

```js
var add = (function () {
  var counter = 0;
  return function () {
    return ++counter;
  }
})();
```

