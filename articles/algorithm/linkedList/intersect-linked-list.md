---
title: 相交链表
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

> 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

<img src="https://assets.leetcode.com/uploads/2018/12/13/160_example_1.png"/>

## 哈希集合

首先遍历链表 headA，并将链表 headA 中的每个节点加入哈希集合中。然后遍历链表 headB，对于遍历到的每个节点，判断该节点是否在哈希集合中：
果当前节点不在哈希集合中，则继续遍历下一个节点；
如果当前节点在哈希集合中，则后面的节点都在哈希集合中，即从当前节点开始的所有节点都在两个链表的相交部分，因此在链表 headB 中遍历到的第一个在哈希集合中的节点就是两个链表相交的节点，返回该节点。
如果链表 headB 中的所有节点都不在哈希集合中，则两个链表不相交，返回null。

```js
var getIntersectionNode = function(headA, headB) {
    let current = headA
    const hasSee = new Set()
    while(current != null){
        hasSee.add(current)
        current = current.next
    }
    current = headB
    while(current != null){
        if(hasSee.has(current)) {
            return current
        }
        current = current.next
    }
    return current
};
```

## 双指针

指针 pA 指向 A 链表，指针 pB 指向 B 链表，依次往后遍历
如果 pA 到了末尾，则 pA = headB 继续遍历
如果 pB 到了末尾，则 pB = headA 继续遍历

看图比较容易理解：
<img src="https://pic.leetcode-cn.com/e86e947c8b87ac723b9c858cd3834f9a93bcc6c5e884e41117ab803d205ef662-%E7%9B%B8%E4%BA%A4%E9%93%BE%E8%A1%A8.png"/>

根据描述，直接敲代码了

```js
var getIntersectionNode = function(headA, headB) {
    if(headA == null || headB == null){
        return null
    }
    let pA = headA, pB = headB
    while(pA !== pB){
        pA = pA === null ? headB : pA.next
        pB = pB === null ? headA : pB.next
    }
    return pA
}
```


