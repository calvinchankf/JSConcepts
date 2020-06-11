const sleep = require("../sleep");

// simple version
const debounce = (fn, delay) => {
	// this block is a closure, it is executed when we declare the function const a
	let once = null;
	let lastArgs = null;
	// the below block is the fn (i) => { console.log('hello ', i) }
	return (...args) => {
		// (...args) <- Rest Parameters that we pass in from fn
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
		lastArgs = args;
		if (once != null) {
			clearTimeout(once);
		}
		once = setTimeout(() => {
			// the this is the context of the parent closure
			if (!lastArgs) return;
			fn.apply(this, lastArgs);
		}, delay);
	};
};

const sayHello = debounce((i) => {
	console.log("hello", i, this);
}, 1000);

const f = async () => {
	sayHello(1);
	await sleep(100);
	sayHello(2);
	await sleep(100);
	sayHello(3);
	await sleep(100);
	sayHello(4);
	await sleep(100);
	sayHello(5);
};
// the terminal will just print hello 5 after one second
f();
