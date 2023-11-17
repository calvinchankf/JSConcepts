import styles from './page.module.css'
import StockList from './StockList';

// const CRYPTO_PRICES_MOCK = 'https://api.frontendexpert.io/api/fe/cryptocurrencies';
const CRYPTO_PRICES_MOCK = 'https://comet-shimmer-stream.glitch.me/mock_crypto_prices';


async function fetchCryptos(page = 1) {
    const res = await fetch(`${CRYPTO_PRICES_MOCK}?page=${page}`);
    return res.json();
}

export default async function Home() {
    const data = await fetchCryptos();
    
    return (<>
        <StockList data={data} url={CRYPTO_PRICES_MOCK} />
    </>)
}
