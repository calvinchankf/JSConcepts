function Dog(name) {
  this.name = name
}

// here is how we use prototype to extend functionalities
Dog.prototype.bark = function () {
  console.log(this.name, 'bark') // btw, 'this' here refers to the dog instance
}

var dog = new Dog('gg')
dog.bark()