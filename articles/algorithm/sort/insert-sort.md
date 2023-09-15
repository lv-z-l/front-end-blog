---
title: 插入排序
author: lvzl
---

假设数组长度是 l, 需要循环 l - 1 次

针对每个遍历到的元素 arr[i]，在[0, i]之间找到合适 arr[i]的位置插入即可，（前面的值 < arr[i] && 后面的值 > arr[i]）

```js
function insertSort(arr) {
  if (arr.length === 1) return arr
  let i = 1
  while (i <= arr.length - 1) {
    const temp = arr[i]
    let j = i
    // 找位置，如果前面的比它小，就一直往前面找，并且这些比它大的值都往后挪位置
    // 因为它 temp 的位置是空的，单独拎出去等着了，在它前面比它大的就可以往后占它的位置，
    // 直到给它找到合适的位置。
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1] // 往后挪位置
      j--
    }
    arr[j] = temp
    i++
  }
  return arr
}
```
