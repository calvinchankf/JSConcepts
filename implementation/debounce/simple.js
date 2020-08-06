const sleep = require("../sleep");

// simple version
const debounce = (fn, delay) => {
	// this block is a closure, it is executed when we declare the function const a
	let last = null;
	let lastArgs = null;
	// the below block is the fn (i) => { console.log('hello ', i) }
	return (...args) => {
		// (...args) <- Rest Parameters that we pass in from fn
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
		lastArgs = args;
		if (last != null) {
			clearTimeout(last);
		}
		last = setTimeout(() => {
			// the this is the context of the parent closure
			if (!lastArgs) return; // ?
			fn(...lastArgs);
		}, delay);
	};
};

function greet(country, year) {
	console.log(`Welcome to ${country} in ${year}`);
}

const debouncedGreet = debounce(greet, 1000);

const f = async () => {
	debouncedGreet("Taiwan", 2010);
	await sleep(100);
	debouncedGreet("Vietnam", 2012);
	await sleep(100);
	debouncedGreet("India", 2014);
	await sleep(100);
	debouncedGreet("Singapore", 2016);
	await sleep(100);
	debouncedGreet("Hong Kong", 2019);
};
// the terminal will just print "Welcome to Singapore in 2019!"
f();
