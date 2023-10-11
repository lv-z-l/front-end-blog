---
title: 颜色转rgb
author: lvzl
---

## 颜色转rgb
```js
function hex2Rgb(hex) {
  const regx = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
  // 如果第一个字符不是#，直接返回传入的参数
  if (!hex || !regx.test(hex)) {
    return hex
  }
  hex = hex.substring(1) // 除去 #
  let rgbArr = []
  if (hex.length === 3) {  // 特殊处理 #123 这种情况
    rgbArr = [hex[0] + hex[0], hex[1] + hex[1], hex[2] + hex[2]]
  } else {
    rgbArr = [hex.substring(0,2), hex.substring(2,4), hex.substring(4,6)]
  }
  return `rgb(${rgbArr.map(rgb => Number.parseInt(rgb, 16)).join(',')})`
}
```