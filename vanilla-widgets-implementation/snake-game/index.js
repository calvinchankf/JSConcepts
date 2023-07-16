const R = 20
const C = 20

const snake = new Set()
let food = null

const newSnake = () => {
    snake.clear()
    snake.add(`${11},${10}`)
    snake.add(`${10},${10}`)
}

let snake_dir = 0 // 0: up, 1: right, 2: bottom, 3: left
const dirs = [
    [-1,0], [0,1], [1,0], [0,-1]
]

// let board = [] // we don't need a board 2D array actually, the snake and the food are enough
// const initBoard = () => {
//     const res = []
//     for (let i = 0; i < R; i++) {
//         res.push(Array(C).fill(0))
//     }
//     return res
// }

const placeFood = () => {
    let emptyCells = []
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            const key = `${i},${j}`
            if (snake.has(key)) {
                continue
            }
            emptyCells.push([i, j])
        }
    }
    if (emptyCells.length == 0) {
        return false
    }

    const r = Math.floor(Math.random() * emptyCells.length)
    const [food_i, food_j] = emptyCells[r]
    food = `${food_i},${food_j}`
    return true
}

const checkShouldGrow = () => {
    const keys = [...snake.keys()]
    const head = keys[keys.length-1]
    let [head_i, head_j] = head.split(',')
    head_i = Number(head_i)
    head_j = Number(head_j)
    const [di, dj] = dirs[snake_dir]
    const i = head_i + di
    const j = head_j + dj
    return food === `${i},${j}`
}

const checkWillCollide = (i, j) => {
    if (i < 0 || i == R || j < 0 || j == C) {
        return true
    }
    const key = `${i},${j}`
    return snake.has(key)
}

const moveSnake = () => {
    const keys = [...snake.keys()]

    // check will grow
    const willGrow = checkShouldGrow()
    if (!willGrow) {
        const tail = keys[0]
        snake.delete(tail)
    }
    // grow
    const head = keys[keys.length-1]
    let [head_i, head_j] = head.split(',')
    head_i = Number(head_i)
    head_j = Number(head_j)
    const [di, dj] = dirs[snake_dir]
    const i = head_i + di
    const j = head_j + dj
    
    // check collision
    if (checkWillCollide(i, j)) {
        return false
    }
    snake.add(`${i},${j}`)

    // place the new food if needed
    if (willGrow) {
        placeFood()
    }

    return true
}

const renderBoard = () => {
    const $board = document.getElementById('board')
    $board.innerHTML = ''
    for (let i = 0; i < R; i++) {
        const $row = document.createElement('div')
        $row.setAttribute("class", "row")
        for (let j = 0; j < C; j++) {
            const $cell = document.createElement("div")
            let cellCSS = 'cell'

            const key = `${i},${j}`
            if (snake.has(key)) {
                cellCSS += ' snake'
            } else if (food === `${i},${j}`) {
                cellCSS += ' food'
            }
            $cell.setAttribute("class", cellCSS);
            $row.appendChild($cell)
        }
        $board.appendChild($row)
    }
}

newSnake()
// board = initBoard()
placeFood()
renderBoard()

// interaction
setInterval(() => {
    const safeToMove = moveSnake()
    if (!safeToMove) {
        alert('You LOST!!!')
        newSnake()
        // board = initBoard()
        placeFood()
    }
    renderBoard()
}, 500)

// keyboard 
document.addEventListener('keydown', e => {
    const m = {
        'ArrowUp': 0,
        'ArrowRight': 1,
        'ArrowDown': 2,
        'ArrowLeft': 3,
    }
    if (e.key in m) {
        snake_dir = m[e.key]
    }
})