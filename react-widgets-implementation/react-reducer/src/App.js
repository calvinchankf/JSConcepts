import './App.css';
import { useReducer } from 'react';
import { initialCount, countReducer } from './reducers/countReducer'

function App() {

    const [state, dispatch] = useReducer(countReducer, initialCount)

    const decrementOnClick = () => {
        dispatch({ type: 'decrement' })
    }

    const incrementOnClick = () => {
        dispatch({ type: 'increment' })
    }

    return (
        <div className="App">
            <button onClick={decrementOnClick}>-</button>
            <span>{state.count}</span>
            <button onClick={incrementOnClick}>+</button>
        </div>
    );
}

export default App;
