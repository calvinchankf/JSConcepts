/*
  as mentioned, a variable is always pass by value unless it is a reference(object/array)
*/

// number
let a = 1
function add(n) {
  n++
  console.log(n)
}
add(a)
console.log(a)

// string
let b = 'abc'
function addChar(s) {
  s += "d"
  console.log(s)
}
addChar(b)
console.log(b)

// boolean
let c = true
function invert(bool) {
  bool = !bool
  console.log(bool)
}
invert(c)
console.log(c)