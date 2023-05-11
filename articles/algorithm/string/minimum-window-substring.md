---
title: 最小覆盖子串
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/minimum-window-substring/)


> 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
- 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
- 如果 s 中存在这样的子串，我们保证它是唯一的答案。

> 示例 1:
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"

> 示例 2:
输入：s = "a", t = "a"
输出："a"


## 暴力解法1

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if(s.length < t.length){  // 长度不够，直接返回''
        return ''
    }
    // 用来判断子串中是否包含字符串t中的每一个字符
    var allExist = function(str, t) {
        let flag = str.length >= t.length // 长度不够，直接返回
        if(!flag) return
        for(let i = 0; i < t.length; i++){
            const char = t.charAt(i) // 遍历t中的每一个字符
            if(str.includes(char)) { // 判断str是否包含， 是 把该字符替换为空，否则返回false
                str = str.replace(char, '') // 这里必须要替换，比如 str = 'ABCD', t = 'AABC', 不替换为空就会返回true
            } else {
                flag = false
                break
            }
        }
        return flag
    }
    let minStr = ''
    for(let i = 0; i < s.length; i++){
        for(let j = i + 1; j <= s.length; j++){
            const str = s.substring(i, j) // 双层for循环拿到每一个子串，调用上面的方法判断，并且记录满足条件的最小子串
            if(allExist(str, t)){
                if(minStr === ''){
                    minStr = str
                } else if(str.length <= minStr.length){
                    minStr = str
                }
            }
            
        }
    }
    return minStr
};

```

## 优化解法 - 1

> 双指针代替嵌套的for循环，这种解法也通不过LeeCode的测试用例，时间超过限制。
```js

var minWindow = function(s, t) {

    var allExist = function(str, t) {
        let flag = str.length >= t.length
        if(!flag) return

        for(let i = 0; i < t.length; i++){
            const char = t.charAt(i)
            if(str.includes(char)) {
                str = str.replace(char, '')
            } else {
                flag = false
                break
            }
        }
        return flag
    }
    if(s.length < t.length){
        return ''
    }
    let minStr = ''
    let p1 = 0, p2 = 0 // 两个指针
    while(p2 <= s.length) {
        const str = s.substring(p1, p2)
        if(allExist(str, t)){ // 判断是否满足条件， 是把p1右移，否则p2右移
            if(minStr === '') {
                minStr = str
            } else if(str.length <= minStr.length){ // 满足条件的子串长度小于当前最短子串长度，更新
                minStr = str
            }
            p1++
        } else {
            p2++
        }
    }
    return minStr
};

```

## 优化解法 - 2
> 接下来优化allExist, 因为这里还有for循环

> 执行用时：80 ms, 在所有 JavaScript 提交中击败了96%的用户
```js

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function(s, t) {
    const win = {},twin = {} // win 用来存遍历过程中在 t字符串 中的字符及每个字符对应的数量; twin 用来存t字符串 中的字符及每个字符对应的数量

    // t = 'abc' twin = {a: 1, b: 1, c: 1}
    for(let key of t){
        twin[key] = (twin[key] || 0) + 1
    }
    const tl = Object.keys(twin).length // 用来判断win 中字符种类数量 满足twin的
    let p1 = p2 = 0 // 两个指针
    let valid = 0 // 满足条件的字符数量
    let minStr = '' // 存返回值
    let charL = charR = '' // 左右指针指向的字符
    while(p2 <= s.length){
        charR = s[p2]
        if(twin[charR]){ // 是t字符串中的字符，就需要记录个数
            win[charR] = (win[charR] || 0) + 1
            if(win[charR] === twin[charR]){ // 字符个数满足要求，这里必须是等于，因为相同的多个字符，valid只能++一次
                valid ++ 
            }
        }
        
        while(valid === tl){ // win 中的字符种类个数满足 twin 中的
            const str = s.substring(p1, p2 + 1) // 截取当前字符串，因为substring不包括endindex, p2 + 1
            charL = s[p1]
            if(minStr === ''){
                minStr = str
            } else if(str.length < minStr.length){
                minStr = str
            }
            p1++ // 跟上面一样，满足条件，是把p1右移
            if(win[charL]) { // 包括了，要减个数
                win[charL]--
                if(win[charL] < twin[charL]){ // 减去后这个字符，不满足了，valid--
                    valid--
                }
                if(win[charL] === 0) delete win[charL] // 字符个数为0， 删除key
            }
        }
        p2++
    }
    return minStr
};
```

## 优化解法 - 3
> 上面每次都去substring, 我们换成记录索引试试

> 执行用时：68 ms, 在所有 JavaScript 提交中击败了99.65%的用户
```js
const minWindow = function(s, t) {
    const win = {}, twin = {}
    for(let key of t){
        twin[key] = (twin[key] || 0) + 1
    }
    const tl = Object.keys(twin).length
    let p1 = p2 = 0
    let valid = 0
    let start = 0, end = 0, len = Number.MAX_VALUE
    let charL, charR
    while(p2 <= s.length){
        charR = s[p2]
        if(twin[charR]){
            win[charR] = (win[charR] || 0) + 1
            if(win[charR] === twin[charR]){
                valid ++ 
            }
        }
        
        while(valid === tl){
            if(p2 - p1 < len){
                start = p1
                end = p2 + 1
                len = end - start
            }
            charL = s[p1]
            p1++
            if(win[charL]) {
                win[charL]--
                if(win[charL] < twin[charL]){
                    valid--
                }
                if(win[charL] === 0) delete win[charL]
            }
        }
        p2++
    }
    return s.substring(start, end)
};
```
