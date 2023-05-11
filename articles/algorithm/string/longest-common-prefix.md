---
title: 最长公共前缀
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/longest-common-prefix/)


> 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串""。

> 示例 1：
输入：strs = ["flower","flow","flight"]
输出："fl"

> 示例 2：
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。

## 暴力解法
```js
const longestCommonPrefix = function(strs) {
  if(!strs || !Array.isArray(strs)){
    return ''
  }
  let shortStr = strs[0]
  let longestPrefix = ''
  // 先找到最短的字符串
  strs.forEach(item => {
    if(item.length < shortStr) shortStr = item
  })
  // 用最短字符串的所有前缀去匹配其他的字符串，如果其他字符串都以这个前缀开头，则更新返回结果，否则更新前缀，直到前缀为整个最短字符串
  for(let i = 1; i <= shortStr.length; i++){
    const prefix = shortStr.substring(0, i)
    let pass = true
    for(let j = 0; j < strs.length; j++){
      if(!strs[j].startsWith(prefix)){
        pass = false
        break
      }
    }
    if(pass) {
      longestPrefix = prefix
    }
  }
  return longestPrefix
};
```