// leetcode146
class DLLNode {
    constructor(key = -1, val = -1) {
        this.key = key
        this.val = val
        this.prev = null
        this.next = null
    }
}
class LRUCache {
    constructor(capacity) {
        this.cap = capacity
        this.map = new Map()
    }
    get(key) {
        if (this.map.has(key) === false) {
            return -1
        }
        const value = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, value)
        return value
    }
    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key)
        }
        this.map.set(key, value)
        if (this.map.size > this.cap) {
            const oldest = this.map.keys().next().value
            this.map.delete(oldest)
        }
    }
}

const c = new LRUCache(2)
c.put("c", 123)
c.put("a", 456)
c.put("b", 789)
console.log(c.get("c"))
console.log(c.get("a"))
c.put("d", 123)
console.log(c.get("c"))
console.log(c.get("a"))
console.log(c.get("d"))