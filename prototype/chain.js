function Dog(name) {
  this.name = name
}

// here is how we use prototype to extend functionalities
Dog.prototype.bark = function () {
  console.log(this.name, 'bark') // btw, 'this' here refers to the dog instance
}

function SuperDog(name, lang) {
  Dog.call(this, name, lang)
  this.lang = lang
}

// to inherit dog's prototype
// when we call the functions,
// this "chain" goes all the way back until it reaches an object that has no prototype
SuperDog.prototype = Object.create(Dog.prototype);

SuperDog.prototype.speak = function () {
  console.log(this.name, 'i speak' + this.lang)
}

var dog = new Dog('gigi')
dog.bark()
// dog.speak() // it will crash

var superdog = new SuperDog('momo', 'french')
superdog.bark()
superdog.speak()