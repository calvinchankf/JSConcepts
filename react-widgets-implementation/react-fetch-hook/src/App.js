import './App.css';

import { useState } from "react"
import { useFetch } from './hooks/useFetch';

const RECENT_TRADES_BASE_URL = 'https://api.binance.com/api/v3/trades?limit=50&symbol=';

const SYMBOOLs = {
    ETHBTC: 'ETHBTC',
    BNBBTC: 'BNBBTC',
    BNBETH: 'BNBETH',
}

function App() {
    const [symbol, setSymbol] = useState(SYMBOOLs.ETHBTC)

    const respData = useFetch(`${RECENT_TRADES_BASE_URL}${symbol}`)
    const { data: trades, error, isLoading } = respData

    const onSymbolChange = e => {
        setSymbol(e.target.value)
    }

    const loadingFallback = (<div>Loading...</div>)
    const errorFallback = (<div>Something went wrong...{error?.message}</div>)

    const tradeTable = trades !== null && (<table>
        <thead>
            <tr>
                <th>Price</th>
                <th>Quantity</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            {
                trades.map((x, idx) => (
                    <tr key={idx}>
                        <td>{x.price}</td>
                        <td>{x.qty}</td>
                        <td>{(new Date(x.time)).toString().slice(0, 33)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>)

    return (<div className="App">
        <h1>Recent Trades for ETHBTC</h1>
        <form>
            <input type="radio" value="ETHBTC" checked={symbol === 'ETHBTC'} onChange={onSymbolChange}/> ETHBTC
            <input type="radio" value="BNBBTC" checked={symbol === 'BNBBTC'} onChange={onSymbolChange}/> BNBBTC
            <input type="radio" value="BNBETH" checked={symbol === 'BNBETH'} onChange={onSymbolChange}/> BNBETH
        </form>
        { isLoading && loadingFallback }
        { trades !== null ? tradeTable : errorFallback }
    </div>);
}
export default App;
