---
title: 两数之和
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/two-sum)

> 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

> 输入：nums = [2,7,11,15], target = 9
> 输出：[0,1]
> 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

```js

var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++){
        const index = nums.indexOf(target - nums[i])
        if(index > -1 && index !== i){
            return [i,index]
        }
    }
};

var twoSum = function(nums, target) {
    const map = new Map()
    for(let i = 0; i < nums.length; i++){
        const cha = target - nums[i]
        if(map.has(cha)){
            return [map.get(cha), i]
        }
        map.set(nums[i], i)
    }
};



```


