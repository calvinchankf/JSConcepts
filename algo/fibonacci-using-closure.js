/*
    // Implement Fibonacci using the below functions

    function memoize(fn) {
        // todo
    }

    function fib(n) {
        // fibonacci
        return n;
    }

    fib(n);

    let memoizedFib = memoize(fib);
    memoizedFib(n);
*/
function memoize(fn) {
    const _this = this
    const cache = {}
    return function(...args) {
        const key = args.join(',')
        if (key in cache) {
            return cache[key]
        }
        cache[key] = fn.apply(_this, args);
        return cache[key];
    }
}

function fib(n) {
    if (n <= 0) {
        return 0
    }
    if (n == 1) {
        return 1
    }
    // return fib(n-1) + fib(n-2) ???
    return memoizedFib(n-1) + memoizedFib(n-2)
}

// let start
// start = Date.now();
// console.log(fib(40));
// console.log("regular: " + (Date.now() - start))

start = Date.now();
let memoizedFib = memoize(fib);
console.log(memoizedFib(40));
console.log("memoized: " + (Date.now() - start))

/*
    alternative
*/
const fibonacci = (function () {
    const cache = {};
    function f(n) {
        if (n <= 0) {
            return 0
        }
        if (n == 1) {
            return 1
        }
        if (n in cache) {
            return cache[n]
        }
        cache[n] = f(n - 1) + f(n - 2)
        return cache[n]
    }
    return f;
}());
start = Date.now();
console.log(fibonacci(40));
console.log("alternative: " + (Date.now() - start))