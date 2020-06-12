const sleep = require("../sleep");

// simple version
// at most execute once for every X milliseconds
const throttle = (fn, ms) => {
	const ht = {};
	return (...args) => {
		const key = args[0];
		const timestamp = args[1];
		if (key in ht) {
			let left = timestamp - ms;
			if (ht[key] > left) {
				return;
			}
		}
		fn.apply(this, args);
		ht[key] = timestamp;
	};
};

const sayHello = throttle((key, timestamp) => {
	console.log("hello", key, timestamp);
}, 5);

const f = async () => {
	sayHello("a", 1); // print
	sayHello("a", 2);
	sayHello("a", 3);
	sayHello("a", 4);
	sayHello("a", 5);
	sayHello("a", 6); // print
	sayHello("a", 7);
	sayHello("a", 8);
	sayHello("a", 9);
	sayHello("a", 10);
	sayHello("a", 11); // print
};
// the terminal will just print hello 5 after one second
f();
