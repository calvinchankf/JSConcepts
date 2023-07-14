const promisify = fn => {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            
            const callback = (value, error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(value)
                }
            }
            
            fn(...args, callback)
        })
    }
};

// test
function do_something(...args) {
    const callback = args.pop()
    if (args.filter(x => typeof x === 'number').length !== args.length) {
        const err = new Error('every input must be a number');
        callback(null, err);
    } else {
        const total = args.reduce((acc, cur) => acc + cur, 0) // my do_something is to sum all inputs
        callback(total);
    }
}

const promisified_do_something = promisify(do_something)

promisified_do_something(100, 99).then((res) => console.log(res))

promisified_do_something(1,10,100,1000,10000).then((res) => console.log(res))

promisified_do_something('a',10,100,1000,10000).then((res) => console.log(res))