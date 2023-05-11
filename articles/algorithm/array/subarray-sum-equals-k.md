---
title: 和为 K 的子数组
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

> 给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k 的连续子数组的个数。

> 输入：nums = [1,1,1], k = 2
> 输出：2

```js

/**
 * 暴力解法
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let count = 0
  nums.forEach((item,i) => {
    let sum = 0
    for(let j = i; j >= 0; --j){
      sum += nums[j]
      if(sum === k){
        count += 1
      }
    }
  })
  return count
}

/**
 * 下标和优化算法
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let pre = 0
    const map = new Map()
    map.set(0, 1)
    let count = 0
    for(let i = 0; i<nums.length; i++){
        pre += nums[i]
        if(map.has(pre - k)){
            count += map.get(pre - k)
        }
        if(map.has(pre)){
            map.set(pre, map.get(pre) + 1)
        } else {
            map.set(pre, 1)
        }
    }
    return count
};



```


