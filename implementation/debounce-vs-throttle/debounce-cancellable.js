function debounce(fn, t) {
    let timeout = null

    function debounced(...args) {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this, args)
        }, t)
    }

    // cancel the debounced function immediately without calling the function
    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }

    // canel the debounced function but execute the function immediately
    debounced.flush = function(...args) {
        clearTimeout(timeout)
        fn.apply(this, args)
    }

    return debounced
}