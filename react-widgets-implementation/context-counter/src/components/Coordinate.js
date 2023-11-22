import { useContext } from 'react';
import { AppContext } from "../contexts/AppContext";

function Coordinate() {
  const { xy, setXY } = useContext(AppContext);

  const onClickX = (delta) => {
    setXY((v) => ({
      x: v.x+delta, y: v.y
    }))
  }

  const onClickY = (delta) => {
    setXY((v) => ({
      x: v.x, y: v.y+delta
    }))
  }

  return (
    <div>
      <button onClick={() => onClickX(-1)}> X oordinate - </button>
      x = {xy.x}
      <button onClick={() => onClickX(1)}> X oordinate + </button>

      <button onClick={() => onClickY(-1)}> Y oordinate - </button>
      y = {xy.y}
      <button onClick={() => onClickY(1)}> Y oordinate + </button>
    </div>
  );
}

export default Coordinate;