---
title: 字符串模板替换
author: lvzl
---

如下代码所示，将字符串中由 `{{}}` 包裹的变量替换为 `data` 中的值。

```js
const data = {
  name: 'lvzl',
  date: {
    year: '2023'
  }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'
```

实现：
```js
function parse(str, data) {
  const getVal = (props, data) => {
    const propArr = props.split('.')
    return propArr.reduce((prev, cur) => {
      return prev[cur]
    }, data)
  }
  return str.replace(/\{\{(\d|\w|\.)+\}\}/g, match => {
    // 匹配到 {{name}} 这种，需要把前后的大括号去掉
    const props = match.substring(2, match.length - 2)
    return getVal(props, data)
  })
}
```