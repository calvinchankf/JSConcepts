console.log('JS loaded successfully!')
const arr = document.getElementsByClassName('board')
const $game = arr[0]

// ┌─────┬─────┐
// │ 3   │ 4   │
// │   1 │   2 │
// ├─────┼─────┤
// │   4 │   3 │
// │ 2   │ 1   │
// └─────┴─────┘

const genGameBoard = () => {
    return [
        [3, null, 4, null],
        [null, 1, null, 2],
        [null, 4, null, 3],
        [2, null, 1, null],
    ]
}

let game = genGameBoard()

const checkSudoku = () => {
    // row 
    for (let i = 0; i < 4; i++) {
        const hset = new Set()
        for (let j = 0; j < 4; j++) {
            const x = game[i][j]
            if (x == null) {
                continue
            }
            if (hset.has(x)) {
                return false
            }
            hset.add(x)
        }
    }
    // col
    for (let j = 0; j < 4; j++) {
        const hset = new Set()
        for (let i = 0; i < 4; i++) {
            const x = game[i][j]
            if (x == null) {
                continue
            }
            if (hset.has(x)) {
                return false
            }
            hset.add(x)
        }
    }
    // grid
    const upperLefts = [
        [0,0], [0,2], [2,0], [2,2]
    ]
    for (let [x, y] of upperLefts) {
        const hset = new Set()
        for (let i = x; i < x+2; i++) {
            for (let j = y; j < y+2; j++) {
                const x = game[i][j]
                if (x == null) {
                    continue
                }
                if (hset.has(x)) {
                    return false
                }
                hset.add(x)
            }
        }
    }

    return true
}

const onclick = (i, j) => {
    if (game[i][j] !== null) {
        return
    }

    const raw = window.prompt("Type a number", "")
    const x = parseInt(raw, 10)
    if (isNaN(x)) {
        return
    }
    game[i][j] = x

    const b = checkSudoku()
    if (!b) {
        alert("You lost")
        game = genGameBoard()
    }
    renderBoard()
}

const renderBoard = () => {
    $game.innerHTML = ''

    const R = game.length
    const C = game[0].length
    
    for (let i = 0 ; i < R; i++) {
        const $row = document.createElement("div")
        $row.setAttribute('class', 'row')

        for (let j = 0 ; j < C; j++) {
            const $col = document.createElement("div")
            $col.setAttribute('class', 'col')

            const d = game[i][j]
            $col.innerHTML = d
            $col.addEventListener('click', () => {
                onclick(i, j)
            })

            $row.appendChild($col)
        }
        $game.appendChild($row)
    }
}

renderBoard()
