import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
    const [bill, setBill] = useState(50)
    const [tip, setTip] = useState(18)
    const [people, setPeople] = useState(1)
    
    const totalTip = (bill * tip / 100).toFixed(2)
    const tipPerPerson = (totalTip / people).toFixed(2)
    
    const handleBillOnChange = (event) => {
        const value = event.target.value
        setBill(value)
    }

    const handleTipOnChange = (event) => {
        const value = event.target.value
        setTip(value)
    }

    const handlePeopleOnChange = (event) => {
        const value = event.target.value
        setPeople(value)
    }

    return (
      <>
        <label>
            Bill
            <input type='number' value={bill} onChange={handleBillOnChange}/>
        </label>
        <label>
            Tip Percentage
            <input type='number' value={tip} onChange={handleTipOnChange}/>
        </label>
        <label>
            Number of People
            <input type='number' value={people} onChange={handlePeopleOnChange}/>
        </label>
        <p>Total Tip: {totalTip > 0 ? `$${totalTip}` : '-'} </p>
        <p>Tip per person: {tipPerPerson > 0 ? `$${tipPerPerson}` : '-'} </p>
      </>
    );
}

export default App;
