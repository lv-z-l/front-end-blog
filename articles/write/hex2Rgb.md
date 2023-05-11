---
title: 颜色转rgb
author: lvzl
---

## 颜色转rgb
```js
function hex2Rgb(hex) {
  let _hex = hex
  // 如果不是字符串，直接返回传入的参数
  if(Object.prototype.toString.call(_hex) !== '[object String]') { 
    return _hex
  }
  // 如果第一个字符不是#，直接返回传入的参数
  if (_hex.charAt(0) !== '#') {
    return _hex
  }
  const REG_HEX = /^[0-9a-fA-F]{6}/g  // 正则用于校验除去 # 后面的字符是否符合要求
  _hex = _hex.substring(1) // 除去 #
  let c1, c2, c3
  if (_hex.length === 3) {  // 特殊处理 #123 这种情况
    _hex = _hex[0] + _hex[0] + _hex[1] + _hex[1] + _hex[2] + _hex[2] 
  }
  if (REG_HEX.test(_hex)) {
    c1 = parseInt(_hex.substring(0, 2), 16)
    c2 = parseInt(_hex.substring(2, 4), 16)
    c3 = parseInt(_hex.substring(4, 6), 16)
    return `RGB(${c1},${c2},${c3})`
  }
  return hex
}
```