import { Suspense } from 'react'
import styles from './page.module.css'
import PokemonList from '@/components/PokemonList'
import SearchInput from "@/components/SearchInput"

export default function Home({ searchParams }) {
    const query = searchParams?.q ?? ''
    return (
        <main className={styles.main}>
            <SearchInput query={query}/>
            <Suspense key={query} fallback={<div>Loading feed...</div>}>
                <PokemonList query={query}/>
            </Suspense>
        </main>
    )
}