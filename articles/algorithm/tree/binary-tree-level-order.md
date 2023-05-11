---
title: 二叉树的层序遍历
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/binary-tree-level-order-traversal)

> 给你二叉树的根节点 root ，返回它节点值的 层序 遍历。

## 递归

```js
const levelOrder = function(root) {
  if(!root) return []
  const res = []
  const stack = []
  stack.push(root)
  while(stack.length > 0){
      const cur = stack.shift()
      res.push(cur.val)
      cur.left && stack.push(cur.left)
      cur.right && stack.push(cur.right)
  }

  return res
};
```


