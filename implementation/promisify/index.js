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
function do_something(a, b, callback) {
    if (a < 0 || b < 0) {
      const err = Error('a and b must be positive');
      callback(err);
    } else {
      callback(a + b);
    }
}

const promisified_do_something = promisify(do_something)

promisified_do_something(100, 99).then((res) => console.log(res))