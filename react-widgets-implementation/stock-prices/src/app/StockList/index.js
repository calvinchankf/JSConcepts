'use client';
import styles from './index.module.css'

import { useState, useEffect, useRef, useCallback } from 'react';

export default function StockList({ data, url }) {
    const [coins, setCoins] = useState(data.coins)
    const [hasNext, setHasNext] = useState(data.hasNext)
    const [page, setPage] = useState(1)

    const nextOnClick = () => {
        if (hasNext) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        async function fetchCryptos() {
            if (page > 1) {
                const res = await fetch(`${url}?page=${page}`);
                const resp = await res.json();
                const _coins = resp.coins
                const _hasNext = resp.hasNext

                setCoins(coins => [...coins, ..._coins])
                setHasNext(_hasNext)
            }
        }
        fetchCryptos()
    }, [page, url])

    return (<>
        {
            coins.map((Q, idx) => (<div key={idx} className={styles.row}>
                <div>{Q.name}</div>
                <div>{Q.price}</div>
                <div>{Q.marketCap}</div> 
            </div>))
        }
        <button onClick={nextOnClick} disabled={!hasNext}>LOAD MORE</button>
    </>)
}