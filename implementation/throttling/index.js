const sleep = require("../sleep");
/*
 * Implement a rate-limiter.
 *
 * Your rate-limiter should create a rate-limited function that calls
 * `func` each time it is invoked, up to a certain number of times
 * (as specified by `limit`), within `interval` milliseconds.
 *
 * Your implementation only needs to accept three arguments,
 * `func`, `interval` and `limit`.
 */

function rateLimit(fn, interval, limit = 1) {
	let count = 0;
	let isConsumed = false;
	return (...args) => {
		if (isConsumed) {
			return;
		}
		fn(...args);
		count += 1;
		if (count === limit) {
			isConsumed = true;
			setTimeout(() => {
				isConsumed = false;
				count = 0;
			}, interval);
		}
	};
}

function greet(country, year) {
	console.log(`Welcome to ${country} in ${year}!`);
}

const f = async () => {
	// rateLimitedGreet can only invoke greet 3 times in 1000 ms
	const rateLimitedGreet = rateLimit(greet, 1000, 3);
	rateLimitedGreet("Taiwan", 2010); // Prints "Welcome to Taiwan 1!"
	rateLimitedGreet("Vietnam", 2012); // Prints "Welcome to Vietnam 2!"
	rateLimitedGreet("India", 2014); // Prints "Welcome to India 3!"
	rateLimitedGreet("Singapore", 2016); // Nothing printed
	await sleep(1000);
	rateLimitedGreet("Hong Kong", 2019); // Prints "Welcome to Hong Kong 5!"
	rateLimitedGreet("Malaysia", 2020); // Prints "Welcome to Malaysia 6!"
};
f();

/*
    time-based
*/
var throttle = function(fn, t) {
    let nextTime = 0
    let curTimeout = null
    return (...args) => {
        const delay = Math.max(0, nextTime - Date.now())
        clearTimeout(curTimeout) // meaning that the calls in-between are cancelled
        curTimeout = setTimeout(() => {
            fn(...args)
            nextTime = Date.now() + t
        }, delay)
    }
};