const $board = document.getElementById('board')

const genInitGame = () => {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
}

let steps = 0 // player O: even; player X: odd
let game = genInitGame()

const restart = () => {
    steps = 0
    game = genInitGame()
}

const checkBoard = game => {
    const starts = [
        [0,0], [0,1], [0,2], [1,0], [2,0]
    ]
    for (let [i, j] of starts) {
        if (game[i][j] == null) {
            continue
        }
        const player = game[i][j]
        let _i = i
        let _j = j
        
        while (_j+1 < 3 && game[i][_j+1] == player) { _j += 1 }
        if (_j - j + 1 == 3) { return player }
        
        _i = i
        _j = j
        while (_i+1 < 3 && game[_i+1][j] == player) { _i += 1 }
        if (_i - i + 1 == 3) { return player }
        
        _i = i
        _j = j
        while (_i+1 < 3 && _j+1 < 3 && game[_i+1][_j+1] == player) {
            _i += 1
            _j += 1
        }
        if (_i - i + 1 == 3) { return player }

        _i = i
        _j = j
        while (_i+1 < 3 && _j-1 >= 0 && game[_i+1][_j-1] == player) {
            _i += 1
            _j -= 1
        }
        if (_i - i + 1 == 3) { return player }
    }
    return null
}

const onclick = (i, j) => {
    if (game[i][j] !== null) {
        return
    }

    game[i][j] = steps % 2 == 0 ? 'O' : 'X'
    steps += 1
    render()
}

const checkWinner = () => {
    setTimeout(() => {
        const winner = checkBoard(game)
        if (winner) {
            alert(winner)
            restart()
            render()
        }
    }, 0);
}

const render = () => {
    $board.innerHTML = ''
    for (let i = 0; i < 3; i++) {
        const $row = document.createElement('div')
        $row.setAttribute("class", "row")

        for (let j = 0; j < 3; j++) {
            const $cell = document.createElement('div')
            $cell.setAttribute("class", "col")
            $cell.setAttribute("data-index", `${i},${j}`)
            if (game[i][j] !== null) {
                $cell.innerHTML = game[i][j]   
            }
            $row.appendChild($cell)
        }
        $board.appendChild($row)
    }
}

$board.addEventListener('click', (e) => {
    const key = e.target.dataset.index
    let [i, j] = key.split(',')
    onclick(i, j)
    checkWinner()
})

render()

/* tests */
// console.log(checkBoard(game))

// game = [
//     ['O', 'O', 'O'],
//     [null, null, null],
//     [null, null, null],
// ]
// console.log(checkBoard(game))

// game = [
//     ['X', 'O', 'O'],
//     ['X', null, null],
//     ['X', null, null],
// ]
// console.log(checkBoard(game))

// game = [
//     ['X', 'O', 'O'],
//     ['X', 'X', null],
//     [null, null, 'X'],
// ]
// console.log(checkBoard(game))

// game = [
//     ['X', 'O', 'O'],
//     [null, 'O', null],
//     ['O', null, null],
// ]
// console.log(checkBoard(game))