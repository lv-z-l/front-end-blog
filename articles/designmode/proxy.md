---
title: 代理模式
author: lvzl
---

## 什么是代理模式

出于某种原因，我们不能直接访问到一个对象的属性和方法，需要一个中间人（代理）帮我们去访问，再把结果给我们，这种模式就是代理模式。

## 案例

### 科学上网——VPN 代理
都知道，我们访问一个网站时，会有一个 DNS 解析的过程，只有成功解析到目标网站的 IP 端口等信息才能访问成功。在我们访问国外网站时，比如 Google，就会因为 某股神秘力量导致 DNS 解析不到，所以浏览器访问不到。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52b4af98211d4c769a072823376d9a8c~tplv-k3u1fbpfcp-watermark.image?)
如果你还想访问，就需要一个 VPN 代理，这个代理其实是一台服务器（一台能够访问 Google 的服务器），由他去访问 Google，然后把内容返回给你，此时你就间接的访问到了 Google。

比如 GitHub 的 DNS 访问方案：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e75919f01a146dbb47195f57ef9b994~tplv-k3u1fbpfcp-watermark.image?)
### 跨域了——请求代理
由于浏览器的同源策略（IP、端口、协议），导致我们在开发过程中经常会遇到跨域的问题，以下报错各位应该都很熟悉：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4f393dda50a4c72bf6d6ea27796ac1d~tplv-k3u1fbpfcp-watermark.image?)
我在掘金浏览器页签，通过控制台向百度发起请求，就出现跨域错误。

在平时的开发中，我们经常通过 node 中间件代理请求，这也是代理模式。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b26ee227ec5c4e8f8097cdf791e1a5f7~tplv-k3u1fbpfcp-watermark.image?)
上线时，通过 NGINX 反向代理请求也能避免跨域的问题，同样是代理模式。

### 租房子——中介
我们平时在租房的时候，往往自己都没有房源的信息，没有渠道，都是通过 某家、某贝壳、某鱼等等平台，得知一些房源，这也是代理模式，不过这些平台真的很恶心。

### vue2中的代理
为啥你写在props、 data、methods、computed里的方法能够直接通过 this 访问到？因为 Vue 内部做了代理：
```
export default {
    data() {
        return{
            xxx: ''
        }
    }
}

// this.xxx 相当于 this._data.xxx
```

## 应用实践案例
### 事件代理
有如下 dom 节点:
```html
<div id="parent"> 
  <a href="#">链接1号</a> 
  <a href="#">链接2号</a> 
  <a href="#">链接3号</a> 
  <a href="#">链接4号</a> 
  <a href="#">链接5号</a> 
  <a href="#">链接6号</a> 
</div>
```
想要实现，点击每个 a 标签，打印每个 a 标签对应的文本。

假如不用代理模式的话，我们可能会这样实现：
```js
const list = document.body.querySelectorAll('#parent>a')

list.forEach(a => {
  a.addEventListener('click', () => console.log(a.innerText))
})
```
这样的话，如果 a 标签的数量增大，性能开销也会随着增大。但是我们能够通过 事件**冒泡**的特性来实现：
```js
const parent = document.body.querySelectorAll('#parent')

parent.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    console.log(e.target.innerText)
  }
})
```
这样就只需要一次事件监听，父元素的事件间接的作用于子元素。
### 缓存代理
举个例子，在向后端发起请求数据的时候，有些数据是不会经常变化的，为了减少 http 请求数量，我们可以使用缓存代理，比如：
```js
function getData(params) {
  return axios.get('/api/config', {
    params
  })
}

function proxyGetData(params) {
  return async () => {
    const cache = {}
    const key = JSON.stringify(params)
    if (key in cache) {
      return cache[key]
    }
    const data = await getData(params)
    return cache[key] = data
  }
}
```

### 保护代理
对 一个对象 的属性读写做拦截就算是读写代理。
#### Object.defineProperty
语法：
```js
Object.defineProperty(obj, prop, descriptor)
```
descriptor:
-   `configurable`

    当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 **默认为** **`false`**。

-   `enumerable`

    当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。 **默认为 `false`**。

数据描述符还具有以下可选键值：

-   `value`

    该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

-   `writable`

    当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[`赋值运算符` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators "Currently only available in English (US)")改变。 **默认为 `false`。**

存取描述符还具有以下可选键值：

-   `get`

    属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

-   `set`

    属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。
    
比如以下代码可以让访问到的 id 属性自增：
```js
const obj = {}
let initVal = 0
Object.defineProperty(obj, 'id', {
  get() {
    return ++initVal
  }
})

obj.id
obj.id
obj.id

console.log(obj.id) // 4
```

#### Proxy
翻译过来 就是 代理。
```js
const obj = {}
let initVal = 0

const objProxy = new Proxy(obj, {
  get() {
    return ++initVal
  }
})

objProxy.id
objProxy.id
objProxy.id

console.log(objProxy.id) // 4
```