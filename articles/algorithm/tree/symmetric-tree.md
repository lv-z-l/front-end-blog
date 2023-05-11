---
title: 对称二叉树
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/symmetric-tree/)

> 给你一个二叉树的根节点 root ， 检查它是否轴对称。

## 递归

```js
var isSymmetric = function (root) {
  return equal(root.left, root.right)
}

const equal = function (left, right) {
  if (!left && !right) return true
  else if ((!left && right) || (left && !right)) return false
  else if (left && right) return left.val === right.val && equal(left.left, right.right) && equal(left.right, right.left)
}
```
