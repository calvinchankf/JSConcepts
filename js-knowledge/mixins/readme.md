# What is Mixins

Mixins are a form of object **composition**, where component features get mixed into a composite object so that properties of each mixin become properties of the composite object.

```js
class Vegetables {
	veggies() {
		return "Choose Veggies";
	}
}
class Meat {
	meat() {
		return "Choose Meat";
	}
}

class Sauces {
	choosingSauces() {
		return "Choose Sauces";
	}
}

function combineClasses(dest, ...src) {
	for (let _dest of src) {
		for (var key of Object.getOwnPropertyNames(_dest.prototype)) {
			dest.prototype[key] = _dest.prototype[key];
		}
	}
}

class Burger {}

//adding a new class
class Cheese {
	addingCheese() {
		return "Add Cheese";
	}
}

combineClasses(Burger, Vegetables, Meat, Sauces, Cheese);

var burger = new Burger();
console.log(burger.veggies());
console.log(burger.meat());
console.log(burger.choosingSauces());
console.log(burger.addingCheese());
```
