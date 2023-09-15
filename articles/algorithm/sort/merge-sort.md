---
title: 归并排序
author: lvzl
---

## 归并排序

归并排序是对分治思想的典型应用，它按照如下的思路对分治思想“三步走”的框架进行了填充：

1. 分解子问题：将需要被排序的数组从中间分割为两半，然后再将分割出来的每个子数组各分割为两半，重复以上操作，直到单个子数组只有一个元素为止。
2. 求解每个子问题：从粒度最小的子数组开始，两两合并、确保每次合并出来的数组都是有序的。（这里的“子问题”指的就是对每个子数组进行排序）。
3. 合并子问题的解，得出大问题的解：当数组被合并至原有的规模时，就得到了一个完全排序的数组

举个例子：[4,3,2,1]
分割：[4,3]| [2,1] -> [4] | [3] | [2] | [1]
合并：[4] | [3] | [2] | [1] -> [3,4]|[1,2] -> [1,2,3,4]

**先不断的分割（想到递归），终止条件就是数组不能再继续分割 length <= 1，分割的逻辑也很简单，先找到中点，然后 slice。分割后产生左边右边，要将分割后的左右合并成有序的一个数组。**

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr

  const mergeArr = (arrL, arrR) => {
    const l1 = arrL.length,
      l2 = arrR.length
    let i = l1 - 1,
      j = l2 - 1,
      k = i + j + 1
    while (i >= 0 && j >= 0) {
      if (arrR[j] > arrL[i]) {
        arrL[k] = arrR[j]
        j--
        k--
      } else {
        arrL[k] = arrL[i]
        i--
        k--
      }
    }
    while (j >= 0) {
      arrL[k] = arrR[j]
      j--
      k--
    }
    return arrL
  }

  const mid = Math.floor(arr.length / 2)
  const arrL = mergeSort(arr.slice(0, mid))
  const arrR = mergeSort(arr.slice(mid, arr.length))

  return mergeArr(arrL, arrR)
}
```
