const sleep = require("../sleep");

/*
 * Implement a Simple rate-limiter.
 *
 * Your rate-limiter should create a rate-limited function that calls
 * `func` each time it is invoked, at most once within x milliseconds
 *
 * Your implementation only needs to accept three arguments,
 * `func`, `interval` and `limit`.
 */

function rateLimit(fn, interval) {
	let isCalled = false;
	return (...args) => {
		if (!isCalled) {
			fn(...args);
			isCalled = true;
			setTimeout(() => {
				isCalled = false;
			}, interval);
		}
	};
}

function greet(country) {
	console.log(`Welcome to ${country}!`);
}

const f = async () => {
	// rateLimitedGreet can only invoke greet 3 times in 1000 ms
	const rateLimitedGreet = rateLimit(greet, 1000, 3);
	rateLimitedGreet("Taiwan"); // Prints "Welcome to Taiwan 1!"
	rateLimitedGreet("Vietnam"); // Nothing printed
	rateLimitedGreet("India"); // Nothing printed
	rateLimitedGreet("Singapore"); // Nothing printed
	await sleep(1000);
	rateLimitedGreet("Hong Kong"); // Prints "Welcome to Hong Kong 5!"
};
f();
