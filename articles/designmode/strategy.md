---
title: 策略模式
author: lvzl
---

> 策略模式（Strategy Pattern）指的是定义一系列的算法，把它们一个个封装起来，目的就是将算法的使用与算法的实现分离开来

一个基于策略模式的程序至少由两部分组成：

- 策略类，策略类封装了具体的算法，并负责具体的计算过程
- 环境类Context，Context 接受客户的请求，随后 把请求委托给某一个策略类

> 举个栗子：公司发奖金，绩效为A的人，年终奖为工资的4倍，绩效为B的人，年终奖为工资的3倍，绩效为C的人，年终奖为工资的2倍
```js
// if else 实现
function(salary, level){
  if(level === 'A'){
    return salary * 4
  } else if(level === 'B') {
    return salary * 3
  } else if(level === 'C') {
    return salary * 2
  } else {
    return salary
  }
}
```

> 而如果使用策略模式，就是先定义一系列算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，如下：

```js
ar obj = {
        A: function(salary) {
            return salary * 4;
        },
        B : function(salary) {
            return salary * 3;
        },
        C : function(salary) {
            return salary * 2;
        } 
};
var calcBouns =function(level,salary) {
    return obj[level](salary);
};
console.log(calcBouns('A',10000)); // 40000
```
> 常见的使用策略模式的场景还有 `表单校验`


从上面可以看到，使用策略模式的优点有如下：

- 策略模式利用组合，委托等技术和思想，有效的避免很多if条件语句
- 策略模式提供了开放-封闭原则，使代码更容易理解和扩展
- 策略模式中的代码可以复用
- 策略模式不仅仅用来封装算法，在实际开发中，通常会把算法的含义扩散开来，使策略模式也可以用来封装 一系列的“业务规则”

只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们

