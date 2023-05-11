---
title: 对称二叉树
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

> 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

## 递归

```js
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return root
  if (root == p || root == q) return root
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)
  if (left == null) return right // 说明两个节点都在右子树上
  if (right == null) return left // 说明两个节点都在左子树上
  return root
}
```
