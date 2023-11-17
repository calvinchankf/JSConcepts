import { headers } from "next/headers";
import styles from "@/app/page.module.css"

const fetchData = async (query = '') => {
    try {
        const host = headers().get("host");
        const resp = await fetch(
            `http://${host}/api/pokemon?query=${query}`
        )
        return resp.json()
    } catch (error) {
        console.error(`error: ${error}`)
    }
}

export default async function PokemonList({ query }) {

    const { pokemons } = await fetchData(query)

    return (<>
        <div className={styles.results}>
            {pokemons && pokemons.map((obj, idx) => {
                const segments = obj.url.split('/')
                const n = segments.length
                const pID = segments[n-2]
                const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pID}.png`
                return (
                    <div key={idx} className={styles.resultCell}>
                        <div>{obj.name}</div>
                        <img src={imgURL} alt="image"/>
                    </div>
                )
            })}
        </div>
    </>)
}