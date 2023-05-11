---
title: 环形链表
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/linked-list-cycle/)

> 给你一个链表的头节点 head ，判断链表中是否有环。如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。如果链表中存在环，则返回 true 。 否则，返回 false 。

> 输入：head = [3,2,0,-4] pos = 1
> 输出: true

## 遍历

> 最容易想到的方法是遍历所有节点，每次遍历到一个节点时，判断该节点此前是否被访问过

```js
var hasCycle = function(head) {
    let current = head
    while(current != null){
      if(current.tag === 1){ //判断该节点此前是否被访问过
        return true
      }
      current.tag = 1 // 加标志
      current = current.next // 指向下一个
    }
    return false
}
```

## 快慢指针

> 定义两个指针，一快一满。慢指针每次只移动一步，而快指针每次移动两步。初始时，慢指针在位置 head，而快指针在位置 head.next。这样一来，如果在移动的过程中，快指针反过来追上慢指针，就说明该链表为环形链表。否则快指针将到达链表尾部，该链表不为环形链表。

```js
var hasCycle = function(head) {
    if (head == null || head.next == null) { // 只有一个节点，不可能成环，直接return
      return false
    }
    let slow = head
    let fast = head.next
    while(slow !== fast){
      if(fast == null || fast.next == null || slow == null){
        return false
      }
      slow = slow.next
      fast = fast.next.next
    }
    return true
}
```


