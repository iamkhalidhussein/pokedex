import { usePokemonContext } from "@/context/pokemonContext";
import { useCallback, useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';

const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

const useInfiniteScrolling = () => {
    const { setPokemon } = usePokemonContext();
    const [nextUrl, setNextUrl] = useState<string | null>(API);
    const { ref, inView } = useInView();
    const [loading1, setLoading] = useState(false);

    const fetchPokemons = useCallback(async () => {
        setLoading(true);
        try {
            console.log('nexturl', nextUrl);
            const resp = await fetch(nextUrl);
            const data = await resp.json();
            console.log('data scrolling', data);
            
            const detailedPokemonPromises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            })
            const detailedPokemons = await Promise.all(detailedPokemonPromises);
            console.log(detailedPokemons);
            
            setPokemon((prev) => {
                const newPokemon = detailedPokemons.filter(
                    (p) => !prev.some((existing) => existing.id === p.id)
                );
                return [...prev, ...newPokemon];
            });
            
            setNextUrl(data.next);
        } catch (error) {
            console.log('failed to fetch pokemmons', error);
        } finally {
            setLoading(false);
        }
    }, [nextUrl, loading1])

    useEffect(() => {
        if(inView) {
            fetchPokemons();
        } 
    }, [inView]);

    return { ref, loading1 }
};

export default useInfiniteScrolling;