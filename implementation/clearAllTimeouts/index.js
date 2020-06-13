// https://leetcode.com/discuss/interview-question/349283/Facebook-or-Phone-Screen-or-Implement-clearAllTimeout
const nativeSetTimeout = setTimeout;
let allTimeouts = [];

setTimeout = (callback, delay) => {
	const id = nativeSetTimeout(callback, delay);
	allTimeouts.push(id);
	return id;
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
