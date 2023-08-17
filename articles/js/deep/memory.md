---
title: 你需要了解的JavaScript内存
author: lvzl
---

<script setup>
  import useFancybox from '@use/useFancybox.js'
  useFancybox()
</script>

## 内存是用来存什么的

通俗的来说呢，就是用来存 var let function const 声明的变量。

## 内存的大小

与操作系统有关，64 位 1.4G 32 位 0.7G。

## 为啥内存大小要这么设计，为啥不是越大越好

1.表象原因，1.4G 够用了 JS 设计之初是作为脚本语言（一次性的执行，执行完毕就直接释放），相对于 java，C 这些用来编写持久性的服务语言（内存一般不受限制）来说，够用了，想想你一次性的定义变量超过 1.4G 还是有难度的（当然不要耍赖用循环）。

2.深层次的原因，JS 每回收一次垃圾，会把整个代码的执行暂停， 回收 200MB 大概需要 30ms，如果内存设计的太大，回收垃圾的时候会暂停很久，用户体验不好。

## V8 的内存分配

新生代会频繁发生变量的移动，老生代存的比较久。

64 位：新生代 64MB 老生代 1400MB

32 位：新生代 16MB 老生代 700MB

<img data-fancybox="gallery" src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/V8_memory.png" />

## 新生代内存

存放生存的并不久的变量

## 老生代内存

存放常驻变量

## 变量从新生代 --> 老生代

1.新生代内存空间使用超过了 25%(前置条件)。

2.经过了一次垃圾回收，但是还没有回收掉的变量（还有地方会用到的变量），使其变为常驻变量。

```js
var a = () => {
  var b = '1'
  return () => {
    return b
  }
}
```

## 新生代回收算法

​ 为什么分为两部分，因为新生代会频繁发生变量的移动，一开始变量都放在 from， 比如 a， b， c 三个变量，第一次回收以后 a， c 还活着，那就只需要把 a， c 放到 to 中，然后把 from 中的全部删除，同样的道理，下一次回收从 to 中把活着的变量复制到 from， 删除 to 中的。只需要做两步 复制 删除，这样比较高效。

## 老生代回收算法

​ 标记 清除 整理 。先给需要回收的变量加标记，然后执行删除，删除之后呢，删除变量的位置会产生磁盘碎片，举个例子：数组(只能储存相同大小的同类型变量，在内存上必须是连续的空间) [1， ，3， ] 还有两个位置，但是如果我们现在要把[2，4]存进去，虽然还有两个空位置，但是不连续，是存不进去的，所以还需要进行一步整理磁盘碎片让不连续的内存碎片变得连续。

## 内存如何回收

内存快接近满时，如果是全局变量，没有执行完毕不会回收，局部变量失去引用回收。

下面是一个例子，全局的 arr，我们不停往里面 push 大数组，因为 arr 是全局的，不能被回收内存就爆了。

```js
function printMe() {
  var mem = process.memoryUsage()
  var format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(0) + 'MB'
  }
  console.log('ToTal:' + format(mem.heapTotal) + 'Used:' + format(mem.heapUsed))
}

var arr = []
var size = 30 * 1024 * 1024
for (let i = 0; i < 15; i++) {
  arr.push(new Array(size))
  printMe()
}
```

<img data-fancybox="gallery" src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/image-20210108111222746.png" />

在通过一个小例子来看下 JS 回收临时变量的过程：

```js
function printMe() {
  var mem = process.memoryUsage()
  var format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(0) + 'MB'
  }
  console.log('ToTal:' + format(mem.heapTotal) + 'Used:' + format(mem.heapUsed))
}

var arr = []
var size = 30 * 1024 * 1024
function notGolbal() {
  var noarr = [] // 临时
  for (let i = 0; i < 3; i++) {
    noarr.push(new Array(size))
  }
}
notGolbal()
setInterval(() => {
  arr.push(new Array(size))
  printMe()
}, 1000)
```

看图中圈出部分，已经进行了临时变量的回收。
<img data-fancybox="gallery" src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/image-20210108112442102.png" />

## 开发应该注意些什么

1.能不定义为全局变量，就不要定义为全局变量，非得定义为全局变量，用完记得手动回收(设置值为 null/undefined)。

2.如果用内存实现缓存要做限制，如果超过这个限制（先进先出），就把最开始的缓存清空，防止内存爆满。

3.上传大文件时，避免直接操作整个文件，(上传文件其实就是把文件先从硬盘读取到内存中，再从内存进行上传到服务器的操作，如果文件过大，内存可能扛不住)，把文件切片上传。

## 性能监控方案

- Lighthouse -谷歌推出的，可直接在浏览器安装（需要翻墙），也可以通过 npm 安装，通过命令行来对网站的性能做测试。比如以下命令的意思就是检测https://study.163.com/的性能，将结果输出为HTML，路径为当前命令行执行的路径。

```js
lighthouse https://study.163.com/ --output=html -path ./
```

- 对 window.performance 的数据进行分析，然后自行优化。
