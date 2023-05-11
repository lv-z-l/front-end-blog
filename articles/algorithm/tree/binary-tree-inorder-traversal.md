---
title: 二叉树的中序遍历
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

> 给你二叉树的根节点 root ，返回它节点值的 中序 遍历。

## 递归

```js
const inorderTraversal = function(root) {
  const res = []
  pushNode(root, res)
  return res
}

const pushNode = function(node, res) {
  if (!node) {
    return
  }
  node.left && pushNode(node.left, res)
  res.push(node.val)
  node.right && pushNode(node.right, res)
}

```


