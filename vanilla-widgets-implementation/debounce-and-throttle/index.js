function debounce(fn, delay=100) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

function throttle(fn, delay=100) {
    let timer = null
    let lastArgs = null
    return (...args) => {
        lastArgs = args
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fn(...lastArgs)
            }, delay)
        }
    }
}

function search(source) {
    // fetch search results for input
    console.log(`searching...via ${source}`)
}

const debouncedSearch = debounce(search, 1000)
const throttledSearch = debounce(search, 1000)

// document.addEventListener('keydown', search);
// Call search(event) on every keydown

// keydown     | |      |
// time     ----------------
// search      | |      |

const onMove = e => {
    const m = {
        'ArrowUp': 0,
        'ArrowRight': 1,
        'ArrowDown': 2,
        'ArrowLeft': 3
    }
    if (e.key in m === false) {
        return
    }
    if (m[e.key] === 0) {
        debouncedSearch('debounce')
    } else if (m[e.key] === 2) {
        throttledSearch('trottle')
    }
}
document.addEventListener('keydown', onMove);
// Call search only when it's been 100ms since the last keydown

// keydown    | |      |
// time     ----------------
// search           |      | 
//              |100|  |100|

// document.addEventListener('keydown', throttle(search, 1000));
// Call search at most once per 100ms

// keydown     | |     |  |
// time     -----------------
// search          |       | 
//             |100|   |100|


// keydown     1234567 8  9
// time     -------------------
// search          1    6     9 (i.e. corresponding 1, 6 and 9)
//             |100||100| |100|