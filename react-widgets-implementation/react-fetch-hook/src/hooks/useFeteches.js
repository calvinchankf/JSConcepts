import { useEffect, useState } from "react"

/*
    concept
*/
export const useFetches = urls => {
    const [data, setData] = useState(null)

    useEffect(() => {

        async function fetchData () {
            Promise.allSettled(urls.map(url => fetch(url)))
            .then(results => {
                results.forEach((result, idx) => {
                if (result.status === "fulfilled") {
                    console.log(`${urls[idx]}: ${result.value.status}`)
                }
                if (result.status === "rejected") {
                    console.log(`${urls[idx]}: ${result.reason}`);
                }
                });
            });
        }
        fetchData()
        
    }, [])

    return { data }
}