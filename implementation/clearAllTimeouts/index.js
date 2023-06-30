// https://leetcode.com/discuss/interview-question/349283/Facebook-or-Phone-Screen-or-Implement-clearAllTimeout

/*
1st approach: 
(X) Leaks memory when timers are cleared via clearTimeout but clearAllTimeouts is not invoked.
(X) Does not work with strict mode.

-----------------------------------

const nativeSetTimeout = setTimeout;
let allTimeouts = [];

setTimeout = (callback, delay) => {
	const ref = nativeSetTimeout(callback, delay);
	allTimeouts.push(ref);
	return ref;
};

const creallAllTimeout = () => {
	allTimeouts.forEach((id) => clearTimeout(id));
	allTimeouts = [];
};

setTimeout(() => console.log("1"), 100);
setTimeout(() => console.log("2"), 100);
setTimeout(() => console.log("3"), 100);
setTimeout(() => console.log("4"), 100);
setTimeout(() => console.log("5"), 100);
creallAllTimeout();
setTimeout(() => console.log("6"), 100);

// terminal prints 6 only after 100ms
*/

/*
	2nd approach
	- put the 1st logic in a closure for security and avoid memory leak
	- strict mode
	- use global scope
	*/
	
let context = typeof window !== 'undefined' ? window : Function('return this')();
(function(global) {
	'use strict';
	const originalSetTimeout = global.setTimeout;
	const originalClearTimeout = global.clearTimeout;
	const hs = new Set();

	global.setTimeout = (fn, t) => {
		const tid = originalSetTimeout(() => {
			hs.delete(tid)
			fn();
		}, t);
		hs.add(tid)
		return tid;
	};

	global.clearTimeout = tid => {
		hs.delete(tid)
		originalClearTimeout(tid);
	};

	global.clearAllTimeouts = () => {
		for (let tid of hs) {
			originalClearTimeout(tid);
		}
	};
})(context)

setTimeout(() => console.log("1"), 100);
setTimeout(() => console.log("2"), 100);
setTimeout(() => console.log("3"), 100);
setTimeout(() => console.log("4"), 100);
setTimeout(() => console.log("5"), 100);
clearAllTimeouts();
setTimeout(() => console.log("6"), 100);