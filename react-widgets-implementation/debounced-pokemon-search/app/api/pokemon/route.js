import { NextResponse } from 'next/server'
import { pokemons } from '@/mock-db/index'

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('query')

        const results = pokemons.filter(x => x.name.toLowerCase().includes(query?.toLowerCase())).slice(0, 500)

        return NextResponse.json({ pokemons: results })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}