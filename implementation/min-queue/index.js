/*
  Min Queue
  - enqueue(number)
  - dequeue()
  - peekHead()
  - isEmpty()
  - peekMin()
  - removeMin()
*/
class DLLNode {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

class MinQueue {
  constructor() {
    // sorted numbers which stores [[number1, DLLNode1], [number2, DLLNode2]...]
    this.nums = []
    // init doubly linked list
    this.head = new DLLNode(0)
    this.tail = new DLLNode(0)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  _upperBinarySearch(nums, target) {
    let left = 0
    let right = nums.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (target >= nums[mid][0]) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    return left
  }

  enqueue(val) {
    let node = new DLLNode(val)
    // insert to the end
    let last = this.tail.prev
    last.next = node
    node.prev = last
    node.next = this.tail
    this.tail.prev = node
    // insert to the sorted list
    const item = [val, node]
    const idx = this._upperBinarySearch(this.nums, val)
    // reminder: splice(idx, deleteCount, addingItem)
    this.nums.splice(idx, 0, item)
  }

  _lowerBinarySearch(nums, target) {
    let left = 0
    let right = nums.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (target <= nums[mid][0]) {
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
    let first = this.head.next
    this.head.next = first.next
    first.next.prev = this.head
    // remove head from the linked list
    const idx = this._lowerBinarySearch(this.nums, first.val)
    this.nums.splice(idx, 1)
    return first.val
  }

  peekHead() {
    if (this.isEmpty()) {
      return null
    }
    let first = this.head.next
    return first.val
  }

  isEmpty() {
    return this.nums.length == 0
  }

  peekMin() {
    if (this.isEmpty()) {
      return null
    }
    const smallest = this.nums[0]
    return smallest[0]
  }

  removeMin() {
    if (this.isEmpty()) {
      return null
    }
    const smallest = this.nums[0]
    const smallestVal = smallest[0]
    const smallestNode = smallest[1]

    this.nums.shift()

    smallestNode.prev.next = smallestNode.next
    smallestNode.next.prev = smallestNode.prev

    return smallestVal
  }
}

const mq = new MinQueue()
mq.enqueue(4)
mq.enqueue(2)
mq.enqueue(3)
mq.enqueue(5)
mq.enqueue(1)
mq.enqueue(6)
console.log(mq.peekHead(), mq.peekMin())
// [4, 2, 3, 5, 1, 6]
mq.removeMin()
// [4, 2, 3, 5, 6]
console.log(mq.peekHead(), mq.peekMin())
mq.dequeue()
// [2, 3, 5, 6]
console.log(mq.peekHead(), mq.peekMin())
mq.removeMin()
// [3, 5, 6]
console.log(mq.peekHead(), mq.peekMin())
mq.enqueue(2)
mq.enqueue(2)
// [3, 5, 6, 2, 2]
console.log(mq.peekHead(), mq.peekMin())
mq.dequeue()
// [5, 6, 2, 2]
console.log(mq.peekHead(), mq.peekMin())
mq.removeMin()
// [5, 6, 2]
console.log(mq.peekHead(), mq.peekMin())
mq.removeMin()
// [5, 6]
console.log(mq.peekHead(), mq.peekMin())
mq.dequeue()
// [6]
console.log(mq.peekHead(), mq.peekMin())
mq.removeMin()
// []
console.log(mq.peekHead(), mq.peekMin())