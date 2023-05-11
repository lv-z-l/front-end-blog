---
title: 合并K个升序链表
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

> 给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。

> 输入：lists = [[1,4,5],[1,3,4],[2,6]]
> 输出：[1,1,2,3,4,4,5,6]

```js
var mergeKLists = function (lists) {
  let all = [];
  lists.forEach(item => {
    while (item) {
      all.push(new ListNode(item.val))
      item = item.next
    }
  })
  all = all.sort((a, b) => a.val - b.val)
  let res = temp = new ListNode();
  all.forEach(item => {
    temp.next = item
    temp = temp.next
  })
  return res.next
};
```


