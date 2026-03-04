function throttlePromise(cb, delay = 1000) {
    let expiredAt = 0
    let timeoutID = null
  
    // Track the promise handlers for the currently scheduled execution
    let pending = null // { resolve, reject }
  
    return function (...args) {
      const remainingTime = Math.max(0, expiredAt - Date.now())
  
      // If there is a previously scheduled call, cancel it and reject its promise
      if (timeoutID !== null) {
        clearTimeout(timeoutID)
        timeoutID = null
        if (pending) {
          pending.reject(new Error("Throttled call was superseded by a newer call"))
          pending = null
        }
      }
  
      return new Promise((resolve, reject) => {
        pending = { resolve, reject }
  
        timeoutID = setTimeout(async () => {
          timeoutID = null
  
          expiredAt = Date.now() + delay
  
          try {
            const result = await cb(...args)
            // resolve the promise for the call that actually ran
            pending?.resolve(result)
          } catch (err) {
            pending?.reject(err)
          } finally {
            pending = null
          }
        }, remainingTime)
      })
    }
  }