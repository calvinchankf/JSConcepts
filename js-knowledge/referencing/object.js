const a = {
  '1': 1,
  '2': 2,
  '3': 3,
}

function add(o) {
  o['4'] = 4
}

function remove(o) {
  delete o['4']
}

function edit(o) {
  o['3'] = 1000
}

function editBack(o) {
  o['3'] = 3
}

add(a)
console.log(a) // { '1': 1, '2': 2, '3': 3, '4': 4 }

remove(a)
console.log(a) // { '1': 1, '2': 2, '3': 3 }

edit(a)
console.log(a) // { '1': 1, '2': 2, '3': 1000 }

const b = a
editBack(b)
console.log(a) // { '1': 1, '2': 2, '3': 3 }
console.log(b) // { '1': 1, '2': 2, '3': 3 }

/*
  copy { key: primitive value }
  For primitive types, JS doesn't use pointers but instead copy the value and assign to the new variables
*/
const c = Object.assign({}, a)
edit(c)
console.log(a) // { '1': 1, '2': 2, '3': 3 }
console.log(c) // { '1': 1, '2': 2, '3': 1000 }

/*
  copy { key: reference }
  However, as mentioned, for all non-primitive types, js copy/pass by reference.
  So when we change mutate the values inside the reference, both variables change
*/
const o1 = {
  o: { name: 'calvin', height: 170 },
  a: [1, 2, 3],
}
const o2 = Object.assign({}, o1)
o2.o.name = 'calson'
o2.a.push(4)
console.log(o1) // { o: { name: 'calson', height: 170 }, a: [ 1, 2, 3, 4 ] }
console.log(o2) // { o: { name: 'calson', height: 170 }, a: [ 1, 2, 3, 4 ] }

/*
  So how should we do deep copy?
  1. obj = JSON.parse(JSON.stringify(o))
  2. if u know the data structure, iterate the items and to obj.assign() on object / slice() the primitive values
*/