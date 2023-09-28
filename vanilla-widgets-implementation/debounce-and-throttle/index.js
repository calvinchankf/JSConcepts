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
    let restTime = 0
    let curTimeout = null
    return (...args) => {
        const diff = Math.max(0, restTime - Date.now())
        clearTimeout(curTimeout) // meaning that the calls in-between are cancelled
        curTimeout = setTimeout(() => {
            cb(...args)
            restTime = Date.now() + delay
        }, diff)
    }
}