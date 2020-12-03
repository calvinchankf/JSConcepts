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

console.log("-----")

const hero1 = {
    name: 'Batman'
};
const hero2 = {
    name: 'Batman'
};

console.log(hero1 == hero1) // true
console.log(hero1 == hero2) // false

console.log(hero1 === hero1) // true
console.log(hero1 === hero2) // false

console.log(Object.is(hero1, hero1)) // true
console.log(Object.is(hero1, hero2)) // false

console.log("-----")

class Car {
    constructor(make, model) {
        this.make = make
        this.model = model
    }
}
const tesla1 = new Car('tesla', 'model3')
const tesla2 = new Car('tesla', 'modelx')

console.log(tesla1 == tesla1) // true
console.log(tesla2 == tesla2) // true

console.log(tesla1 == tesla2) // false
console.log(tesla1 === tesla2) // false

console.log(Object.is(tesla1, tesla1)) // true
console.log(Object.is(tesla1, tesla2)) // false