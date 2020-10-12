const sleep = require("../sleep");

// simple version
const debounce = (fn, delay) => {
	// this block is a closure, it is executed when we declare the function const a
    let lastTimeout = null;
    let lastResolve = null

    // the below block is the fn (i) => { console.log('hello ', i) }
	return (...args) => {
		// (...args) <- Rest Parameters that we pass in from fn
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
		if (lastTimeout != null) {
			clearTimeout(lastTimeout);
        }
		lastTimeout = setTimeout(() => {
            const result = fn(...args)
            if (lastResolve != null) {
                lastResolve(result)
            }
        }, delay);
        
        return new Promise((resolve, _) => lastResolve = resolve)
	};
};

const debouncedGreet = debounce((country, year) => {
    console.log(`Welcome to ${country} in ${year}`);
}, 1000);

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
