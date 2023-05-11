---
title: 二叉树的前序遍历
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

> 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

## 递归

```js
const preorderTraversal = function(root) {
  const res = []
  pushNode(root, res)
  return res
}

const pushNode = function(node, res) {
  if (!node) {
    return
  }
  res.push(node.val)
  node.left && pushNode(node.left, res)
  node.right && pushNode(node.right, res)
}

```

## 迭代

```js
const preorderTraversal = function(root) {
  if(!root) return []
  const res = []
  const stack = []
  stack.push(root)
  while(stack.length > 0){
      const cur = stack.shift()
      res.push(cur.val)
      cur.left && stack.unshift(cur.left)
      cur.right && stack.unshift(cur.right)
  }

  return res
};
```


