---
title: 链表排序
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/sort-list/)

> 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

<img src="https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg"/>

## 哈希集合

遍历每个节点存到数组中，利用数组的sort方法，再组装成一个链表的结构

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    let current = head
    const arr = []
    while(current != null){
        arr.push(current)
        current = current.next
    }
    arr.sort((a,b) => a.val - b.val)
    arr.push(null)
    let res
    arr.forEach((item,i) => {
        if(i == 0) {
            res = item
        }
        if(item){
            item.next = arr[i+1]
        }
    })
    return res
};


```

## 归并排序

讲道理，这个还是有点复杂的，参考了好几位大佬的题解，终于弄懂了，自己敲出来

个人觉得最佳题解：[掘金](https://juejin.cn/post/7031336438222290951)

```js
const sortList = function (head) {
  // 如果head为null 或者 head没有下一个节点，不需要排序，直接返回
  if (head === null || head.next === null) {
    return head
  }
  // 找到链表的 中间节点
  const mid = getMid(head)

  // 调用getMid后 head就变成了中间节点左边，而不是完整的链表，再递归去排序
  const left = sortList(head)
  // 递归去排序 中间节点右边
  const right = sortList(mid)

  // 排序的左边，右边合并起来，就是排序后的完整链表
  return merge(left, right)
};

const getMid = function (head) {
  // 快慢指针去找中点，慢指针每次走一步，快指针每次走两步，当快指针走到终点，满指针就到中点了
  let slow = head, fast = head
  while (fast.next != null && fast.next.next != null) {
    slow = slow.next
    fast = fast.next.next
  }
  const mid = slow.next  // 把中间节点存下来
  slow.next = null // 切断，分为两段
  return mid // 返回中间节点
}

const merge = function (list1, list2) {
  // 三个指针， 初始分别指向list1, list2, 一个用于返回的head节点
  let p1 = list1, p2 = list2
  let merged = new ListNode(0)
  let temp = merged

  // 直到 p1,p2 有一个为null  或者 两个都为 null
  while (p1 != null && p2 != null) {
    // 比较p1, p2哪个的值大，把值小的赋值给temp.next
    // 然后值小的指向next
    if (p1.val < p2.val) {
      temp.next = p1
      p1 = p1.next
    } else {
      temp.next = p2
      p2 = p2.next
    }
    temp = temp.next
  }
  // temp.next 指向 不为null的那个指针
  if(p1 != null){
    temp.next = p1
  } else if(p2 != null){
    temp.next = p2
  }
  // 返回 merged.next
  return merged.next
}
```


