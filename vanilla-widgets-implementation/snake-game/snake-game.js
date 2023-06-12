const $gameBoard = document.getElementById('snake-game-board');

const snake = new Map()

let curDir = 0
let food = null // (x, y)

// data
const R = 20
const C = 20

const dirs = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1]
}

// init
// 0: empty; 1: snake; 2: food
const initEmptyBoard = () => {
    const res = []
    for (let i = 0; i < R; i++) {
        res.push(Array(C).fill(0))
    }
    return res
}

const createSnake = () => {
    snake.clear()
    snake.set(`${11},${10}`, [11, 10])
    snake.set(`${10},${10}`, [10, 10])
}

const genNewFood = () => {
    const unoccupied = new Map()
    let cnt = 0
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            const key = `${i},${j}`
            if (snake.has(key)) {
                continue
            }
            unoccupied.set(cnt, [i, j])
            cnt += 1
        }
    }
    const r = Math.floor(Math.random() * unoccupied.size)
    food = unoccupied.get(r)
}

const checkSnakeEat = (keys) => {
    const head_key = keys[keys.length-1]
    const [i, j] = snake.get(head_key)
    
    const [di, dj] = dirs[curDir]
    const _i = i+di
    const _j = j+dj

    return _i === food[0] && _j === food[1]
}

const moveSnake = () => {
    const keys = [...snake.keys()]

    const will_grow = checkSnakeEat(keys)

    if (will_grow) {    
        genNewFood()
    } else {
        const tail = keys[0]
        snake.delete(tail)
    }

    const head_key = keys[keys.length-1]
    const [i, j] = snake.get(head_key)
    
    const [di, dj] = dirs[curDir]
    const _i = i+di
    const _j = j+dj
    const _head_key = `${_i},${_j}` 

    if (_i < 0 || _i > R-1 || _j < 0 || _j > C-1 || snake.has(_head_key)) {
        alert('You Lost')
        start()
    } else {
        snake.set(_head_key, [_i, _j])
    }
}

const renderBoard = () => {

    $gameBoard.innerHTML = ''

    for (let i = 0; i < R; i++) {
        const $row = document.createElement("div");
        $row.setAttribute("class", "row");
        
        for (let j = 0; j < C; j++) {
            const $cell = document.createElement("div");
            let cellCSS = 'cell'

            const key = `${i},${j}`
            if (snake.has(key)) {
                cellCSS += ' snake'
            }

            if (i === food[0] && j === food[1]) {
                cellCSS += ' food'
            }

            $cell.setAttribute("class", cellCSS);
            $cell.setAttribute("data-index", `${i},${j}`)
            $row.appendChild($cell)
        }
        $gameBoard.appendChild($row)
    }
}

const onMove = e => {
    const m = {
        'ArrowUp': 0,
        'ArrowRight': 1,
        'ArrowDown': 2,
        'ArrowLeft': 3
    }
    const d = m[e.key]
    if (Math.abs(d - curDir) === 2) {
        return
    }
    curDir = d
}

// TODO: start radomely
const start = () => {
    initEmptyBoard()
    createSnake()
    genNewFood()
    renderBoard()
}
start()

setInterval(() => {
    moveSnake()
    renderBoard()
}, 300)


document.addEventListener('keydown', onMove)