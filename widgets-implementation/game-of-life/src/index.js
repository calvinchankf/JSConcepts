// https://leetcode.com/discuss/interview-question/479761/Bloomberg-or-Onsite-or-Game-of-Life-(Front-End)

// data
const R = 20
const C = 20

// init
const initEmptyBoard = () => {
    const res = []
    for (let i = 0; i < R; i++) {
        res.push(Array(C).fill(0))
    }
    return res
}

const pickRandomKCells = (board) => {
    // generate k ones on the board
    // const k = Math.floor(Math.random() * 50) + 1;
    const k = 50
    console.log(`randomly generated ${k} live cells`)
    const selected = []
    for (let i = 0; i < R*C; i++) {
        const coor = [Math.floor(i/R), i%R]
        if (i < k) {
            selected.push(coor)
        } else {
            const r = Math.floor(Math.random() * (i+1));
            if (r < k) {
                selected[r] = coor
            }
        }
    }
    for (let [i, j] of selected) {
        board[i][j] = 1
    }
}

// algo
var playGameOfLife = function(board) {
    const newBoard = initEmptyBoard()
    const R = board.length
    const C = board[0].length
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            const count = countLivingNeighbors(board, i, j)
            if (board[i][j] == 1) {
                if (count == 2 || count == 3) {
                    newBoard[i][j] = 1
                }
            } else {
                if (count == 3) {
                    newBoard[i][j] = 1
                }
            }
        }
    }
    return newBoard
};

const countLivingNeighbors = (board, i, j) => {
    const R = board.length
    const C = board[0].length
    const dirs = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1,-1], [-1,1], [1, 1], [1,-1]
    ]
    let count = 0
    for (let [di, dj] of dirs) {
        const _i = i + di
        const _j = j + dj
        if (_i < 0 || _i == R || _j < 0 || _j == C) {
            continue
        }
        if (board[_i][_j] % 10 == 1) {
            count += 1
        }
    }
    return count
}

// UI
const $gameBoard = document.querySelector("#game-board");
const $nextButton = document.querySelector("#next-button");

const renderRow = (row, i) => {
    const $row = document.createElement("div");
    $row.setAttribute("class", "row");
    for (let j = 0; j < row.length; j++) {
        const $cell = document.createElement("div");

        let cellCss = 'cell'

        if (row[j] == 1) {
            cellCss += ' colored'
        }
        if (i+1 == R) {
            cellCss += ' last-row'
        }
        if (j+1 == C) {
            cellCss += ' last-col'
        }
        
        $cell.setAttribute("class", cellCss);
        $cell.setAttribute("data-index", `${i},${j}`)
        $row.appendChild($cell)
    }
    return $row
}

const renderGameBoard = (mat) => {
    for (let i = 0; i < mat.length; i++) {
        const $row = renderRow(mat[i], i)
        $gameBoard.appendChild($row)
    }
}

let board = initEmptyBoard()
pickRandomKCells(board)
renderGameBoard(board)

// actions
$nextButton.addEventListener("click", (e) => {
    $gameBoard.innerHTML = ''
    board = playGameOfLife(board)
    renderGameBoard(board)
})

$gameBoard.addEventListener("click", (e) => {
    const key = e.target.dataset.index
    console.log(key)
    let [i, j] = key.split(',')
    i = parseInt(i)
    j = parseInt(j)
    board[i][j] = Math.abs(board[i][j] - 1)
    $gameBoard.innerHTML = ''
    renderGameBoard(board)
})