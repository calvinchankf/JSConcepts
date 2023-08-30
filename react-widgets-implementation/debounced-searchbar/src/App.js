import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';
import { useDebounce } from './utils/useDebounce'
import NewsCell from './components/NewsCell';

function App() {

    const [searchInput, setSearchInput] = useState('')
    const [searchPage, setSearchPage] = useState(1)
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const debouncedSearchInput = useDebounce(searchInput, 500)
    
    const handleSearch = event => {
        setSearchPage(1)
        setSearchInput(event.target.value)
    }

    const handleScroll = e => {
        let dom = e.target
        const scrollTop = (dom.documentElement && dom.documentElement.scrollTop) || dom.body.scrollTop
        const clientHeight = dom.documentElement.clientHeight || window.innerHeight;
        const scrollHeight = (dom.documentElement && dom.documentElement.scrollHeight) || dom.body.scrollHeight;
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight
            && news.length > 0 
            && !isLoading
        ) {
            console.log('load more', scrollTop, clientHeight, scrollHeight)
            setSearchPage(searchPage+1)
        }
    }

    // approach1
    useEffect(() => {
        const abc = new AbortController()
        const fetchData = async () => {
            if (debouncedSearchInput.length === 0) {
                return
            }
            setIsLoading(true)
            console.log(`fetchData keyword ${debouncedSearchInput} at ${searchPage}`)
            const url = `https://hn.algolia.com/api/v1/search?query=${debouncedSearchInput}&page=${searchPage}`
            const resp = await fetch(url, { signal: abc.signal }).then(raw => raw.json())
            const data = resp.hits.map((obj, _idx) => ({
                title: obj.title,
                url: obj.url,
                author: obj.author,
                points: obj.points
            }))
            if (searchPage === 1) {
                setNews(data)
            } else {
                // Issue: we need 'news' in the 'setNews' call
                // Solution: use Functional State Update
                setNews(_news => [..._news, ...data])
            }
            setIsLoading(false)
        }
        fetchData()
        return () => abc.abort()
    }, [debouncedSearchInput, searchPage])

    /*
    // approach2
    const memoFetch = useCallback(async () => {
        const abc = new AbortController()
        if (debouncedSearchInput.length === 0) {
            return
        }
        setIsLoading(true)
        console.log(`fetchData keyword ${debouncedSearchInput} at ${searchPage}`)
        const url = `https://hn.algolia.com/api/v1/search?query=${debouncedSearchInput}&page=${searchPage}`
        const resp = await fetch(url, { signal: abc.signal }).then(raw => raw.json())
        const data = resp.hits.map((obj, _idx) => ({
            title: obj.title,
            url: obj.url,
            author: obj.author,
            points: obj.points
        }))
        if (searchPage === 1) {
            setNews(data)
        } else {
            // Issue: we need 'news' in the 'setNews' call
            // Solution: use Functional State Update
            setNews(_news => [..._news, ...data])
        }
        setIsLoading(false)
        
        return () => abc.abort()
    }, [debouncedSearchInput, searchPage])

    useEffect(() => {
        memoFetch()
    }, [memoFetch])
    */

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    // load more indicator
    let loadingIndicator = null
    if (isLoading) {
        loadingIndicator = (<div className="infinit-table-spinner"></div>)
    }

    return (
        <div className="App">
            <div style={{display: 'flex'}}>
                <label>Search something: </label>
                <input value={searchInput} onChange={handleSearch} />
                {loadingIndicator}
            </div>
            <div>{
                news.map((obj, idx) => (<NewsCell key={idx} idx={idx} feed={obj}/>))
            }</div>
            {loadingIndicator}
        </div>
  );
}

export default App;
