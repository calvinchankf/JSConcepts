const sleep = require("../sleep");

// version with cancel
const debounce = (fn, delay) => {
	// this block is a closure, it is executed when we declare the function const a
	let last = null;
	let lastArgs = null;

	// cancel the delayed execution
	// reset to the initial setup
	const reset = () => {
		console.log("❌cancellded");
		last = null;
		lastArgs = null;
	};

	// the below block is the fn (i) => { console.log('hello ', i) }
	const core = (...args) => {
		// (...args) <- Rest Parameters that we pass in from fn
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
		lastArgs = args;
		if (last != null) {
			clearTimeout(last);
		}
		last = setTimeout(() => {
			// the this is the context of the parent closure
			if (!lastArgs) return;
			fn.apply(this, lastArgs);
		}, delay);
	};
	core.reset = reset;
	return core;
};

const sayHello = debounce((i) => {
	console.log("hello", i, this);
}, 500);

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

	sayHello.reset();

	await sleep(1000);

	sayHello(6);
	await sleep(100);
	sayHello(7);
	await sleep(100);
	sayHello(8);
	await sleep(100);
	sayHello(9);
	await sleep(100);
	sayHello(10);
};
/*
    the terminal will
    - skip printing 5
    - print 10 after 1.8s
*/
f();
