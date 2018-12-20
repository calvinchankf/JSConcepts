/*
Hoisting in javascript is behavior in which
all the declarations are automatically moved on top of the current scope,
so we can use a variable or a function before its declaration

e.g. we can call a() and b() before a() and b() are declared
*/
a()
b()

function a() {
  console.log('a')
}

function b() {
  console.log('b')
}

/*
Even for prototype, we can new an instance before its declaration e.g.
*/
let p = new Person("Calvin", 28)

function Person(name, age) {
  this.name = name;
  this.age = age;
}
console.log(p);

/*
However, in a class, therefore we can't new an instance before its declaration e.g.
*/
let car = new Car("Toytota", "Black")
class Car {
  constructor(brand, color) {
    this.brand = brand;
    this.color = color;
  }
}
console.log(car);