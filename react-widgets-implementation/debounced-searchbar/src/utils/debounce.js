function debounce(fn, t) {
    let pending_timeout = null
    return function(...args) {
        clearTimeout(pending_timeout)
        pending_timeout = setTimeout(async () => {
            fn(...args)
        }, t)
    }
};

export default debounce; 