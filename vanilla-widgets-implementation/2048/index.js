const $gameBoard = document.getElementById('game-board');

const N = 4
let game = null

const initEmptyBoard = () => {
    const res = []
    for (let i = 0; i < N; i++) {
        res.push(Array(N).fill(0))
    }
    return res
}

const renderBoard = () => {
    
    $gameBoard.innerHTML = ''
    
    for (let i = 0; i < N; i++) {
        const $row = document.createElement("div");
        $row.setAttribute("class", "row")

        for (let j = 0; j < N; j++) {
            const $cell = document.createElement("div")
            $cell.innerHTML = game[i][j] > 0 ? game[i][j] : ''

            let cellCSS = 'cell'

            if (game[i][j] > 0) {
                cellCSS += ` colored-${game[i][j]}`
            }

            $cell.setAttribute("class", cellCSS)
            $row.appendChild($cell)
        }
        $gameBoard.appendChild($row)
    }
}

//TODO: refactor
const shouldMoveBlocks = direction => {
    const newGame = initEmptyBoard()
    switch (direction) {
        case 0:
            for (let j = 0; j < N; j++) {
                const A = []
                for (let i = 0; i < N; i++) {
                    A.push(game[i][j])
                }
                const cells = mergeCells(A)
                for (let i = 0; i < N; i++) {
                    newGame[i][j] = cells.shift()
                }
            }
            break
        case 1:
            for (let i = 0; i < N; i++) {
                const A = []
                for (let j = N-1; j >= 0; j--) {
                    A.push(game[i][j])
                }
                const cells = mergeCells(A)
                for (let j = N-1; j >= 0; j--) {
                    newGame[i][j] = cells.shift()
                }
            }
            break
        case 2:
            for (let j = 0; j < N; j++) {
                const A = []
                for (let i = N-1; i >= 0; i--) {
                    A.push(game[i][j])
                }
                const cells = mergeCells(A)
                for (let i = N-1; i >= 0; i--) {
                    newGame[i][j] = cells.shift()
                }
            }
            break
        case 3:
            for (let i = 0; i < N; i++) {
                const A = []
                for (let j = 0; j < N; j++) {
                    A.push(game[i][j])
                }
                const cells = mergeCells(A)
                for (let j = 0; j < N; j++) {
                    newGame[i][j] = cells.shift()
                }
            }
            break
    }
    // check if need to re-render for the next operation
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (game[i][j] !== newGame[i][j]) {
                game = newGame
                return true
            }
        }
    }
    return false
}

const mergeCells = (A, dir) => {
    let stack = []
    for (let i = 0; i < A.length; i++) {
        const x = A[i]
        if (x === 0) { continue}
        if (stack.length > 0 
            && stack[stack.length-1] === x
            && stack[stack.length-1] < 2048
        ) {
            stack[stack.length-1] = x*2
        } else {
            stack.push(x)
        }
    }
    if (stack.length < N) {
        const toAdd = N - stack.length
        stack = [...stack, ...Array(toAdd).fill(0)]
    }
    return stack
}

const checkWin = () => {
    let unoccupied = []
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (game[i][j] == 2048) {
                alert("You WON!!!")
                startOver()
            }
            if (game[i][j] == 0) {
                unoccupied.push([i, j])
            }
        }
    }
    return unoccupied
}

const checkMergeable = () => {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            for (let [di, dj] of dirs) {
                const _i = i+di
                const _j = j+dj
                if (_i >= 0 && _i < N && _j >= 0 && _j < N) {
                    if (game[i][j] === game[_i][_j]) {
                        return true
                    }
                }
            }
        }
    }
    return false
}

const genNewBlock = unoccupied => {
    const r = Math.floor(Math.random() * unoccupied.length)
    const [i, j] = unoccupied[r]
    game[i][j] = 1
}

const startOver = () => {
    game = initEmptyBoard()
    const unoccupied0 = checkWin()
    genNewBlock(unoccupied0)
    const unoccupied1 = checkWin()
    genNewBlock(unoccupied1)
    renderBoard()
}
startOver()

/*
    ----- action -----
*/
const onMove = e => {
    const m = {
        'ArrowUp': 0,
        'ArrowRight': 1,
        'ArrowDown': 2,
        'ArrowLeft': 3
    }
    if (e.key in m === false) { return }
    const d = m[e.key]
    const isMergeable = checkMergeable()
    const shouldMove = shouldMoveBlocks(d)
    const unoccupied = checkWin()
    if (unoccupied.length === 0 && isMergeable === false) {
        alert("You LOST!!!")
        startOver()
    } else if (shouldMove) {
        genNewBlock(unoccupied)
        renderBoard()
    }
}
document.addEventListener('keydown', onMove)
