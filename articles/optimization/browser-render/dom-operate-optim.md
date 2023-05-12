---
title: 操作DOM优化建议
author: lvzl
---

由于操作 DOM 会引起浏览器回流、重绘，但操作 DOM 又是我们无法避免的，因此优化操作 DOM 的逻辑就显得尤为重要：

- **合并多次 DOM 修改，尽量减少修改次数，比如：**
```javascript
const times = Array(100).fill(0)
const content = document.getElementById('#content')
times.forEach((time,index) => content.innerHtml += `<span>${index}</span>`)

// 合并更改
let innerhtml = ''
times.forEach((time,index) => innerhtml += `<span>${index}</span>`)
content.innerHtml += innerhtml
```
应用案例：
Vue 的 DOM 异步更新策略——当我们改变了响应式的变量，会触发 setter，Vue 会对依赖这个变量的视图进行 diff & update，但是并不是我们一改变这些变量就会立马更新视图，因为我们可能会更改多个变量，如果改一下，立马就去更新 DOM，就会很消耗性能。Vue 会将更新任务放进一个队列，并创建一个异步任务用于执行队列中的更新函数。

- **使用 DocumentFragment 接口**
```javascript
const fragment = document.createDocumentFragment()
times.forEach((time,index) => fragment.innerHtml += `<span>${index}</span>`)
content.appendChild(fragment)
```

- **修改样式时，尽量将样式写到 class 中，去更改 class， 非必要不要直接修改 style**
- **修改 DOM 时，先将要修改的 DOM 从 DOM 树分离出来，再进行修改**
```javascript
const content = document.getElementById('#content')
// 分离要修改的 DOM
content.style.display = 'none'
content.style.width = '200px'
content.style.height = '200px'
content.style.border = '1px solid green'
content.style.color = 'red'
...（省略了许多类似的后续操作）
// 修改完了在显示出来
container.style.display = 'block'
```
**以上这些优化手段我们能想到，那开发浏览器的大佬们肯定也能想到，就算我们不按照上面的做，浏览器也会像类似 Vue 那样异步去回流，现在的浏览器越来越聪明了，但是为了保险起见，我们还是把代码尽量往最优的写为好。**
