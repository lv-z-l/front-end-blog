---
title: 回文链表
author: lvzl
---

## 什么是链表？

链表（Linked List）是最简单的线性的、动态数据结构。理解它是理解树结构、图结构的基础。

区别于数组，链表中的元素不是存储在内存中连续的一片区域，链表中的数据存储在每一个称之为「结点」复合区域里，在每一个结点除了存储数据以外，还保存了到下一个节点的指针（Pointer）。

<img src="https://pic.leetcode-cn.com/67c0f9acaaaa44685a22fd85eaaba409341f874b99a5c953ff8efbc8d5110e02-image.png"/>

由于不必按顺序存储，链表在插入数据的时候可以达到 O(1)O(1) 的复杂度，但是查找一个节点或者访问特定编号的节点则需要 O(n)O(n) 的时间。

详情见:[什么是链表？](https://leetcode-cn.com/tag/linked-list/problemset/)

## 用js简单表示链表
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
```


## 回文链表

来源: [力扣（LeetCode）](https://leetcode-cn.com/problems/palindrome-linked-list/)

> 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

> 输入：head = [1,2,2,1]
> 输出：true

> 输入：head = [1,2]
> 输出：false

```js
var isPalindrome = function (head) {
  if (!head || !head.next) {
    return true
  }
  const arr = [];
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  for (let i = 0, j = arr.length - 1; i < j; ++i, --j) {
    if (arr[i] !== arr[j]) {
      return false
    }
  }
  return true
};
```