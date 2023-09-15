---
title: Vuex 的实现原理
author: lvzl
---

## Vuex 的实现原理

先来看下是怎么使用的：

**简单实现，只为看清本质：**

实现一个插件：声明 Store 类，挂载 $store
Store 具体实现：

- 创建响应式的 state，保存 mutations、actions 和 getters
- 实现 commit 根据用户传入 type 执行对应 mutation
- 实现 dispatch 根据用户传入 type 执行对应 action
- 实现 getters

```js
// vuex.js
let Vue;

// install方法设置，是因为Vue.use(xxx)会执行xxx的install方法
const install = (v) => { // 参数v负责接收vue实例
    Vue = v;
    // 全局混入
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                // 根页面，直接将身上的store赋值给自己的$store，
                // 这也解释了为什么使用vuex要先把store放到入口文件main.js里的根Vue实例里
                this.$store = this.$options.store;
            } else {
                // 除了根页面以外，将上级的$store赋值给自己的$store
                this.$store = this.$parent && this.$parent.$store;
            }
        },
    })
}

// 创建类Store
class Store {
    constructor(options) { // options接收传入的store对象
        this.vm = new Vue({
            // 确保state是响应式
            data: {
                state: options.state
            }
        });
        // getter
        const getters = options.getters || {};
        this.getters = {};
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this.state);
                }
            })
        })
        // mutation
        const mutations = options.mutations || {};
        this.mutations = {};
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = payload => {
                mutations[mutationName](this.state, payload);
            }
        })
        // action
        const actions = options.actions || {};
        this.actions = {};
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = payload => {
                actions[actionName](this.state, payload);
            }
        })
    }
    // 获取state时，直接返回
    get state() {
        return this.vm.state;
    }
    // commit方法，执行mutations的'name'方法
    commit(name, payload) {
        this.mutations[name](payload);
    }
    // dispatch方法，执行actions的'name'方法
    dispatch(name, payload) {
        this.actions[name](payload);
    }
}

// 把install方法和类Store暴露出去
export default {
    install,
    Store
}

```
