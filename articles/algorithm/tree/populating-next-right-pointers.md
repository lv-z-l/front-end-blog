---
title: 填充每个节点的下一个右侧节点指针
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/)

> 给定一个二叉树，填充它的每个 next 指针

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
初始状态下，所有  next 指针都被设置为 NULL。

## 递归

```js
const connect = function (root) {
  const stack = [root]
  while (stack.length > 0) {
    const length = stack.length
    const temp = []
    for (let i = 0; i < length; i++) {
      const current = stack.shift()
      temp.push(current)
      current.left && stack.push(current.left)
      current.right && stack.push(current.right)
    }
    temp.forEach((item, index) => {
      item.next = temp[index + 1] || null
    })
  }
  return root
}
```
