/*
  1. similar implementation as LFU cache
  2. actually we could simply use a heap, but there is no Heap data structure in JS
  put O(1) if size<cap, O(n) if size>=cap
  get O(1)
  280ms beats 27.27%
  19jan2019
*/

// doubly linked list
function ListNode(key, val) {
  this.key = key
  this.val = val
  this.occurence = 1
  this.prev = null
  this.next = null
}

function Bucket() {
  this.listHead = new ListNode(-1, -1)
  this.listTail = new ListNode(-1, -1)
  this.listLength = 0
  this.listHead.next = this.listTail
  this.listTail.prev = this.listHead
}

/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  this.capacity = capacity
  this.map = {}
  this.buckets = [new Bucket()] // dump bucket at index 0
  this.listLength = 0
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  if (this.map[key] !== undefined) {
    this._moveToNextBucket(this.map[key])
    return this.map[key].val
  }
  return -1
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.capacity <= 0) {
    return
  }
  let node = this.map[key]
  if (node == undefined) {
    // first remove
    if (this.listLength == this.capacity) {
      this._removeHead()
      this.listLength--
    }
    // then add
    node = new ListNode(key, value)
    this._addToFirstBucketTail(node)
    this.listLength++
  } else {
    // just move
    node.val = value
    this._moveToNextBucket(node)
  }
  this.map[key] = node
};

Bucket.prototype._addToTail = function (node) {
  let last = this.listTail.prev
  last.next = node
  node.prev = last
  node.next = this.listTail
  this.listTail.prev = node
  this.listLength++
}

Bucket.prototype._removeHead = function () {
  let first = this.listHead.next
  this.listHead.next = first.next
  first.next.prev = this.listHead
  this.listLength--
  return first.key
}

LFUCache.prototype._addToFirstBucketTail = function (node) {
  let bucket
  if (node.occurence < this.buckets.length) {
    bucket = this.buckets[node.occurence]
  } else {
    bucket = new Bucket()
    this.buckets.push(bucket)
  }
  bucket._addToTail(node)
};

LFUCache.prototype._moveToNextBucket = function (node) {
  node.prev.next = node.next
  node.next.prev = node.prev

  const level = node.occurence
  if (level >= 0) {

    let prevBucket = this.buckets[node.occurence]
    prevBucket.listLength--

    let bucket
    if (node.occurence + 1 < this.buckets.length) {
      bucket = this.buckets[level + 1] // occurence=1 means index 1
    } else {
      bucket = new Bucket()
      this.buckets.push(bucket)
    }
    node.occurence++
    bucket._addToTail(node)
  }
};

LFUCache.prototype._removeHead = function () {
  for (let i = 1; i < this.buckets.length; i++) {
    let bucket = this.buckets[i]
    if (bucket.listLength > 0) {
      const key = bucket._removeHead()
      delete this.map[key]
      break
    }
  }
};

LFUCache.prototype._printBucket = function (bucket) {

}

/*
["LFUCache","put","put","get","put","get","get","put","get","get","get"]
[[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]
*/
let c = new LFUCache(2)
c.put(1, 1)
c.put(2, 2)
console.log(c.get(1))
c.put(3, 3)
console.log(c.get(2))
console.log(c.get(3))
c.put(4, 4)
console.log(c.get(1))
console.log(c.get(3))
console.log(c.get(4))

// console.log(c.buckets[1].listHead.next)
// console.log(c.buckets[1].listLength)
// console.log(c.buckets[2].listHead.next)
// console.log(c.buckets[2].listLength)
// console.log(c.map)

/*
["LFUCache","put", "get"]
[[0],[0,0],[0]]
*/
c = new LFUCache(0)
c.put(0, 0)
console.log(c.get(0))

/*
["LFUCache","get","put","get","put","put","get","get"]
[[2],[2],[2,6],[1],[1,5],[1,2],[1],[2]]
*/
c = new LFUCache(2)
console.log(c.get(2))
c.put(2, 6)
console.log(c.get(1))
c.put(1, 5)
c.put(1, 2)
console.log(c.get(1))
console.log(c.get(2))
