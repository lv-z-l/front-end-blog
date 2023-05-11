---
title: 最长回文子串
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/longest-palindromic-substring)


> 给你一个字符串 s，找到 s 中最长的回文子串。

> 示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

> 示例 2：

输入：s = "cbbd"
输出："bb"

> 示例 3：

输入：s = "a"
输出："a"

> 示例 4：

输入：s = "ac"
输出："a"

## 暴力解法
```js
const longestPalindrome = function(s) {
    let max = ''
    for(let i = 0; i < s.length; i++){
        for(let j = i + 1; j <= s.length; j++ ){
            const str = s.substring(i, j)
            if (max !== str && str.length > max.length && isPalindrome(str)) {
                max = str
            }
        }
    }
    return max
};

const isPalindrome = function(s) {
    if(s.length === 1){
        return true
    }
    for(let i = 0, j = s.length - 1; i < j;  ++i, --j){
        if(s.charAt(i) !== s.charAt(j)){
            return false
        }
    }
    return true
}
```