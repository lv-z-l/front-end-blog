---
title: Vue-Router 的实现原理
author: lvzl
---

## Vue-Router 的实现原理

先来看下是怎么使用的：

```js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 可在Vue组件使用 this.$router、this.$route
```

**从使用方法不难看出以下几点：**

1. `VueRouter`是一个`Vue`插件，那么内部就包括一个 `install` 方法，在插件中要让组件能够获取 `$router、$route`
2. `VueRouter`可以`new`，那么`VueRouter`就是一个构造函数
3. `VueRouter`还实现了两个组件，并且全局可用：
   - `router-link` 当成 `a` 标签
   - `router-view` 监听路由变化，匹配路由表，渲染匹配到的组件`comp`，由于`router-view`可以嵌套， 因此在匹配路由时可能会匹配到多条路由(一个数组)，那么就需要在`router-view`中向上找 `parent` 是 `router-view` 的, 找到以后 `depth++`，先计算该`router-view`的嵌套深度，然后再从匹配到的路由中取对应`depth`的组件进行渲染，然后`h(comp)`

**简单实现，只为看清本质：**

```js
class HashHistory {
    constructor(router) {

        // 将传进来的VueRouter实例保存
        this.router = router

        // 一开始给current赋值初始值
        this.current = createRoute(null, {
            path: '/'
        })

        // 如果url没有 # ，自动填充 /#/
        ensureSlash()

        // 监听hash变化
        this.setupHashLister()
    }
    // 监听hash的变化
    setupHashLister() {
        window.addEventListener('hashchange', () => {
            // 传入当前url的hash
            this.transitionTo(window.location.hash.slice(1))
        })
    }

    // 跳转路由时触发的函数
    transitionTo(location) {
        console.log(location)

        // 找出所有对应组件
        let route = this.router.createMathcer(location)

        console.log(route)

        // hash更新时给current赋真实值
        this.current = route
        // 同时更新_route
        this.cb && this.cb(route)
    }
    // 监听回调
    listen(cb) {
        this.cb = cb
    }
}

// 如果浏览器url上没有#，则自动补充/#/
function ensureSlash() {
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}

export function createRoute(record, location) {
    const res = []
    if (record) {
        while (record) {
            res.unshift(record)
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}

class VueRouter {
    constructor(options) {

        this.options = options

        // 如果不传mode，默认为hash
        this.mode = options.mode || 'hash'

        // 判断模式是哪种
        switch (this.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break
            case 'history':
                // this.history = new HTML5History(this, options.base)
                break
            case 'abstract':

        }
    }
    init(app) {
        this.history.listen((route) => app._route = route)

        // 初始化时执行一次，保证刷新能渲染
        this.history.transitionTo(window.location.hash.slice(1))
    }

    // 根据hash变化获取对应的所有组件
    createMathcer(location) {
        const { pathMap } = createRouteMap(this.options.routes)

        const record = pathMap[location]
        const local = {
            path: location
        }
        if (record) {
            return createRoute(record, local)
        }
        return createRoute(null, local)
    }
}

let _Vue
VueRouter.install = (Vue) => {
    _Vue = Vue
    // 使用Vue.mixin混入每一个组件
    Vue.mixin({
        // 在每一个组件的beforeCreate生命周期去执行
        beforeCreate() {
            if (this.$options.router) { // 如果是根组件
                // this 是 根组件本身
                this._routerRoot = this

                // this.$options.router就是挂在根组件上的VueRouter实例
                this.$router = this.$options.router

                // 执行VueRouter实例上的init方法，初始化
                this.$router.init(this)

                // 相当于存在_routerRoot上，并且调用Vue的defineReactive方法进行响应式处理
                Vue.util.defineReactive(this, '_route', this.$router.history.current)
            } else {
                // 非根组件，也要把父组件的_routerRoot保存到自身身上
                this._routerRoot = this.$parent && this.$parent._routerRoot
                // 子组件也要挂上$router
                this.$router = this._routerRoot.$router
            }
        }
    })
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        }
    })
}

function createRouteMap(routes) {

    const pathList = []
    const pathMap = {}

    // 对传进来的routes数组进行遍历处理
    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap)
    })

    console.log(pathList)
    // ["/home", "/home/child1", "/home/child2", "/hello", "/hello/child1"]
    console.log(pathMap)
    // {
    //     /hello: {path: xxx, component: xxx, parent: xxx },
    //     /hello/child1: {path: xxx, component: xxx, parent: xxx },
    //     /hello/child2: {path: xxx, component: xxx, parent: xxx },
    //     /home: {path: xxx, component: xxx, parent: xxx },
    //     /home/child1: {path: xxx, component: xxx, parent: xxx }
    // }

    // 将pathList与pathMap返回
    return {
        pathList,
        pathMap
    }
}

function addRouteRecord(route, pathList, pathMap, parent) {
    // 拼接path
    const path = parent ? `${parent.path}/${route.path}` : route.path
    const { component, children = null } = route
    const record = {
        path,
        component,
        parent
    }
    if (!pathMap[path]) {
        pathList.push(path)
        pathMap[path] = record
    }
    if (children) {
        // 如果有children，则递归执行addRouteRecord
        children.forEach(child => addRouteRecord(child, pathList, pathMap, record))
    }
}

function createRoute(record, location) {
    const res = []
    if (record) {
        while (record) {
            res.unshift(record)
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}

// 实现Router-Link
const Link = {
  props: {
    to: String,
    required: true,
  },
  render(h) {
    return h(
      'a',
      {
        attrs: {
          href: '#' + this.to,
        },
      },
      [this.$slots.default]
    )
  },
}

const View = {
  functional: true,
  render(h, { parent, data }) {
      const { matched } = parent.$route

      data.routerView = true // 标识此组件为router-view
      let depth = 0 // 深度索引

      while(parent) {
          // 如果有父组件且父组件为router-view 说明索引需要加1
          if (parent.$vnode && parent.$vnode.data.routerView) {
              depth++
          }
          parent = parent.$parent
      }
      const record = matched[depth]

      if (!record) {
          return h()
      }

      const component = record.component

      // 使用render的h函数进行渲染组件
      return h(component, data)

  }
}

export default VueRouter
```
