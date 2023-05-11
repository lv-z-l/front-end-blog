---
title: 四数之和
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/4sum)

> 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

- 0 <= a, b, c, d < n
- a、b、c 和 d 互不相同
- nums[a] + nums[b] + nums[c] + nums[d] == target


> 输入：nums = [1,0,-1,0,-2,2], target = 0
> 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

### 思路

参考三数之和的思路，多了一层循环。


### 代码

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    if(!nums || nums.length < 4){
        return []
    }
    nums.sort((a,b)=>a-b)
    const res = []
    for(let i = 0; i < nums.length; i++){
        if(i > 0 && nums[i-1] === nums[i]){
            continue
        }
        for(let j = i + 1; j < nums.length; j++){
            if(j > i + 1 && nums[j-1] === nums[j]){
                continue
            }
            let L = j + 1
            let R = nums.length - 1
            while(L < R){
                const sum = nums[i] + nums[j] + nums[L] + nums[R]
                if(sum === target){
                    res.push([nums[i], nums[j], nums[L], nums[R]])
                    while(L < R && nums[L] === nums[L+1]) L++
                    while(L < R && nums[R] === nums[R-1]) R--
                    L++
                    R--
                } else if(sum < target){
                    L++
                } else {
                    R--
                }
            }
        }
    }
    return res
};

```


