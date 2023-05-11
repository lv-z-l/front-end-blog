---
title: 三数之和
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/3sum)

> 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

> 输入：nums = [-1,0,1,2,-1,-4]
> 输出：[[-1,-1,2],[-1,0,1]]

### 思路


### 代码
```js

var threeSum = function(nums) {
    if(!nums || nums.length < 3){
        return []
    }
    const result = []
    nums.sort((a,b) => a-b)
    for(let i = 0; i < nums.length; i++){
        if(nums[i] > 0) { // 比零大，因为按照从小到大排的，右边的更大，相加不可能等于0
            break
        }
        if(i > 0 && nums[i] === nums[i-1]){ // 去重
            continue
        }
        let L = i + 1
        let R = nums.length - 1
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R]
            if(sum === 0){
                result.push([nums[i], nums[L], nums[R]])
                while(L < R && nums[L] === nums[L + 1]) L++ // 去重
                while(L < R && nums[R] === nums[R - 1]) R-- // 去重
                L++;
                R--
            } else if(sum < 0){
                L++
            } else if(sum > 0) {
                R--
            }
        }
    }
    return result
};

```


