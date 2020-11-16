/*
    https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type

    Requirements:

    LWW-Element-Set is similar to 2P-Set in that it consists of 
    - an "add set" and a "remove set"
    - with a timestamp for each element
    
    - Elements are added to an LWW-Element-Set by inserting the element into the add set, with a timestamp
    - Elements are removed from the LWW-Element-Set by being added to the remove set, again with a timestamp
    
    An element is a member of the LWW-Element-Set if
    - it is in the add set and not in the remove set
    - it is in the remove set but with an earlier timestamp than the latest timestamp in the add set
    
    Merging two replicas of the LWW-Element-Set consists of taking 
    - the union of the add sets 
    - and the union of the remove sets. 
    
    When timestamps are equal, the "bias" of the LWW-Element-Set comes into play. A LWW-Element-Set can be biased towards adds or removals. 
    
    The advantage of LWW-Element-Set over 2P-Set is that, unlike 2P-Set, LWW-Element-Set allows an element to be reinserted after having been removed.
*/
class LWWElementSet {
    constructor() {
        this.addSet = {}
        this.removeSet = {}
    }

    // accepting a timestamp as a param is more flexible
    insert(key, t = Date.now()) {
        this.addSet[key] = t
    }

    remove(key, t = Date.now()) {
        this.removeSet[key] = t
    }

    has(key) {
        if (key in this.addSet && key in this.removeSet) {
            // >=   bias towards add <-- my bias
            // >    bias towards remove
            if (this.addSet[key] >= this.removeSet[key]) {
                return true
            }
            return false
        } else if (key in this.addSet) {
            return true
        }
        return false
    }

    get(key) {
        if (this.has(key)) {
            return this.addSet[key]
        }
        return null
    }

    // make the merge() as a class method instead of a standalone function <- more organized
    static merge(setA, setB) {
        const res = new LWWElementSet()

        // put setA in result set
        for (let key in setA.addSet) {
            res.insert(key, setA.addSet[key])
        }
        for (let key in setA.removeSet) {
            res.remove(key, setA.removeSet[key])
        }
        // put setB in result set
        for (let key in setB.addSet) {
            if (res.has(key)) {
                if (res.addSet[key] < setB.addSet[key]) {
                    res.insert(key, setB.addSet[key])
                }
            } else {
                res.insert(key, setB.addSet[key])
            }
        }
        for (let key in setB.removeSet) {
            if (res.has(key)) {
                if (res.removeSet[key] < setB.removeSet[key]) {
                    res.remove(key, setB.removeSet[key])
                }
            } else {
                res.remove(key, setB.removeSet[key])
            }
        }
        // P.S. i prefer more lines for conditions instead of longer lines, so the code will be more readable
        return res
    }
}
module.exports = LWWElementSet;

// const s1 = new LWWElementSet()

// s1.insert('AAA')
// s1.insert('BBB')
// s1.remove('AAA')

// console.log(s1.addSet)
// console.log(s1.removeSet)

// console.log(s1.has('AAA'))
// console.log(s1.get('AAA'))
// console.log(s1.has('BBB'))
// console.log(s1.get('BBB'))
// console.log(s1.has('CCC'))

// console.log("-----")

// const s2 = new LWWElementSet()

// s2.insert('AAA')
// s2.insert('BBB')
// s2.insert('CCC')

// console.log(s2.addSet)
// console.log(s2.removeSet)

// console.log(s2.has('AAA'))
// console.log(s2.get('AAA'))
// console.log(s2.has('BBB'))
// console.log(s2.get('BBB'))
// console.log(s2.has('CCC'))
// console.log(s2.get('CCC'))

// console.log('--- merge ---')

// const s3 = LWWElementSet.merge(s1, s2)
// console.log(s3.addSet)
// console.log(s3.removeSet)