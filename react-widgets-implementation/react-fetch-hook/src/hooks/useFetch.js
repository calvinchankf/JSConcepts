import { useEffect, useState } from "react"

export const useFetch = url => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const ac = new AbortController()

        async function fetchData () {
            setIsLoading(true)
            try {
                const resp = await fetch(url, {
                    mode: "cors",
                    signal: ac.signal
                })
                if (!resp.ok) {
                    throw new Error(resp.status)
                }
                const respData = await resp.json()
                setData(respData)
                
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
        
        return () => ac.abort()
        
    }, [url])

    return { data, error, isLoading }
}