var debounce = function(fn, t) {
    let timeout = null
    return function(...args) {
        return new Promise((resolve) => {
            if (timeout != null) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(() => {
                const result = fn.apply(this, args)
                resolve(result)
            }, t)
        })
    }
};