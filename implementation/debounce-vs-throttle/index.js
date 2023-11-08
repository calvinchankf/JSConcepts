const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")

const updateDebounceText = debounce(txt => {
    debounceText.textContent = txt
}, 500)
const updateThrottleText = throttle(txt => {
    throttleText.textContent = txt
}, 500)

input.addEventListener("input", e => {
    defaultText.textContent = e.target.value
    updateDebounceText(e.target.value)
    updateThrottleText(e.target.value)
})

function debounce(cb, delay = 1000) {
    let timeout

    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

function throttle(cb, delay = 1000) {
    let expriedAt = 0
    let timeoutID = null
	return function (...args) {
        const remainingTime = Math.max(0, expriedAt - Date.now())
        clearTimeout(timeoutID)
		timeoutID = setTimeout(() => {
            expriedAt = Date.now() + delay
            cb(...args)
        }, remainingTime)
	}
}