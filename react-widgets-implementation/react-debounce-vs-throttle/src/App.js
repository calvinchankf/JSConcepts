import { useState } from 'react';
import './App.css';
import { useDebounce } from './hooks/useDebounce'
import { useThrottle } from './hooks/useThrottle';

function App() {

    const [defaultText, setDefaultText] = useState('')
    const debouncedText = useDebounce(defaultText, 500)
    const throttledText = useThrottle(defaultText, 500)

    const defaultOnChange = e => {
        setDefaultText(e.target.value)
    }

    return (
        <div className="App">
            <input type="text" onChange={defaultOnChange} value={defaultText}/>
            <div>
                <b>Default:</b>
                <span>{defaultText}</span>
            </div>
            <div>
                <b>Debounce:</b>
                <span>{debouncedText}</span>
            </div>
            <div>
                <b>Throttle:</b>
                <span>{throttledText}</span>
            </div>
        </div>
    );
}

export default App;
