const mergeObjects = (objA, objB) => {
    const res = {}
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)
    const keys = new Set([...keysA, ...keysB])
    for (let k of keys) {
        if (k in objA && k in objB) {
            if (Number.isInteger(objA[k]) && Number.isInteger(objB[k])) {
                res[k] = objA[k] + objB[k]
            } else if (typeof objA[k] === 'object' && typeof objB[k] === 'object') {
                res[k] = mergeObjects(objA[k], objB[k])
            }
        } else if (k in objA) {
            res[k] = objA[k]
        } else if (k in objB) {
            res[k] = objB[k]
        }
    }
    return res
}

const A = {
    a: 1,
    b: {
        c: 2,
        d: 3
    },
    e: 4
}
const B = {
    a: 10,
    b: {
        c: 20,
        f: {
            g: 30 
        }
    }
}

/*
    {
        a: 11, 
        b: { 
            c: 22, 
            d: 3, 
            f: { 
                g: 30
            }
        },
        e: 4
    }
*/
console.log(mergeObjects(A, B))