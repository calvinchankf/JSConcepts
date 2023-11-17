import { useEffect, useState } from "react"

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {

        const abc = new AbortController()

        setIsLoading(true)

        async function fetchData () {
            try {
                const resp = await fetch(url, {
                    ...options,
                    signal: abc.signal
                })
                if (!resp.ok) {
                    throw new Error(resp.status)
                }
                const respData = await resp.json()
                setData(respData)
                setIsLoading(false)
                
            } catch (error) {
                setError(error)
                setIsLoading(true)
            }
        }
        fetchData()
        
        return () => abc.abort()
        
    }, [url, options])

    return { data, error, isLoading }
}