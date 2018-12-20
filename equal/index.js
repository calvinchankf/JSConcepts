/*
In js, coercion means js converts a value from one type to another type.
Therefore when we compare the values, we should be careful.
*/

const a = 28
const b = "28"

console.log(a == b) // true: == checks if the values are the same without considering the type
console.log(a === b) // false: === checks if the values are the same AND if they are in the same type

const c = 1
const d = true
console.log(c == d) // true: js converts 1 to true...=_=
console.log(c === d) // false

const e = 1110
const f = false
console.log(e == f) // true: js converts 0 to false; for any other numbers, it also converts to false
console.log(e === f) // false