import { useEffect, useState } from "react"

export const useFetch = url => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        const ac = new AbortController()

        async function fetchData () {
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
            }
        }
        fetchData()
        
        return () => ac.abort()
        
    }, [url])

    return { data, error }
}