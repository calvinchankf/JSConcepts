import logo from './logo.svg';
import './App.css';

import { AppContext } from './contexts/AppContext';
import { useState } from 'react';
import Coordinate from './components/Coordinate';

function App() {
  const [xy, setXY] = useState({ x: 0, y: 0 })

  return (
    <div className="App">
      <header className="App-header">
        whatever
      </header>
      <AppContext.Provider value={{ xy, setXY }}>
        <Coordinate/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
