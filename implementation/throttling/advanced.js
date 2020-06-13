// advanced version
// at most execute X for every Y milliseconds
const throttle = (fn, n, ms) => {
	const ht = {};
	return (...args) => {
		const key = args[0];
		const timestamp = args[1];
		if (key in ht) {
			let left = timestamp - ms;
			const idx = upperBsearch(ht[key], left);
			ht[key] = ht[key].slice(idx); // O( N - idx)
			if (ht[key].length >= n) {
				return;
			}
		}
		fn.apply(this, args);
		if (key in ht) {
			ht[key].push(timestamp);
		} else {
			ht[key] = [timestamp];
		}
	};
};

// O(logN)
const upperBsearch = (nums, target) => {
	let left = 0;
	let right = nums.length;
	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (target >= nums[mid]) {
			left = mid + 1;
		} else {
			right = mid;
		}
	}
	return left;
};

// 2 times per 5 ms
const sayHello = throttle(
	(key, timestamp) => {
		console.log("hello", key, timestamp);
	},
	2,
	5
);

const f = async () => {
	sayHello("a", 1); // print
	sayHello("a", 2); // print
	sayHello("a", 3);
	sayHello("a", 4);
	sayHello("a", 5);
	sayHello("a", 6); // print
	sayHello("a", 7); // print
	sayHello("a", 8);
	sayHello("a", 9);
	sayHello("a", 10);
	sayHello("a", 11); // print
};
// the terminal will just print hello 5 after one second
f();
