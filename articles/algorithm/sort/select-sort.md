---
title: 选择排序
author: lvzl
---

- 两个指针 i = 0、j = arr.length - 1
- 找出索引区间[i, j]的最小值，放到当前范围的头部, 每找一次 i++
- 知道概念，实现就很简单了 O(n^2)

```js
function selectSort(arr) {
  const findMin = (i, j) => {
    let minI = i
    while (i <= j) {
      if (arr[i] < arr[minI]) {
        minI = i
      }
      i++
    }
    return minI
  }
  let i = 0,
    j = arr.length - 1
  while (i < j) {
    let min = findMin(i, j)
    const temp = arr[min]
    arr[min] = arr[i]
    arr[i] = temp
    i++
  }
  return arr
}
```
