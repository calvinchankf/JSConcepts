const sleep = require("../sleep");

/*
    a version with maxWait
*/
const debounce = (fn, delay, options) => {
	// this block is a closure, it is executed when we declare the function const a
	let lastTimeout = null;

	// maxWait related
	let maxWait = options.maxWait || null;
	let lastArgs = undefined;
	let firstCalled = false;
	let fnInvoked = false;
	// the below block is the fn (i) => { console.log('hello ', i) }
	return (...args) => {
		// (...args) <- Rest Parameters that we pass in from fn
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
		lastArgs = args;
		if (lastTimeout != null) {
			clearTimeout(lastTimeout);
		}
		if (firstCalled === false && maxWait !== null) {
			firstCalled = true;
			setTimeout(() => {
				fn.apply(this, lastArgs);
				// clear
				clearTimeout(lastTimeout);
				fnInvoked = true;
			}, maxWait);
		}
		lastTimeout = setTimeout(() => {
			if (fnInvoked) return;
			if (!lastArgs) return;
			// the this is the context of the parent closure
			fn.apply(this, lastArgs);
		}, delay);
	};
};

const sayHello = debounce(
    (i) => {
		console.log("hello", i);
    },
    200,
    { maxWait: 399 }
);

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
// the terminal will just print hello 4 after 399ms
f();
