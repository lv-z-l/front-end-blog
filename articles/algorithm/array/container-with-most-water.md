---
title: 盛水最多的容器
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/container-with-most-water/)

> 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

<img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg"/>

> 输入：[1,8,6,2,5,4,8,3,7]

> 输出：49 

```js

// 暴力解法
var maxArea = function(height) {
  if (!height || height.length === 0) {
    return 0
  }
  let max = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      max = Math.max(max, Math.min(height[i], height[j]) * (j - i))
    }
  }
  return max
};

// 动态规划
var maxArea = function(height) {
  let i = 0, j = height.length - 1
  let max = 0
  while(i < j){
      const min = Math.min(height[i], height[j])
      max = Math.max(min*(j - i), max)
      if(height[i] < height[j]){
        i++
      } else {
        j--
      }
  }
  return max
};

```


