const arr = [6, 2, 1]

function insertSort(arr) {
  if (arr.length === 1) return arr
  let i = 1
  while (i <= arr.length - 1) {
    const temp = arr[i]
    let j = i
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = temp
    i++
  }
  return arr
}

insertSort(arr)
