---
title: 最长连续序列
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/longest-consecutive-sequence)

> 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。


> 输入：nums = [100,4,200,1,3,2]

> 输出：4

> 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

```js

const longestConsecutive = function(nums) {
  nums.sort((a,b) => a-b)
  const findLengthOfLCS = nums => {
    if(nums.length === 0) return 0
    let max = 0
    const maxArr = []
    for(let i = 0; i < nums.length; i++){
      if(nums[i] + 1 === nums[i + 1]){
        max += 1
      } else if(nums[i] === nums[i + 1]) {
      } else {
        maxArr.push(max + 1)
        max = 0
      }
    }
    return Math.max(...maxArr)
  }
  return findLengthOfLCIS(nums)
};

```


