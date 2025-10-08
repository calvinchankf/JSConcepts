import { useState } from 'react';

const initGrid = () => {
  return [
    [null,null,null],
    [null,null,null],
    [null,null,null],
  ]
}

const checkGrid = (board) => {
  const m = {
    'X' : 1,
    'O' : -1,
    null: 0
  }
  const rowSums = Array(3).fill(0)
  const colSums = Array(3).fill(0)
  let diagTopLeft = 0
  let diagTopRight = 0
  for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
          rowSums[r] += m[board[r][c]]
          colSums[c] += m[board[r][c]]
          if (r === c) {
              diagTopLeft += m[board[r][c]]
          }
          if (r+c === 3-1) {
              diagTopRight += m[board[r][c]]
          }
          if (rowSums[r] === 3) return 'X'
          if (rowSums[r] === -3) return 'O'
          if (colSums[c] === 3) return 'X'
          if (colSums[c] === -3) return 'O'
          if (diagTopLeft === 3) return 'X'
          if (diagTopLeft === -3) return 'O'
          if (diagTopRight === 3) return 'X'
          if (diagTopRight === -3) return 'O'
      }
  }
  return null;
}

export default function App() {
  const [grid, setGrid] = useState(initGrid());
  const [who, setWho] = useState('X')
  const [winner, setWinner] = useState(null)

  const cellOnClick = (i, j) => {
    if (winner !== null) {
      return
    }
    if (grid[i][j] !== null) {
      return
    }
    grid[i][j] = who
    const result = checkGrid(grid)
    if (result == null) {
      setGrid([...grid])
      setWho(who === 'X' ? 'O' : 'X')
    } else {
      setWinner(who)
    }
  }

  const gridRender = grid.map((row, i) => {
    return (
      <div className='tic-tac-toe-row'>
        {row.map((val, j) => (
          <div
            className='tic-tac-toe-cell'
            onClick={() => cellOnClick(i, j)}
          >
            {val !== null && val}
          </div>
        ))}
      </div>
    )
  })

  return <>
    <div>{ winner !== null ? `Winner: ${who}` : `Player ${who}'s turn`}</div>
    <div>
      {gridRender}
    </div>
    <button onClick={() => {
      setWho('X')
      setWinner(null)
      setGrid(initGrid())
    }}>reset</button>
  </>;
}
