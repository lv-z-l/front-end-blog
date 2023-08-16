---
title: 前端路由
author: lvzl
---

<script setup>
  import XmindViewer from '@/XmindViewer'
</script>

## 概念

<XmindViewer url="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/xmind/router.xmind"/>

## 实现

### 实现 Base 类

```js
export default class Base {
  constructor(option) {
    this._option = option
    this.routes = option.routes
    this.viewContiner = document.body.querySelector(option.selector)
  }
  render() {
    const hash = this._option.mode === 'hash' ? this.location.hash.replace('#', '') : window.location.pathname
    const route = this.getComponent(hash)
    if (this.viewContiner.childNodes[0]) {
      this.viewContiner.removeChild(this.viewContiner.childNodes[0])
    }
    this.viewContiner.innerHTML = route.component
  }
  getComponent(path = window.location.pathname) {
    return this.routes[path]
  }
}
```

### 基于 hash 的简单实现

```js
import Base from './Base.js'
export default class Hash extends Base {
  constructor(option) {
    super(option)
    this.location = window.location
    window.addEventListener('hashchange', e => {
      this.render()
    })
  }
  getUrl(path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return base + '#' + path
  }
  push(path) {
    this.location.hash = `#${path}`
  }
  go(argu) {
    window.history.go(argu)
  }
  back() {
    this.go(-1)
  }
  replace(path) {
    window.location.replace(this.getUrl(path))
  }
}

```

### 基于 history 的简单实现

```js
import Base from './Base.js'
export default class History extends Base {
  constructor(option) {
    super(option)
    this.history = window.history
    window.addEventListener('popstate', e => {
      this.render()
    })
  }
  push(path) {
    this.history.pushState(null, null, path)
    this.render()
  }
  go(argu) {
    this.history.go(argu)
  }
  back() {
    this.history.back()
  }
  replace(path) {
    this.history.replaceState(null, null, path)
    this.render()
  }
  addRoutes(routes) {
    const keys = Object.keys(routes)
    for (let i = 0; i < keys.length; i++) {
      if (Reflect.has(this.routes, keys[i])) {
        continue
      }
      this.routes[keys[i]] = routes[keys[i]]
    }
  }
}

```

### 实现 Router 类

```js
import History from './history.js'
import Hash from './hash.js'

export default class Router {
  constructor(option) {
    if (this.router) { // 单例
      return this.router
    }
    this.router = option.mode === 'history' ? new History(option) : new Hash(option)
    return this.router
  }
}
```

### 简单写个 html 测试下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style type="text/css">
    div#app-view,
    div#app-view > div {
      width: 100%;
      height: 100%;
    }
  </style>
  <body>
    <div class="box" style="display: flex; height: 100vh">
      <div>
        <ul style="width: 300px">
          <li onclick="onClick(this)">/login</li>
          <li onclick="onClick(this)">/user</li>
          <li onclick="onClick(this)">/main</li>
        </ul>
        <button onclick="router.back()">back</button>
        <button onclick="router.go(2)">go(2)</button>
        <button onclick="router.go(-1)">go(-1)</button>
        <button onclick="router.replace('/user')">replace('/user')</button>
      </div>
      <div id="app-view"></div>
    </div>
  </body>
  <script type="module">
    import Router from './router/Router.js'
    const routes = {
      '/login': { component: '<div style="background-color: green;">login</div>' },
      '/user': { component: '<div style="background-color: blue;">user</div>' },
      '/main': { component: '<div style="background-color: red;">main</div>' }
    }
    const router = new Router({ mode: 'history', selector: '#app-view', routes })
    window.router = router
  </script>
  <script>
    function onClick(current) {
      console.log(current.textContent)
      router.push(current.textContent)
    }
  </script>
</html>
```

## 效果

### 基于 history

<img src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/history.gif" />

### 基于 hash

<img src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/hash.gif" />
