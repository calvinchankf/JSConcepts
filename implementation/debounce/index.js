const debounce = (f, delay) => {
    let once = null
    /*
    this block is actually the block of
    
    (i) => {
        console.log('hello ', i)
    }
    
    so we can get this, arguments here within the scope 
    const context = this
    const args = arguments
    */
    return function () {
        const context = this
        const args = arguments
        if (once != null) {
            clearTimeout(once)
        }
        once = setTimeout(() => {
            f.apply(null, args)
        }, delay)
    }
}

const a = debounce((i) => {
    console.log('hello', i)
}, 1000)

a(1)
a(2)
a(3)
a(4)
a(5)
// the terminal will just print hello 5 after one second