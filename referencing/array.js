/*
  Arraies are passed by reference
*/
const a = [1, 2, 3]

function add(arr) {
  arr.push(4)
}

function remove(arr) {
  arr.splice(arr.length - 1, 1)
}

function edit(arr) {
  arr[arr.length - 1] = 1000
}

function editBack(arr) {
  arr[arr.length - 1] = 3
}

// expect a = [1,2,3,4]
add(a)
console.log(a)

// expect a = [1,2,3]
remove(a)
console.log(a)

// expect a = [1,2,1000]
edit(a)
console.log(a)

/*
  When we assign a to b, it actually means a and b share the same reference,
  so when we change the item value of b, that value also be changed
*/
const b = a
editBack(b)
console.log(a) // expect [ 1, 2, 3 ]
console.log(b) // expect [ 1, 2, 3 ]

/*
  Copy an array of primitives
  - for primitive types, JS doesn't use pointers but instead copy the value and assign to the new variables
  - therefore when we use slice() to copy an array of primitives, the new variable is a deep copy
*/
const c = a.slice()
edit(c)
console.log(a) // [1,2,3]
console.log(c) // [1,2,1000]

/*
  However, as mentioned, for all non-primitive types, js copy/pass by reference.
  So when we copy the array, the s2 has a new address, but JS doesn't copy the references of the items
  aka: shallow copy
*/
const s1 = [
  ['apple', 'orange', 'pear'],
  ['carrots', 'beans', 'peas'],
  ['cookies', 'cake', 'muffins'],
]
var s2 = s1.slice()
s2[1][1] = 'calvin'
console.log(s1[1]) // [ 'carrots', 'calvin', 'peas' ]
console.log(s2[1]) // [ 'carrots', 'calvin', 'peas' ]

/*
  Same thing happens on an object(hash table/dict)
*/

const o1 = [
  { 'name': 'Jon', 'age': 24 },
  { 'name': 'Mark', 'age': 32 },
  { 'name': 'Kacy', 'age': 22 }
];
var o2 = o1.slice();
o2[1].name = 'Bill';
console.log(o1[1]) // { name: 'Bill', age: 32 }
console.log(o2[1]) // { name: 'Bill', age: 32 }

/*
  So how should we do deep copy?
  1. obj = JSON.parse(JSON.stringify(o))
  2. if u know the data structure, iterate the items and to obj.assign() on object / slice() the primitive values
*/