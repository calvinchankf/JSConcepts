import { useEffect, useState } from 'react'
// import logo from './logo.svg';
import './App.css';

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function App() {

    const [red, setRed] = useState(0)
    const [green, setGreen] = useState(0)
    const [blue, setBlue] = useState(0)

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/get_events')
        // not being invoked becos the messages are sent with event type 
        // eventSource.onmessage = function (e) {
        //     console.log(e)
        // }
        eventSource.addEventListener('red', (e) => {
            setRed(e.data)
        });
        eventSource.addEventListener('green', (e) => {
            setGreen(e.data)
        });
        eventSource.addEventListener('blue', (e) => {
            setBlue(e.data)
        });
        // clean up on unmount => memory leak
        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <div className="App">
            <div style={{ color: rgbToHex(red,green,blue) }}>red    {red}</div>
            <div style={{ color: rgbToHex(red,green,blue) }}>green  {green}</div>
            <div style={{ color: rgbToHex(red,green,blue) }}>blue   {blue}</div>
        </div>
    );
}

export default App;
