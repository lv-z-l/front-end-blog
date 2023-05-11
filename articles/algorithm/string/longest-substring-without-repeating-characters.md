---
title: 没有重复字符的最长子串
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters)


> 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

> 示例 1:
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

> 示例 2:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

## 暴力解法

```js
var lengthOfLongestSubstring = function(s) {
  let longestStr = ''
  for(let i = 0; i < s.length; i++){
    for(let j = i + 1; j <= s.length; j++){
      const str = s.substring(i, j)
      const array = str.split('')
      const set = new Set(array)
      if(str.length > longestStr.length && array.length === set.size){
        longestStr = str
      }
    }
  }
  return longestStr.length
}; 
```

## 优化解法

> 执行用时：68 ms, 在所有 JavaScript 提交中击败了99.82%的用户

```js
var lengthOfLongestSubstring = function(s) {
  let right = 0 // 指针
  let maxlen = 0  // 返回结果
  const set = [] // 用于遍历时存下当前满足条件的字串
  while(right < s.length){ // 一个字符一个字符的遍历
    const str = s.charAt(right)
    if(set.includes(str)){ // 已经包含了，代表重复了，把数组中重复的去除掉，再把当前这个放进去，要保证顺序，
      const index = set.indexOf(str)
      set.splice(0, index + 1)
      set.push(str)
    } else { // 不包含，直接放进去
      set.push(str)
    }
    // 这样数组中都是指针之前 不包含重复字符的字串，要记录长度
    if(maxlen < set.length){
      maxlen = set.length
    }
    right++
  }
  return maxlen
};
```