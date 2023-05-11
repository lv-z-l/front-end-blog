---
title: 有效的括号
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/valid-parentheses)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

> 示例 1：
输入：s = "()"
输出：true

> 示例 2：
输入：s = "()[]{}"
输出：true

> 示例三
输入：s = "(]"
输出：false

> 示例三
输入：s = "([{}])"
输出：true

## 使用栈

```js
var isValid = function(s) {
  const map = {
    '}': '{',
    ']': '[',
    ')': '('
  }
  const arr = []
  let L = 0
  while(L < s.length){
    if(s[L] in map){ // 如果时右侧括号， 则要去看数组里面最后一项是不是匹配的左括号
      if(arr[arr.length - 1] !== map[s[L]]) return false // 不匹配直接返回false
      else arr.pop() // 匹配则直接出栈
    } else {
      arr.push(s[L]) // 左侧括号直接入栈
    }
    L++
  }
  return arr.length === 0 // 数组长度为0 代表全部匹配
};
```

## 使用replace

```js
var isValid = function(s) {
  const flag = () => s.includes('{}') || s.includes('[]') || s.includes('()')
  while(s.length && flag()){
    s = s.replace('{}', '').replace('()', '').replace('[]', '')
  }
  if(s.length === 0){
    return true
  }
  return false
};
```