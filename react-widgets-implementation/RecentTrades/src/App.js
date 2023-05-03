import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

    const RECENT_TRADES_BASE_URL = 'https://api.binance.com/api/v3/trades?limit=50&symbol=';

    const [trades, setTrades] = useState([]);

    useEffect(() => {

        async function fetching() {
            const SYMBOLs = ["ETHBTC","BNBBTC","BNBETH"]
            const fetch_promises = SYMBOLs.map(url => 
                fetch(RECENT_TRADES_BASE_URL + url).then(raw => raw.json())
            )
            const resps = await Promise.all(fetch_promises)
            const all = []
            for (let i = 0 ; i < resps.length; i++) {
                for (let x of resps[i]) {
                    all.push({
                        ...x,
                        symbol: SYMBOLs[i],
                        readable_time: (new Date(x.time)).toString().slice(0, 33)
                    })
                }
            }
            all.sort((a, b) => b.time - a.time)
            setTrades(all)
        }
        fetching()
    }, [])

    return (
        <div className="App">
            <h1>Recent Trades for ETHBTC, BNBBTC, BNBETH</h1>
            <table>
                <thead>
                    <tr>
                        <th>SYMBOL</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trades.map((x, idx) => (
                            <tr key={idx}>
                                <th>{x.symbol}</th>
                                <td>{x.price}</td>
                                <td>{x.qty}</td>
                                <td>{x.readable_time}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default App;
