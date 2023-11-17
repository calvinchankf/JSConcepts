"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useDebounce } from "@/hooks/useDebounce"
import styles from "@/app/page.module.css"

export default function SearchInput({ query = '' }) {

    const router = useRouter()
    const [searchInput, setSearchInput] = useState(query)

    const debouncedSearchInput = useDebounce(searchInput, 500)

    const handleSearch = event => {
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        const searchParams = new URLSearchParams()
        searchParams.set('q', debouncedSearchInput)
        router.replace(`?${searchParams.toString()}`)
    }, [debouncedSearchInput, router])

    return (
        <input className={styles.searchbar} value={searchInput} onChange={handleSearch} />
    )
}
