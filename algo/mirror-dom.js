/*
    Mirror the architecture of a DOM tree
*/


function Node(val, children) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
}

const _printNaryTree = (node, hivens = '') => {
    if (node == null) {
        return
    }
    console.log(`${hivens}${node.val}`)
    for (let child of node.children) {
        _printNaryTree(child, hivens + '-')
    }
}

let mirrorNaryTree
let result

/*
    1st: recursive dfs
*/
mirrorNaryTree = (root) => {
    if (!root) {
        return null
    }
    const newChildren = []
    for (let i = root.children.length-1; i >= 0; i--) {
        const child = root.children[i]
        const newChild = mirrorNaryTree(child)
        newChildren.push(newChild)
    }
    root.children = newChildren
    return root
}

/*
            0
        1   2   3
    4 5 6   7
*/
let a, b, c, d, e, f, g, h
a = new Node(0)
b = new Node(1)
c = new Node(2)
d = new Node(3)
e = new Node(4)
f = new Node(5)
g = new Node(6)
h = new Node(7)
a.children = [b, c, d]
b.children = [e, f, g]
c.children = [h]

result = mirrorNaryTree(a)
_printNaryTree(result)

console.log("-----")

/*
    1st: recursive dfs
*/
mirrorNaryTree = (root) => {
    if (!root) {
        return null
    }
    const q = [root]
    while (q.length > 0) {
        const node = q.shift()
        node.children.reverse()
        for (let child of node.children) {
            q.push(child)
        }
    }
    return root
}

/*
            0
        1   2   3
    4 5 6   7
*/
a = new Node(0)
b = new Node(1)
c = new Node(2)
d = new Node(3)
e = new Node(4)
f = new Node(5)
g = new Node(6)
h = new Node(7)
a.children = [b, c, d]
b.children = [e, f, g]
c.children = [h]

result = mirrorNaryTree(a)
_printNaryTree(result)