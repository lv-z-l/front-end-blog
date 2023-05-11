---
title: JS面向对象编程
author: lvzl
---
## 面对对象的思想
它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。
- 对象是单个实物的抽象。
- 对象是一个容器，封装了属性(property)和方法(method)。
## 构造函数

构造函数就是专门用来生成实例对象的函数。也可以说是对象的模板。
特点：
- 函数体内的this代表了所要生成的对象实例。
- 生成对象的时候，必须使用new命令。忘记使用new命令，导致d1变成了undefined,而name属性变成了全局变量。为了避免这个问题，可以让构造函数在严格模式下执行。
- 构造函数第一个字母大写。
```js
function Dog (name){
  this.name = name; // this指向d1
}
var d1 = new Dog('阿黄');
console.log(d1.name);//阿黄

```
## new一个构造函数的执行过程
- 创建一个空对象，作为将要返回的对象实例。
- 将这个空对象的原型，指向了构造函数的prototype属性。
- 将这个空对象赋值给函数内部的this关键字。
- 开始执行构造函数内部的代码。

## constructor

每个对象在创建时都自动拥有一个构造函数属性contructor,其中包含了一个指向其构造函数的引用。而这个constructor属性实际上继承自原型对象，而constructor也是原型对象唯一的自有属性。
```js
console.log(d1.constructor === Dog);//true
console.log(d1.__proto__.constructor === Dog);//true
```
优缺点：
1. 使用构造函数的好处在于所有用同一个构造函数创建的对象都具有同样的属性和方法。
2. 但是构造函数并没有消除代码冗余。使用构造函数生成对象，构造函数中的每个方法都要在每个实例上重新创建一遍，造成系统资源的浪费。
3. constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

## 原型对象和prototype

通过构造函数的new操作创建实例对象后，会自动为构造函数创建prototype属性，该属性指向实例对象的原型对象。通过同一个构造函数实例化的多个对象具有相同的原型对象。
### prototype属性的作用

JavaScript继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。
```js
function Person(name){
  this.name = name;
}
Person.prototype.age = 18;
Person.prototype.sayAge = function(){
  console.log('My age is'+ this.age);
}
var p1 = new Person('大王');
var p2 = new Person('二王');
console.log(p1.age);//18
console.log(p2.age);//18
p1.sayAge();
p2.sayAge();

```
- 当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。
- 因此修改原型对象的方法或者属性，实例获取时会立刻体现变化。
- 通过实例对象更改原型对象的方法或属性，会影响其他实例。因为原型对象只有一份。
- 如果某个实例对象本身拥有和原型对象同名册属性和方法时，修改原型对象的属性和方法不会影响该实例。

### 修改原型对象

constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。
```js
  function Person(name){
    this.name = name;
  }
  console.log(Person.prototype.constructor === Person);//true
  //修改原型对象
  Person.prototype = {
    constructor:Person,
    fn:function(){
      console.log(this.name);
    }
  };
  var p1 = new Person('阿黄');
  console.log(p1 instanceof Person);//true
  console.log(Person.constructor == Person);//true
  console.log(Person.constructor === Object);//false
```
## 原型链

JavaScript规定，所有对象都有自己的原型对象(prototype)。
- 任何一个对象，都可以充当其它对象的原型；
- 由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个原型链(prototype chain):对象的原型，再到原型的原型……。
- 所有对象都继承了Object.prototype的属性。这就是所有对象都有valueof和toString方法的原因，因为这是从Object.prototype继承的。

```js
Object.prototype.__proto__  //null

```
> 读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

## __proto__

实例对象内部包含一个__proto__属性，指向该实例对象对应的原型对象。
```js
function Foo(){};
var f1 = new Foo;
console.log(f1.__proto__ === Foo.prototype); //true

```
## 构造函数、原型对象和实例对象之间的关系

```js
function Foo(){};
var f1 = new Foo();
// Foo：构造函数；
// f1：通过new一个Foo构造出来的实例对象。
f1.__proto__ = Foo.prototype
Foo.prototype.constructor === Foo
f1.constructor === Foo

```

## 创建对象的几种方式

### 对象的字面量

可以用来创建单个对象，但如果要创建多个对象，会产生大量的重复代码
- new Object()
```js
	// 使用new操作符后跟Object构造函数用以初始化一个新创建的对象。
	var person = new Object();
	person.name = 'mjj';
	person.age = 28;

```
- 对象字面量语法糖
```js
	var person = {
	  name:'mjj';
	  age:28
	}

```
- Object.create()
```js
	// 从一个实例对象，生成另一个实例对象。
	// 原型对象
	var A = {
	  getX:function(){
	    console.log('hello');
	  }
	};
	//实例对象
	var B = Object.create(A);
	console.log(B.getX);//"hello"

```
### 工厂模式
该模式抽象了创建具体对象的过程，用函数来封装以特地接口创建对象的细节。
```js
  function createPerson(name,age){
    var p = new Object();
    p.name = name;
    p.age = age;
    p.sayName = function(){
      alert(this.name);
    }
    return p;
  }
  var p1 = createPerson('mjj',28);
  var p2 = createPerson('alex',28);
  var p3 = createPerson('阿黄',8);

```
> 解决：
- 创建多个相似对象的问题

> 问题: 
- 对象识别的问题，因为使用该模式并没有给出对象的类型。

### 构造函数模式
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
> 问题
- 每个方法都要在每个实例上重新创建一遍，创建多个完成相同任务的方法完全没有必要，浪费内存空间。

### 构造函数拓展模式
基于构造函数模式的问题，将方法定义到全局，这样就不需要重新创建：
```js
function Person(name,age){
  this.name = name;
  this.age = age;
  this.sayName = sayName;
}
function sayName(){
  alert(this.name);
}
var p1 = new Person("mjj",28);
var p2 = new Person("alex",25);
console.log(person1.sayName === person2.sayName);//true
```
> 问题：
- 在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。
- 如果对象需要定义很多方法，就要定义很多全局函数，严重污染全局空间，这个自定义的引用类型没有封装性可言了

### 寄生构造函数模式

- 创建一个函数，该函数的作用仅仅是封装创建对象的代码
- 再返回新创建的对象。
- 该模式是工厂模式和构造函数模式的结合。
  
```js
function Person(name,age){
  var p = new Object();
  p.name = name;
  p.age = age;
  p.sayName = function(){
    alert(this.name);
  }
  return p;
}
var p1 = new Person('mjj',28);
var p2 = new Person('alex',28);
//具有相同作用的sayName()方法在person1和person2这两个实例中却占用了不同的内存空间
console.log(p1.sayName === p2.sayName);//false

```
> 问题：
- 每个方法都要在每个实例上重新创建一遍
- 使用该模式返回的对象与构造函数之间没有关系

### 稳妥构造函数模式

> 特点
- 所谓稳妥对象指没有公共属性
- 方法也不引用this对象
- 不适用new操作符调用构造函数
- 稳妥对象最适合在一些安全环境中(这些环境会禁止使用this和new)或者在防止数据被其他应用程序改动时使用
```js
function Person(name,age){
  //创建要返回的对象
  var p = new Object();
  //可以在这里定义私有变量和函数
  //添加方法
  p.sayName = function (){
    console.log(name);
  }
  //返回对象
  return p;
}
//在稳妥模式创建的对象中，除了使用sayName()方法之外，没有其他方法访问name的值
var p1 = Person('mjj',28);
p1.sayName();//"mjj"

```
> 问题： 
- 每个方法都要在每个实例上重新创建一遍
- 创建的对象与构造函数之间也没有什么关系

### 原型模式
> 特点
- 让所有实例共享它的属性和方法。不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。
```js
function Person(){
  Person.prototype.name = "mjj";
  Person.prototype.age = 29;
  Person.prototype.sayName = function(){
    console.log(this.name);
  }
}
var p1 = new Person();
p1.sayName();//"mjj"
var p2 = new Person();
p2.sayName();//"mjj"
alert(p1.sayName === p2.sayName);//true

```
### 更简单的原型模式
> 为了减少不必要的输入，也为了从视觉上更好地封装原型的功能，用一个包含所有属性的方法的对象字面量来重写整个原型对象
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
console.log(p1.constructor === Person);//true
console.log(p1.constructor === Object);//false

```
> 问题
- 引用类型值属性会被所有的实例对象共享并修改，这也是很少有人单独使用原型模式的原因。

### 组合模式
> 特点
- 组合使用构造函数模式和原型模式是创建自定义类型的最常见方式。
- 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性
- 这种组合模式还支持向构造函数传递参数。实例对象都有自己的一份实例属性的副本，同时又共享对方法的引用，最大限度地节省了内存。
- 该模式是目前使用最广泛、认同度最高的一种创建自定义对象的模式。
```js
function Person(name,age){
  this.name = name;
  this.age = age;
  this.friends = ['alex','阿黄'];
}
Person.prototype = {
  constructor:Person,
  sayName:function(){
    console.log(this.name);
  }
}
var p1 = new Person('mjj',28);
var p2 = new Person('jjm',30);
p1.friends.push('wusir');
alert(p1.friends);//['alex','阿黄','wusir']
alert(p2.friends);//['alex','阿黄']
alert(p1.friends === p2.friends);//false
alert(p1.sayName === p2.sayName);//true

```
### 动态原型模式
- 动态原型模式将组合模式中分开使用的构造函数和原型对象都封装到构造函数中，然后通过检查方法是否被创建，来决定是否初始化原型对象
- 更具有封装性
```js
function Person(name,age){
  //属性
  this.name = name;
  this.age = age;
  //方法
  if(typeof this.sayName != "function"){ // 每创建一个对象，就会执行这里，因此需要判断只是在第一次调用时添加原型的属性，方法
    Person.prototype.sayName = function(){
      console.log(this.name);
    }
  }
}
var p1 = new Person('mjj',28);
p1.sayName();//"mjj"

```
## 实现继承的几种方式
继承是指在原型对象的所有属性和方法，都能被实例对象共享。

### 原型链继承

本质是重写原型对象，代之以一个新类型的实例。
```js
function Super(){
  this.value = true;
}
Super.prototype.getValue = function(){
  return this.value
}
function Sub(){};
//Sub继承了Super
Sub.prototype = new Super();
Sub.prototype.constroctor = Sub;
var ins = new Sub();
console.log(ins.getValue());//true

```
> 问题：
- 私有原型属性会被实例共享
- 在创建子类型的实例时，不能向父类型的构造函数传递参数。

### 借用构造函数继承
借用构造函数的技术(有时候也叫做伪类继承或经典继承)。这种技术的基本思想相当简单，即在子类构造函数的内部调用父类构造函数。
```js
function B(name){
  this.name = name;
}
B.prototype.getValue = function(){
  return this.name;
}
function A(){
  //继承了B，同时还传递了参数
  B.call(this,'MJJ');
  //实例属性
  this.age = 28;
}
var p = new A();
alert(p.name);//'MJJ'
alert(p.age);//28

```
相当于把构造函数B中的this替换成了p实例对象，这样在B只有定义的私有属性会被继承下来，原型属性中定义的公共方法不会被继承下来。
> 问题：
- 如果仅仅是借用构造函数，那么将无法避免构造函数模式存在的问题(方法都在构造函数中定义)
- 在父类的原型中定义的方法，对子类而言是不可见的。所以这种方式使用较少

### 组合继承（重要）
使用原型链实现对原型上的公共属性和方法的继承
借用构造函数继承来实现对父类私有属性的继承
```js
  function Super(name){
    this.name = name;
    this.colors = ['red','blue','green'];
  }
  Super.prototype.sayName = function(){
    alert(this.name);
  }
  function Sub(name,age){
    Super.call(this,name);
    this.age = age;
  }
  // 继承方法
  Sub.prototype = new Super();
  Sub.prototype.constructor = Sub;
  Sub.prototype.sayAge = function(){
    alert(this.age);
  }
  var ins = new Sub('mjj',28);
  ins.colors.push('black');
  console.log(ins.colors);// ["red", "blue", "green", "black"]
  ins.sayName();//'mjj'
  ins.sayAge();//28
  var ins2 = new Sub('alex',38);
  console.log(ins2.colors);//["red", "blue", "green"]
  ins2.sayName();//'alex'
  ins2.sayAge();//38
```
> 问题：
- 无论在什么情况下，都会调用两次父类的构造函数：一次是在创建子类原型的时候，另一次是在子类构造函数内部。

### 寄生组合式继承
不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。
```js
function Super(name){
  this.name = name;
  this.colors = ['red','blue','green'];
}
Super.prototype.sayName = function(){
  alert(this.name);
}
function Sub(name,age){
  //继承实例属性
  Super.call(this,name);
  this.age = age;
}
// 继承公有的方法
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function(){
  alert(this.age);
}
var ins = new Sub('mjj',28);
ins.colors.push('black');
console.log(ins.colors);// ["red", "blue", "green", "black"]
ins.sayName();//'mjj'
ins.sayAge();//28
var ins2 = new Sub('alex',38);
console.log(ins2.colors);//["red", "blue", "green"]
ins2.sayName();//'alex'
ins2.sayAge();//38
```
- 实现多重继承
JavaScript中不存在多重继承，那也就意味着一个对象不能同时继承多个对象，但是我们可以通过变通方法来实现。
```js
// 多重继承:一个对象同时继承多个对象
// Person Parent Me
function Person(){
	this.name = 'Person';
}
Person.prototype.sayName = function(){
	console.log(this.name);
}
// 定制Parent
function Parent(){
	this.age = 30;
}
Parent.prototype.sayAge = function(){
	console.log(this.age);
}
function Me(){
	// 继承Person的属性
	Person.call(this);
	Parent.call(this);
}
// 继承Person的方法
Me.prototype = Object.create(Person.prototype);
// 不能重写原型对象来实现 另一个对象的继承
Object.assign(Me.prototype,Parent.prototype);
// 指定构造函数
Me.prototype.constructor = Me;
var me = new Me();
```
## Object中的常用方法

### Object对象中的原生方法：直接定义在当前构造函数对象Object对象上的
- Object.keys()
Object.keys方法的参数是一个对象，返回一个数组。该数组的成员都是对象自身的所有属性名。只返回可枚举的属性。

- Object.getOwnPropertyNames()
与Object.keys()类似，不同的是可返回对象不可枚举的属性。比如数组的length属性。

- Object.values()
Object.values方法的参数是一个对象，返回一个数组。该数组的成员都是对象自身的所有属性值。只返回可枚举的属性值。

- Object.entries()
Object.entries方法的参数是一个对象，返回一个数组。该数组的成员都是对象自身的所有属性：属性值。只返回可枚举的属性和属性值。相当于keys()和values()的合集。
```js
let user = { name: "leo", age: 18};
Object.entries(user);
// [["name","leo"],["age",18]]

自己实现entries方法：
// Generator函数实现：  
function* entries(obj){
    for (let k of Object.keys(obj)){
        yield [k ,obj[k]];
    }
}
// 非Generator函数实现：
function entries (obj){
    let arr = [];
    for(let k of Object.keys(obj)){
        arr.push([k, obj[k]]);
    }
    return arr;
}

```
- 用处

```js
// Javascript中没有提供对象的length属性或者方法，可以用以上两个方法获取对象的属性个数
var va = 'name';
var obj = {
	[va]: 'aaa',
	age: 18,
	hobby: 'play'
}
var arr = ['a','b','c'];
console.log(Object.keys(obj)); //["name", "age", "hobby"]
console.log(Object.keys(arr)); //["0", "1", "2"]
console.log(Object.getOwnPropertyNames(obj)); //["name", "age", "hobby"]
console.log(Object.getOwnPropertyNames(arr)); //["0", "1", "2", "length"]
console.log(Object.values(obj)); //["aaa", 18, "play"]
console.log(Object.values(arr)); //["a", "b", "c"]

```

- Object.getPrototypeOf()

```js
// 方法返回实例对象的原型。这是获取原型对象的标准方法。
var Fn = function(){};
var f1 = new Fn();
console.log(Object.getPrototypeOf(f1) === Fn.prototype);//true
console.log(Object.getPrototypeOf(f1) === f1.__proto__);//true

```
- Object.setPrototypeOf()
方法接收两个参数，第一个是现有对象，第二个是原型对象。
用于改变现有对象的原型对象。

- Object.create()
```js
该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。
var A = {
 print: function () {
  console.log('hello');
 }
};
// 实例对象
var B = Object.create(A);
Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true

```
- Object.assign() 
```js
// 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
// 语法：Object.assign(target, ...sources)
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
// 目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
// 源值是一个对象的引用，它仅仅会复制其引用值。（浅拷贝）
// 复制一个对象。
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

- Object.defineProperty()
```js
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
Object.defineProperty(obj, "key", {
	enumerable: false,
	configurable: false,
	writable: false,
	value: "static"
});

```
- Object.defineProperties()

```js
// 如果一次性定义或修改多个属性，可以使用Object.defineProperties()方法。
		  
var obj = Object.defineProperties({}, {
 p1: { value: 123, enumerable: true },
 p2: { value: 'abc', enumerable: true },
 p3: { 
	get: function () { 
		return this.p1 + this.p2 
	},
	enumerable:true,
	configurable:true
 }
});

```
- 存取器
```js
// 除了直接定义以外，属性还可以用存取器定义。其中，存值函数称为setter,使用属性描述对象的set属性；取值函数称为getter,使用属性描述对象的get属性。
// 一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性，比如某个属性禁止赋值。
var obj = Object.defineProperty({},'p',{
	get:function(){
		return 'getter';
	},
	set:function(value){
		console.log('setter:'+value);
	}
})
obj.p //"getter"
obj.p = 123;//"setter:123"

JavaScript还提供了存取器的另一种写法
var obj = {
  get p(){
    return 'getter';
  },
  set p(value){
    console.log('setter:'+ value);
  }
}

```

- 属性描述对象
JavaScript提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称之为”属性描述对象”。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。

```js
{
 value: 属性值,默认为undefined
 writable: 是否可写,
 enumerable: 是否可枚举,
 configurable: 是否可配置,也就是是否可更改其他元属性的配置,
 get: 取值函数, 默认undefined,
 set: 存值函数, 默认undefined
}

```
当一个属性的enumerable为false时,Object.keys(), for...in, JSON.stringify()都读取不到该属性。
当一个属性的configurable属性为false时，不可更改value，enumerable，configurable, writable，但是把writable由true改为false是可以的。
一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，或者同时定义value属性，否则会报错。

- 更多

![Mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

## 浅拷贝&深拷贝

- 基本类型&引用类型
> 基本类型值在内存中占据固定大小，保存在栈内存中（不包含闭包中的变量）。常见包括：undefined,null,Boolean,String,Number,Symbol
> 引用类型的值是对象，保存在堆内存中。而栈内存存储的是对象的变量标识符以及对象在堆内存中的存储地址(引用)，引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。常见包括：Object,Array,Date,Function,RegExp等
- 基本数据类型赋值
> 系统会自动为新的变量分配一个新的值在栈内存中，两个变量相互独立，互不影响。
- 引用数据类型赋值
> 在 JavaScript 中，变量不存储对象本身，而是存储其“内存中的地址”，换句话说就是存储对其的“引用”。
### 浅拷贝

操作拷贝之后的数据会影响到原数据。
新的对象复制已有对象中非对象属性的值和对象属性的引用。
浅拷贝「只对第一层属性进行了拷贝」，当第一层的属性值是基本数据类型时，新的对象和原对象互不影响，但是如果第一层的属性值是复杂数据类型，那么新对象和原对象的属性值其指向的是同一块内存地址。

- 数组的浅拷贝Array.prototype.slice()
```js
slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。
let user = ["leo", "pingan", {name: "pingan8787"}];
let leo  = Array.prototype.slice.call(user);
leo[0] = "pingan888";
leo[2]["name"] = "pingan999";
console.log(leo[0]);      // "pingan888"  
console.log(user[0]);    // "leo"        
console.log(leo[2]["name"]);  // "pingan999"
console.log(user[2]["name"]); // "pingan999"
```
- 对象的浅拷贝Object.assign()
```js
// 示例1 对象浅拷贝
let user = { name: "leo", skill: { JavaScript: 90, CSS: 80}};
let leo = Object.assign({}, user);
leo.name = "leo1";
leo.skill.CSS = 90;
console.log(leo.name);      // "leo1" 
console.log(user.name);     // "leo“
console.log(leo.skill.CSS);  // 90
console.log(user.skill.CSS);/ / 90
```
- 数组的浅拷贝Array.prototype.concat()
```js
concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
let user  = [{name: "leo"},   {age: 18}];
let user1 = [{age: 20},{addr: "fujian"}];
let user2 = user.concat(user1);
user1[0]["age"] = 25;
console.log(user);  // [{"name":"leo"},{"age":18}]
console.log(user1); // [{"age":25},{"addr":"fujian"}]
console.log(user2); // [{"name":"leo"},{"age":18},{"age":25},{"addr":"fujian"}]

```
- 拓展运算符(...)
```js
var cloneObj = { ...obj };扩展运算符也是浅拷贝，对于值是对象的属性无法完全拷贝成2个不同对象，但是如果属性都是基本类型的值的话，使用扩展运算符也是优势方便的地方。

let user = { name: "leo", skill: { JavaScript: 90, CSS: 80}};
let leo = {...user};
leo.name = "leo1";
leo.skill.CSS = 90;
console.log(leo.name);      // "leo1" 
console.log(user.name);     // "leo"  
console.log(leo.skill.CSS); // 90
console.log(user.skill.CSS);// 90
```
- 实现浅拷贝
```js
for...in语句以任意顺序遍历一个对象自有的、继承的、可枚举的、非Symbol的属性。对于每个不同的属性，语句都会被执行。
function shadowCopy(to,from){
	for(var key in from){
		to[key] = from[key]
	}
	return to;
}
或者
function cloneShallow1(source) {
	let target = {};
	for (let key in source) {
		if (source.hasOwnProperty(key)) {
			target[key] = source[key];
		}
	}
	return target;
}

```

### 深拷贝

复制变量值，对于引用数据，则递归至基本类型后，再复制。深拷贝后的对象「与原来的对象完全隔离」，互不影响，对一个对象的修改并不会影响另一个对象。
- JSON.parse() & JSON.stringify()
其原理是把一个对象序列化成为一个JSON字符串，将对象的内容转换成字符串的形式再保存在磁盘上，再用JSON.parse() 反序列化将JSON字符串变成一个新的对象。
JSON.stringify() 使用注意：
	- 拷贝的对象的值中如果有函数， undefined ， symbol 则经过 JSON.stringify() `序列化后的JSON字符串中这个键值对会消失；
	- 无法拷贝不可枚举的属性，无法拷贝对象的原型链；
	- 拷贝 Date 引用类型会变成字符串；
	- 拷贝 RegExp 引用类型会变成空对象；
	- 对象中含有 NaN 、 Infinity 和 -Infinity ，则序列化的结果会变成 null ；
	- 无法拷贝对象的循环应用(即 obj[key] = obj )。

- 实现深拷贝
```js
const isObject = obj => typeof obj === 'object' && obj != null;

function cloneDeep(source) {
    if (!isObject(source)) return source; // 非对象返回自身
    const target = Array.isArray(source) ? [] : {};
    for(var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = cloneDeep(source[key]); // 注意这里
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

```
或者

```js
function deepCopy(to, from) {
	for (var key in from) {
		//不遍历原型链上的属性
		if (from.hasOwnProperty(key)) {
			//如果值是对象并且有值，则递归一下
			if (from[key] && typeof from[key] === 'object') {
				//区分是一般对象还是数组对象
				to[key] = from[key].constructor === Array ? [] : {};
				to[key] = deepCopy(to[key], from[key]);
			} else {
				//如果不是，就直接赋值
				to[key] = from[key];
			}
		}
	}
	return to;
}

```
