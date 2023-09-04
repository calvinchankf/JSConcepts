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
        this.ht = {}
        this.htSize = 0
        this.head = new DLLNode()
        this.tail = new DLLNode()
        this.head.next = this.tail
        this.tail.prev = this.head
    }
    _removeNode(node) {
        node.prev.next = node.next
        node.next.prev = node.prev
    }
    _addToTail(node) {
        const last = this.tail.prev
        last.next = node
        node.prev = last
        node.next = this.tail
        this.tail.prev = node
    }
    get(key) {
        if (key in this.ht === false) {
            return -1
        }
        const node = this.ht[key]
        this._removeNode(node)
        this._addToTail(node)
        return node.val
    }
    put(key, value) {
        if (key in this.ht) {
            const node = this.ht[key]
            node.val = value
            this._removeNode(node)
            this._addToTail(node)
        } else {
            const newNode = new DLLNode(key, value)
            this._addToTail(newNode)
            this.ht[key] = newNode
            this.htSize += 1
        }
        if (this.htSize > this.cap) {
            const first = this.head.next
            this._removeNode(first)
            delete this.ht[first.key]
            this.htSize -= 1
        }
    }
}


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
