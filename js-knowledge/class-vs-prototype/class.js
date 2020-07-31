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

// subclass
class Bus extends Vehicle {
	constructor(make, model, color, routeNo) {
		super(make, model, color);
		this.routeNo = routeNo;
	}
	// override
	getName() {
		// super.getName() <- to super the instance method
		return `Bus ${this.routeNo} is ${this.make} ${this.model}`;
	}
}

let bus = new Bus("Honda", "Accord", "Purple", "A21");
console.log("bus constructor name", bus.constructor.name);
console.log(bus.getName()); // "Honda Accord in child class."

/*
    -------------------------------------
*/

// get/setter
class Person {
	constructor(name) {
		this.name = name;
	}

	// be careful: please use underscore _ , or it calls itself, the getter, recursively
	get name() {
		console.log(`get name ${this._name}`);
		return this._name;
	}

	// be careful: please use underscore _ , or it calls itself, the setter, recursively
	set name(value) {
		console.log(`set name ${value}`);
		this._name = value;
	}
}

let calvin = new Person("calvin");
calvin.name = "Calvin Chan";
console.log(calvin.name);
