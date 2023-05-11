---
title: 两数之和 II - 输入有序数组
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted)

> 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。


输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。


```js
// 使用indexOf
var twoSum = function(nums, target) {
    nums.unshift('ff')
    for(let i = 0; i < nums.length; i++){
        const index = nums.indexOf(target - nums[i])
        if(index > -1 && index !== i){
            return [i,index]
        }
    }
};

// 使用map
var twoSum = function(nums, target) {
    nums.unshift('ff')
    const map = new Map()
    for(let i = 0; i < nums.length; i++){
        const cha = target - nums[i]
        if(map.has(cha)){
            return [map.get(cha), i]
        }
        map.set(nums[i], i)
    }
};

// 双指针遍历
var twoSum = function(numbers, target) {
    numbers.unshift('ff')
    let left = 1, right = numbers.length - 1
    let sum = 0
    while(left< right){
        sum = numbers[left] + numbers[right]
        if(sum === target){
            return [left,right]
        } else if(sum < target){
            left++
        } else {
            right--
        }
    }
};

```


