---
title: 链表反转
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/reverse-linked-list/)

> 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表

> 输入：head = [1,2,3,4,5]
> 输出：[5,4,3,2,1]

> 输入：head = [1,2]
> 输出：[2,1]

```js
var reverseList = function (head) {
  let prev = null; //上一个
  let current = head; // 当前
  while (current) {
    const next = current.next; // 
    current.next = prev;
    prev = current;
    current = next;
   }
  return prev
};
```