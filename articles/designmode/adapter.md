---
title: 适配器模式
author: lvzl
---

## 什么是适配器模式
**把一个类的接口变换成客户端所期待的另一种接口**，通常用来解决**不兼容**的问题。

举个🌰：

喜欢听歌的你有一副音质很棒的3.5mm圆形插口🎧，但是你的手机很旧了，换了个新的，你发现这个新手机并没有圆形耳机插孔，只有一个 type-C 接口，无法使用原来的🎧听歌，聪明的你到某宝搜了一下**耳机适配器**：
<p align=center>
    <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8620df7cc676480284bd95ef30984830~tplv-k3u1fbpfcp-watermark.image?" alt="" width="30%" />
</p>
然后你买了，愉快的听起了歌。

## 实际场景
在以前的项目中，发请求是这么封装的：
```js
function Request(type, url, data, success, failed) {
  // 创建ajax对象
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  // 此处省略一系列的业务逻辑细节

  var type = type.toUpperCase();

  // 识别请求类型
  if (type == 'GET') {
    xhr.open('GET', url + data ? '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&') : '', true);
    // 发送get请求
    xhr.send();

  } else if (type == 'POST') {
    xhr.open('POST', url, true);
    // 如果需要像 html 表单那样 POST 数据，使用 setRequestHeader() 来添加 http 头。
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // 发送post请求
    xhr.send(data);
  }

  // 处理返回数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success(xhr.responseText);
      } else {
        if (failed) {
          failed(xhr.status);
        }
      }
    }
  }
}
```
但是现在比较好用的方案是axios，它是这么使用的：
```js
// get
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
// post
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
如果现在需要升级，使用 axios 来请求，那就可以使用适配器模式来实现：
```js
function requestAdapter(type, url, data, success, failed) {
  const type = type.toLowerCase()
  if (axios[type]) {
    axios[type](url, {
      params: data,
      data
    }).then(res => {
      success && success(res)
    }).catch(err => {
      failed && failed(err)
    })
  }
}
```

## 何时用
1. 系统需要使用现有的类，而此类的接口不符合系统的需要。 
2. 想要建立一个可以重复使用的类，用于与一些彼此之间没有太大关联的一些类，包括一些可能在将来引进的类一起工作，这些源类不一定有一致的接口。
3. 通过接口转换，将一个类插入另一个类系中。
4. 适配器不是在详细设计时添加的，而是解决正在服役的项目的问题。

## 优点
1. 可以让任何两个没有关联的类一起运行。
2. 提高了类的复用。 
3. 增加了类的透明度。 
4. 灵活性好。

## 缺点
过多地使用适配器，会让系统非常零乱，不易整体进行把握。比如，明明看到调用的是 A 接口，其实内部被适配成了 B 接口的实现，一个系统如果太多出现这种情况，无异于一场灾难。因此如果不是很有必要，可以不使用适配器，而是直接对系统进行重构。
