import { useEffect, useState } from 'react';
import './App.css';

const createNewBoard = (R, C) => {
    const board = []
    for (let i = 0; i < R; i++) {
        board.push(Array(C).fill(0))
    }
    return board
}

const cloneBoard = board => {
    const R = board.length
    const C = board[0].length
    const clone = createNewBoard(R, C)

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            clone[i][j] = board[i][j]
        }
    }
    return clone
}

const computeNextboard = board => {
    const R = board.length
    const C = board[0].length
    const clone = createNewBoard(R, C)

    const dirs = [
        [-1,-1], [-1,0], [-1, 1],
        [0,-1], [0, 1],
        [1,-1], [1,0], [1, 1],
    ]
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            let live_cnt = 0
            for (let [di, dj] of dirs) {
                const _i = i+di
                const _j = j+dj
                if (_i < 0 || _i >= R || _j < 0 || _j >= C) {
                    continue
                }
                if (board[_i][_j] === 1) {
                    live_cnt += 1
                }
            }
            if (board[i][j] === 1) {
                if (live_cnt >= 2 && live_cnt <= 3) {
                    clone[i][j] = 1
                }
            } else {
                if (live_cnt === 3) {
                    clone[i][j] = 1
                }
            }
        }
    }
    return clone
}

function App() {
    
    const R = 20
    const C = 20
    let [board, setBoard] = useState(createNewBoard(R, C))

    const boardOnClick = event => {
        const ij = event.target.dataset.index
        let [i, j]= ij.split(',')
        i = parseInt(i)
        j = parseInt(j)

        const clone = cloneBoard(board)
        clone[i][j] = (board[i][j] + 1) % 2
        setBoard(clone)
    }
    const nextButtonOnClick = () => {
        const nexBoard = computeNextboard(board)
        setBoard(nexBoard)
    }

    const onKeyPress = e => {
        if (e.key === ' ') {
            const nexBoard = computeNextboard(board)
            setBoard(nexBoard)
        }
    }

    useEffect(() => {
        window.addEventListener('keypress', onKeyPress);
        return () => window.removeEventListener('keypress', onKeyPress)
    });

    return (
        <div className = "App" >
            <div id='game-board' onClick={boardOnClick}>{
                board.map((row, i) => {
                    return <div key={i} className='row'>
                        {
                            row.map((_cell, j) => {
                                let cellCSS = 'cell'
                                if (row[j] === 1) {
                                    cellCSS += ' colored'
                                }
                                return <div
                                    key={j}
                                    className={cellCSS}
                                    data-index={`${i},${j}`}
                                ></div>
                            })
                        }
                    </div>
                })
            }</div>
            <button id='next-button' onClick={nextButtonOnClick}>Next state</button>
        </div>
    );
}

export default App;