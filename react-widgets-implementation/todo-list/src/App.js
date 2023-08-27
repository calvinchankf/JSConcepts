import './App.css';
import { useState, useRef, useMemo } from 'react';

function App() {
    const [searchInput, setSearchInput] = useState('')
    const createInputRef = useRef(null)
    const [todos, setTodos] = useState([])
    
    const saerchOnChange = e => {
        setSearchInput(()=> e.target.value)
    }

    const createOnSubmit = e => {
        e.preventDefault()
        const v = createInputRef.current.value
        if (v.length === 0) {
            return
        }

        const newTask = { title: v, status: 0 }
        setTodos(prev => {
            return [...prev, newTask]
        })
        createInputRef.current.value= ''
    }

    const itemOnClick = e => {
        if (e.target.dataset.idx) {
            const idx = e.target.dataset.idx
            todos[idx].status = (todos[idx].status + 1) % 2
            setTodos([...todos])
        }
    }

    const filteredTodos = useMemo(() => {
        return todos.filter(obj => {
            return obj.title.toLowerCase().includes(searchInput.toLowerCase())
        })
    }, [todos, searchInput]) 

    return (<>
        <h1>TODO List</h1>
        Search: <input type='search' value={searchInput} onChange={saerchOnChange}></input>
        <form onSubmit={createOnSubmit}>
            Add a todo:
            <input type='text' ref={createInputRef}></input>
            <button type='submit'>create</button>
        </form>

        <h3>Items</h3>
        <div onClick={itemOnClick}>
            {filteredTodos.map((obj, idx) => (
                <div key={idx} className={'item'} data-idx={idx}>
                    <div>{obj.title}</div>
                    <div>{obj.status}</div>
                </div>
            ))}
        </div>
    </>)
}

export default App;
