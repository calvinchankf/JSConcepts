class BinaryIndexedTree {
    constructor(n) {
        this.fenwickTree = Array(n+1).fill(0);
    }
    update(i, val) {
        let k = i + 1
        while (k < this.fenwickTree.length) {
            this.fenwickTree[k] += val
            k += k & -k
        }
    }
    getSum(i) {
        let total = 0
        let k = i + 1
        while (k > 0) {
            total += this.fenwickTree[k]
            k -= k & -k
        }
        return total
    }
    getRangeSum(i, j) {
        return this.getSum(j) - this.getSum(i-1)
    }
}

// const a = [0,0,0,0,0];
const bitree = new BinaryIndexedTree(5)

console.log('hi')
bitree.update(0, 1)
console.log(bitree.getSum(4))

bitree.update(1, 3)
console.log(bitree.getSum(4))

bitree.update(2, 5)
console.log(bitree.getSum(4))

bitree.update(3, 7)
console.log(bitree.getSum(4))

bitree.update(4, 9)
console.log(bitree.getSum(4))

bitree.update(1, 1)
console.log(bitree.getSum(4))
console.log(bitree.getRangeSum(1, 2))

bitree.update(2, -6)
console.log(bitree.getSum(4))
console.log(bitree.getRangeSum(1, 2))