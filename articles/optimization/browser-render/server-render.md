---
title: 服务端渲染——提升首屏性能
author: lvzl
---
## 客户端渲染
**请求回来的资源 html 中只有根节点，和一堆的 JS，页面的内容要等 客户端执行完 JS 才知道页面有些什么东西。**
```html
<!doctype html>
<html>
  <head>
    <title>我是客户端渲染的页面</title>
  </head>
  <body>
    <div id='root'></div>
    <script src='index.js'></script>
  </body>
</html>
```
## 服务端渲染
**完整的 HTML 内容在服务端生成返回给客户端，客户端只需要渲染即可。**来自 Vue ssr 官网的例子：
```javascript
const Vue = require('vue')
// 创建一个express应用
const server = require('express')()
// 提取出renderer实例
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  // 编写Vue实例（虚拟DOM节点）
  const app = new Vue({
    data: {
      url: req.url
    },
    // 编写模板HTML的内容
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
    
  // renderToString 是把Vue实例转化为真实DOM的关键方法
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    // 把渲染出来的真实DOM字符串插入HTML模板中
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)
```
本质上就是把 **本来应该在浏览器跑的 JS，放到 Node 跑一下。**
## 服务端渲染的优势

1. 有利于 SEO（因为服务端直接返回的完整的 HTML）
2. 提升首屏加载速度（想一下在客户端渲染模式下：浏览器先请求到 HTML，然后请求 HTML 中的 css、js资源，然后再构建 DOM、CSSDOM、执行 JS，渲染页面；而服务端渲染时，直接构建 DOM、CSSDOM、渲染页面即可，由此可见服务端渲染会提升首屏性能。）

## 服务端渲染的一些思考
在这个网民遍地的时代，几乎有多少个用户就有多少台浏览器。用户拥有的浏览器总量多到数不清，那么一个公司的服务器又有多少台呢？我们把这么多台浏览器的渲染压力集中起来，分散给相比之下数量并不多的服务器，服务器肯定是承受不住的。所以服务端渲染并不是万全之策，不到万不得已，还是先尝试别的优化方案再来考虑**服务端渲染。**

