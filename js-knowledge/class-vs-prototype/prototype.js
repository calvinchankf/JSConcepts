// declaration
function Vehicle(make, model, color) {
  this.make = make;
  this.model = model;
  this.color = color;
  this.getName = function () {
    return this.make + " " + this.model;
  }
}

// problem 1
let car = new Vehicle("Toyota", "Corolla", "Black");
car.year = 2012
let car2 = new Vehicle("Benz", "ggsget", "White");
console.log(car); // car has 'year'
console.log(car2); // but car2 instance doesn't have 'year'

// problem 2
// all instances share the same values of the new variable. in this case, all instances share 2 as 'month'
Vehicle.prototype.month = 2
console.log(car) // cant see month in the car object
console.log(car2) // cant see month in the car2 object
console.log(car.month); // 2012
console.log(car2.month); // 2012 WTF

// That's why we want class, make js more OOP