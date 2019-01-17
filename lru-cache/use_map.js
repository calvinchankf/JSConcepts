/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.map = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    const tempValue = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, tempValue)
    return tempValue
  }
  return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const keys = Array.from(this.map.keys())
  if (this.capacity == keys.length) {
    if (keys.length == 0) {
      return
    }
    if (this.map.has(key)) {
      this.map.delete(key)
      this.map.set(key, value)
    } else {
      const firstKey = keys[0]
      this.map.delete(firstKey)
      this.map.set(key, value)
    }
  } else {
    this.map.set(key, value)
  }
};

c = new LRUCache(2)
c.put("c", 123)
c.put("a", 456)
c.put("b", 789)
console.log(c.get("c"))
console.log(c.get("a"))
c.put("d", 123)
console.log(c.get("c"))
console.log(c.get("a"))
console.log(c.get("d"))