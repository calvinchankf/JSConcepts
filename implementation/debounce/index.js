const debounce = (fn, delay) => {
	// this block is a closure, it is executed when we declare the function const a
	let once = null;
	/*
    the below block is the fn
    (i) => {
        console.log('hello ', i)
    }
    */
	return function () {
		// arguments are the params that we pass in fn
		const args = arguments;
		if (once != null) {
			clearTimeout(once);
		}
		once = setTimeout(() => {
			// the this is the context of the parent closure
			fn.apply(this, args);
		}, delay);
	};
};

const a = debounce((i) => {
	console.log("hello", i, this);
}, 1000);

a(1);
// a(2);
// a(3);
// a(4);
// a(5);
// the terminal will just print hello 5 after one second
