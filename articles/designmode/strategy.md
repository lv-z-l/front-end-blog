---
title: 策略模式
author: lvzl
---

简单举个例子，聊聊策略模式如何让我们的代码更整洁！本文属于[我的设计模式专栏](https://juejin.cn/column/7195725894869254202)。
## 什么是策略模式？
策略模式指的是定义一系列的算法，把它们一个个封装起来，目的就是分离算法的**使用** 与 **实现**

一个基于策略模式的程序至少由两部分组成：
-   策略类，策略类封装了具体的算法，并负责具体的计算过程
-   环境类，接受客户的请求，随后 把请求委托给某一个策略类

## 举个🌰
公司发奖金，绩效为A的人，年终奖为工资的4倍，绩效为B的人，年终奖为工资的3倍，绩效为C的人，年终奖为工资的2倍。要实现这个非常简单，最简单就是 if/else 了
- if/else 实现
    ```js
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

- 策略模式

    就是先定义一系列算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，如下：
    ```js
    const obj = {
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
    const calcBouns = function(level, salary) {
        return obj[level](salary);
    };
    console.log(calcBouns('A',10000)); // 40000
    ```
**是不是突然觉得自己一直在用策略模式**😄
## if/else vs 策略模式
就以上面的例子来说，两种实现都不复杂，但为啥说用策略模式更好呢？我觉得 if else 有以下几个缺点：
1. 违背了“单一功能”原则，一个 function 处理了四种情况，如果单个情况的逻辑变得复杂，或者if/else 分支变多，带来的就是臃肿，难以维护。
2. 违背了“开放封闭”原则，假如我要加逻辑，就只能加一个 else if
3. 如果报错，无法快速定位到底是哪个分支出了问题

## 常见的场景

- 表单校验

## 总结
从上面可以看到，使用策略模式的优点有如下：
- 有效的避免很多if条件语句
- 策略模式提供了开放-封闭原则，使代码更容易理解和扩展
- 策略模式中的代码可以复用
- 策略模式不仅仅用来封装算法，在实际开发中，通常会把算法的含义扩散开来，使策略模式也可以用来封装 一系列的“业务规则”

只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们