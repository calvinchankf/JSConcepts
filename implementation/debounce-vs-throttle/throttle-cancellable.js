function throttle(cb, delay = 1000) {
    let expiredAt = 0
    let timeoutID = null

    function throttled(...args) {

        clearTimeout(timeoutID)
        
        const remainingTime = Math.max(0, expiredAt - Date.now())
        timeoutID = setTimeout(() => {
            expiredAt = Date.now() + delay
            cb(...args)
        }, remainingTime)
    }

    throttled.cancel = () => {
        clearTimeout(timeoutID)
        timeoutID = null
        expiredAt = 0
    }

    return throttled
}