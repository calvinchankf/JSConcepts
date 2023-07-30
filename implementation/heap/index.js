class MinHeap {
    constructor() {
        this.A = []
    }
    heapPush(x) {
        this.A.push(x)
        this._shiftUp(this.A.length-1)
    }
    heapPop() {
        const n = this.A.length;
        [this.A[n-1], this.A[0]] = [this.A[0], this.A[n-1]];
        const minNode = this.A.pop()
        this._shiftDown(0)
        return minNode
    }
    _shiftUp(i) {
        const parentIdx = Math.floor((i-1)/2)
        if (parentIdx >= 0 && this.A[i][0] < this.A[parentIdx][0]) {
            [this.A[i], this.A[parentIdx]] = [this.A[parentIdx], this.A[i]];
            this._shiftUp(parentIdx)
        }
    }
    _shiftDown(i) {
        const children = [i*2+1, i*2+2]
        let minChildIdx = i
        for (let j of children) {
            if (j >= this.A.length) { continue }
            if (this.A[j][0] < this.A[minChildIdx][0]) {
                minChildIdx = j
            }
        }
        if (minChildIdx > i) {
            [this.A[i], this.A[minChildIdx]] = [this.A[minChildIdx], this.A[i]];
            this._shiftDown(minChildIdx)
        }
    }
    heapify(values) {
        // O(nlogn) version
        // for (let i = 0; i < values.length; i++) {
        //   this.heapPush(values[i])
        // }
        /*
            O(n) version
            bottom-up
            shift down from bottom to up such that we minimize the number of shift operations
            n/2 + n/8 + n/16.... = O(n)
        */
        this.A = values
        const n = values.length
        for (let i = Math.floor(n / 2); i >= 0; i--) {
            this._shiftDown(i)
        }
    }
}


console.log("--- insert() ---")
let h = new MinHeap()
h.heapPush(8)
h.heapPush(9)
h.heapPush(6)
h.heapPush(7)
h.heapPush(4)
h.heapPush(3)
h.heapPush(5)
console.log(h.A)
while (h.A.length > 0) {
  console.log(h.heapPop())
}

console.log("--- insert() with duplicate values ---")
h = new MinHeap()
h.heapPush(8)
h.heapPush(8)
h.heapPush(6)
h.heapPush(4)
h.heapPush(4)
h.heapPush(3)
h.heapPush(5)
console.log(h.A)
while (h.A.length > 0) {
  console.log(h.heapPop())
}

console.log("--- heapify() ---")
h = new MinHeap()
h.heapify([6, 4, 2, 8, 9, 5, 7, 3])
let res = []
while (h.A.length > 0) {
  res.push(h.heapPop())
}
console.log(res)

console.log("--- heapify() with duplicates --- ")
h = new MinHeap()
h.heapify([6, 4, 2, 8, 9, 5, 7, 4])
res = []
while (h.A.length > 0) {
  res.push(h.heapPop())
}
console.log(res)

console.log("--- HeapSort ---")
function heapsort(values) {
  const res = []
  const h = new MinHeap()
  h.heapify(values)
  const n = values.length
  for (let i = 0; i < n; i++) {
    res.push(h.heapPop())
  }
  return res
}

console.log(heapsort([12, 3, 1, 2, 4, 6, 3, 2, 4, 6, 3, 37, 37, 5, 5, 7, 77, 33, 4, 45]))