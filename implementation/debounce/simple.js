const sleep = require("../sleep");

// simple version
function debounce(func, delay=100) {
    let timeout_id = null
    return function() {
        if (timeout_id) {
            clearTimeout(timeout_id)
        }
        timeout_id = setTimeout(func, delay);
    }
}

// simple with function args
function debounce(func, delay=100) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args)
        }, delay);
    }
}

const f = (country, year) => {
    console.log(`Welcome to ${country} in ${year}`);
}
const debouncedGreet = debounce(f, 1000);

const test = async () => {
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
// the terminal will just print "Welcome to Singapore in 2019!" after one second
test();

/*
    The problem of the function above is:
    - the UI will not be updated until the user has completely stopped scrolling **
    
    because, you know, we are keeping removing the previos timeout, 
    so the callback will never be called

    So, we should consider do throttling for UI 
*/
function throttle(func, delay=100) {
    let timer = null
    let lastArgs = null
    return (...args) => {
        lastArgs = args;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func(...lastArgs);
            }, delay);
        }
    }
}
  