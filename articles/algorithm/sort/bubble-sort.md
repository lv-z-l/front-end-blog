---
title: 冒泡排序
author: lvzl
---

假设循环到第 `i` 次，每循环一次就能把数组中第`i`个大的值移到最后面

假设数组长度是 l, 因此需要循环 l 次

## 最差版

```js
function bubbleSort(arr) {
  const l = arr.length
  for(let i = 0; i < l; i++) { // 循环l次
    // 两两比较
    for(let j = 0; j < l - 1; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]] // 交换值
        // 相当于
        // const temp = arr[j+1]
        // arr[j+1] = arr[j]
        // arr[j] = temp
      }
    }
  }
  return arr
}

```

## 优化一下

既然上面提到了，每循环一次就能把第`i`个大的值移到最后面，就意味着最后 i 个元素是有序的，不需要再去比较

```js
function bubbleSort(arr) {
  const l = arr.length
  for(let i = 0; i < l; i++) {
    for(let j = 0; j < l - 1 - i; j++) { // 区别在这里，- i
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}
```

我们再进一步想一下，如果第一次比较，就没有把最大值冒泡到最后，没有交换过位置，意味着什么，意味着本身就是有序的。因此

## 完美版

```js
function bubbleSort(arr) {
  const l = arr.length
  let flag = false // 区别在这里
  for(let i = 0; i < l; i++) {
    for(let j = 0; j < l - 1 - i; j++) {
      if(arr[j] > arr[j+1]) {
        flag = true
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
    if(!flag) return arr // 区别在这里
  }
  return arr
}
```
