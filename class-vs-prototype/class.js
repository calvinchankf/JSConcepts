// declaration
class Vehicle {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  // instance method: need an instance, every instance has its own props
  getName() {
    return this.make + " " + this.model;
  }

  // static/class method: dont need to new an instance
  static getIntro() {
    return "intro";
  }
}

// much more OOP than protytype
let car = new Vehicle("Toyota", "Corolla", "Black");
console.log("Vehicle constructor name", car.constructor.name);
console.log(car);
// console.log(car.getIntro()); // crash because getIntro() is a class method
console.log(Vehicle.getIntro());

// get/setter
class Person {
  constructor(name) {
    this.name = name;
  }

  // be careful: please use underscore _ , or it calls itself, the getter, recursively
  get name() {
    console.log(`get name ${this._name}`)
    return this._name;
  }

  // be careful: please use underscore _ , or it calls itself, the setter, recursively
  set name(value) {
    console.log(`set name ${value}`)
    this._name = value;
  }
}

let calvin = new Person("calvin")
calvin.name = 'Calvin Chan'
console.log(calvin.name)

// subclass
class Car extends Vehicle {
  // override
  getName() {
    return this.make + " " + this.model + " in child class.";
  }
}

let car3 = new Car("Honda", "Accord", "Purple");
console.log("car3 constructor name", car3.constructor.name);
console.log(car3.getName()); // "Honda Accord in child class."

class Bus extends Vehicle {
  // 'super' the method
  getName() {
    return super.getName() + " <- super !!!"
  }
}
let car4 = new Bus("Honda", "Accord", "Purple");
console.log(car4.getName()); // Honda Accord <- super !!!