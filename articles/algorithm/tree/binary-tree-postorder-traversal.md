---
title: 二叉树的后序遍历
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/binary-tree-postorder-traversal)

> 给你二叉树的根节点 root ，返回它节点值的 后序 遍历。

## 递归

```js
const postorderTraversal = function(root) {
  const res = []
  pushNode(root, res)
  return res
}

const pushNode = function(node, res) {
  if (!node) {
    return
  }
  node.left && pushNode(node.left, res)
  node.right && pushNode(node.right, res)
  res.push(node.val)
}

```


