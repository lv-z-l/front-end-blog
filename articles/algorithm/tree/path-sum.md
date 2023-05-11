---
title: 路径总和
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/path-sum)

> 给你二叉树的根节点  root 和一个表示目标和的整数  targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和  targetSum 。如果存在，返回 true ；否则，返回 false 。

## 递归

```js
var hasPathSum = function (root, targetSum) {
  if (root == null) return false
  if (root.left == null && root.right == null && targetSum - root.val == 0) return true
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
}
```
