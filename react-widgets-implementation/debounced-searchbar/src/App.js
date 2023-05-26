import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
// import debounce from './utils/debounce'
import NewsCell from './components/NewsCell';

function App() {

    const [searchInput, setSearchInput] = useState('')
    const [searchPage, setSearchPage] = useState(1)
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // When you want a component to “remember” some information 
    // but you don’t want that information to trigger new renders, you can use a react-ref
    let timeout_ref = useRef(null)
    
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

    // debouncing the fetch
    const fetchData = async () => {
        if (searchInput.length === 0) { return }
        setIsLoading(true)
        clearTimeout(timeout_ref.current)
        timeout_ref.current = setTimeout(async () => {
            console.log(`fetchData keyword ${searchInput} at ${searchPage}`)
            const url = `https://hn.algolia.com/api/v1/search?query=${searchInput}&page=${searchPage}`
            const resp = await fetch(url).then(raw => raw.json())
            const data = resp.hits.map((obj, _idx) => ({
                title: obj.title,
                url: obj.url,
                author: obj.author,
                points: obj.points
            }))
            if (searchPage === 1) {
                setNews(data)
            } else {
                // console.log(page, news, data)
                // Issue: You can also do a functional update 'setNews(n => ...)' if you only need 'news' in the 'setNews' call
                // Solution: use Functional State Update
                setNews(_news => [..._news, ...data])
            }
            setIsLoading(false)
        }, 1337)
    }
    // The reason we use useCallback is to avoid fetchdata() being created and over again
    const fetchMemoData = useCallback(fetchData, [searchInput, searchPage])
    

    useEffect(() => {
        fetchMemoData()
    }, [fetchMemoData])

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
