// doubly linked list
function ListNode(key, val) {
  this.key = key
  this.val = val
  this.prev = null
  this.next = null
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.map = {}
  this.listHead = new ListNode(-1, -1)
  this.listTail = new ListNode(-1, -1)
  this.listLength = 0
  this.listHead.next = this.listTail
  this.listTail.prev = this.listHead
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map[key] !== undefined) {
    this._moveToTail(this.map[key])
    return this.map[key].val
  }
  return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.map[key]
  if (node == undefined) {
    node = new ListNode(key, value)
    this._addToTail(node)
    this.listLength++
  } else {
    node.val = value
    this._moveToTail(node)
  }
  if (this.listLength > this.capacity) {
    this._removeHead()
    this.listLength--
  }
  this.map[key] = node
};

LRUCache.prototype._addToTail = function (node) {
  let last = this.listTail.prev
  last.next = node
  node.prev = last
  node.next = this.listTail
  this.listTail.prev = node
};

LRUCache.prototype._moveToTail = function (node) {
  node.prev.next = node.next
  node.next.prev = node.prev
  this._addToTail(node)
};

LRUCache.prototype._removeHead = function () {
  let first = this.listHead.next
  this.listHead.next = first.next
  first.next.prev = this.listHead
  delete this.map[first.key]
};


const c = new LRUCache(2)
c.put("c", 123)
c.put("a", 456)
c.put("b", 789)
console.log(c.map)
c.put("a", 123)
console.log(c.listHead)
c.get("b")
c.get("b")
c.get("b")
console.log(c.listHead)
// console.log(c.listTail)
// console.log(c.listLength)
