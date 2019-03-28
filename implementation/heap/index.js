class Heap {
  constructor() {
    this.arr = []
  }

  heapify(values) {
    for (let i = 0; i < values.length; i++) {
      this.heapPush(values[i])
    }
  }

  heapPush(value) {
    this.arr.push(value)
    let curIdx = this.arr.length - 1
    while (true) {
      const parentIdx = Math.floor((curIdx - 1) / 2)
      if (parentIdx >= 0 && this.arr[parentIdx] > this.arr[curIdx]) {
        const temp = this.arr[curIdx]
        this.arr[curIdx] = this.arr[parentIdx]
        this.arr[parentIdx] = temp
        curIdx = parentIdx
      } else {
        break
      }
    }
  }

  heapPop() {
    const res = this.arr[0]
    const last = this.arr.pop()
    if (this.arr.length == 0) {
      return res
    }
    this.arr[0] = last
    let cur = 0
    while (cur < this.arr.length) {
      const left = cur * 2 + 1
      const right = cur * 2 + 2
      if (left < this.arr.length && right < this.arr.length) {
        if (this.arr[cur] < this.arr[left] && this.arr[cur] < this.arr[right]) {
          break
        } else if (this.arr[left] < this.arr[right]) {
          const temp = this.arr[cur]
          this.arr[cur] = this.arr[left]
          this.arr[left] = temp
          cur = left
        } else {
          const temp = this.arr[cur]
          this.arr[cur] = this.arr[right]
          this.arr[right] = temp
          cur = right
        }
      } else if (left < this.arr.length) {
        if (this.arr[left] < this.arr[cur]) {
          const temp = this.arr[cur]
          this.arr[cur] = this.arr[left]
          this.arr[left] = temp
          cur = left
        }
        break
      } else {
        break
      }
    }
    return res
  }
}

// unique values
let h = new Heap()
h.heapPush(8)
h.heapPush(9)
h.heapPush(6)
h.heapPush(7)
h.heapPush(4)
h.heapPush(3)
h.heapPush(5)
console.log(h.arr)
while (h.arr.length > 0) {
  console.log(h.heapPop())
}

// duplicate values
h = new Heap()
h.heapPush(8)
h.heapPush(8)
h.heapPush(6)
h.heapPush(4)
h.heapPush(4)
h.heapPush(3)
h.heapPush(5)
console.log(h.arr)
while (h.arr.length > 0) {
  console.log(h.heapPop())
}

console.log("-----")

// unique values
h = new Heap()
h.heapify([6, 4, 2, 8, 9, 5, 7, 3])
console.log(h.arr)
while (h.arr.length > 0) {
  console.log(h.heapPop())
}

// duplicate values
h = new Heap()
h.heapify([6, 4, 2, 8, 9, 5, 7, 4])
console.log(h.arr)
while (h.arr.length > 0) {
  console.log(h.heapPop())
}

// Heap Sort
function heapsort(values) {
  const res = []
  const h = new Heap()
  h.heapify(values)
  for (let i = 0; i < values.length; i++) {
    res.push(h.heapPop())
  }
  return res
}

console.log(heapsort([12, 3, 1, 2, 4, 6, 3, 2, 4, 6, 3, 37, 37, 5, 5, 7, 77, 33, 4, 45]))