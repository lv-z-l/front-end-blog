---
title: 二叉树的最大深度
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/maximum-depth-of-binary-tree)

> 给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

## 递归

```js
var maxDepth = function (root) {
  if (root === null) return 0
  let current = root
  let leftDep, rightDep
  root.left && (leftDep = maxDepth(current.left))
  root.right && (rightDep = maxDepth(current.right))
  if (leftDep && rightDep) {
    return Math.max(leftDep, rightDep) + 1
  } else if (leftDep) {
    return leftDep + 1
  } else if (rightDep) {
    return rightDep + 1
  } else {
    return 1
  }
}
```

## 层序遍历

```js
var maxDepth = function (root) {
  if (root === null) return 0
  let stack = [root]
  let depth = 0
  while (stack.length > 0) {
    depth += 1
    const length = stack.length
    for (let i = 0; i < length; i++) {
      const current = stack.shift()
      current.left && stack.push(current.left)
      current.right && stack.push(current.right)
    }
  }
  return depth
}
```
