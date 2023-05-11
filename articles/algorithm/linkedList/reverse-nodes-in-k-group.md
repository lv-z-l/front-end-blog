---
title: K 个一组翻转链表
author: lvzl
---

来源 [力扣（LeetCode）](https://leetcode-cn.com/problems/reverse-nodes-in-k-group)

> 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

> 输入：head = [1,2,3,4,5], k = 2
> 输出：[2,1,4,3,5]

## 第一种
```js
var reverseKGroup = function (head, k) {
  let arr = [];
  i = 0;
  while (head) {
    arr.push(head.val)
    head = head.next
    ++i
    if (i === k) {
      const current = arr.slice(arr.length - k, arr.length).reverse()
      arr.splice(arr.length - k, k)
      arr = arr.concat(current)
      i = 0
    }
  }
  let res = temp = new ListNode();
  arr.forEach(item => {
    temp.next = new ListNode(item)
    temp = temp.next
  })
  return res.next
};

```

## 第二种

```js
var reverseKGroup = function(head, k) {
    const groupEnds = []
    let groupSatrt = head
    let index = 0
    while(head) {
        index += 1
        if(index === k){
            index = 0
            const next = head.next
            head.next = null
            groupEnds.push(reverse(groupSatrt))
            groupSatrt = next
            head = next
        } else if(head.next === null) {
            groupEnds.push(groupSatrt)
            head = head.next
        } else {
            head = head.next
        }
    }
    for(let i = 0; i< groupEnds.length; i++) {
        let ele = groupEnds[i]
        while(ele.next) {
            ele = ele.next
        }
        ele.next = groupEnds[i+1] || null
    }
    return groupEnds[0]
};
// 反转链表
const reverse = function(head) {
    let pre = null
    while(head) {
        const next = head.next
        head.next = pre
        pre = head
        head = next
    }
    return pre
}
```


