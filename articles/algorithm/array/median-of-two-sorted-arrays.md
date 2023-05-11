---
title: 寻找两个正序数组的中位数
author: lvzl
---

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

> 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

> 输入：nums1 = [1,3], nums2 = [2]

> 输出：2.00000

> 解释：合并数组 = [1,2,3] ，中位数 2

```js

const findMedianSortedArrays = function(nums1, nums2) {
  const mergeArr = [...nums1, ...nums2]
  mergeArr.sort((a, b) => a-b)
  if(mergeArr.length % 2 === 0) {
    const i = mergeArr.length / 2
    return (mergeArr[i] + mergeArr[i - 1]) / 2
  } else {
    return mergeArr[(mergeArr.length-1) / 2]
  }
};

```


