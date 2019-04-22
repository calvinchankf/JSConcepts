/*
  Min Queue
  - enqueue(number)
  - dequeue()
  - peekHead()
  - isEmpty()
  - peekMin()

  followup: implement removeMin()
*/

class MinQueue {
  constructor() {
    // sorted version of arr
    this.nums = []
    // the queue
    this.arr = []
  }

  _upperBinarySearch(nums, target) {
    let left = 0
    let right = nums.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (target >= nums[mid]) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    return left
  }

  enqueue(val) {
    // insert
    this.arr.push(val)
    // binary to get the upper bound for item insertion
    const idx = this._upperBinarySearch(this.nums, val)
    // reminder: splice(idx, deleteCount, addingItem)
    this.nums.splice(idx, 0, val)
  }

  _lowerBinarySearch(nums, target) {
    let left = 0
    let right = nums.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (target <= nums[mid]) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  }

  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    // remove head
    const first = this.arr.shift()
    // remove head from the linked list
    const idx = this._lowerBinarySearch(this.nums, first)
    this.nums.splice(idx, 1)
    return first
  }

  peekHead() {
    if (this.isEmpty()) {
      return null
    }
    return this.arr[0]
  }

  isEmpty() {
    return this.nums.length == 0
  }

  peekMin() {
    if (this.isEmpty()) {
      return null
    }
    const smallest = this.nums[0]
    return smallest
  }
}

const mq = new MinQueue()
mq.enqueue(4)
mq.enqueue(1)
mq.enqueue(3)
mq.enqueue(5)
mq.enqueue(2)
mq.enqueue(6)
console.log(mq.peekHead(), mq.peekMin())
// [4, 1, 3, 5, 2, 6]
mq.dequeue()
// [1, 3, 5, 2, 6]
console.log(mq.peekHead(), mq.peekMin())
mq.dequeue()
// [3, 5, 2, 6]
console.log(mq.peekHead(), mq.peekMin())