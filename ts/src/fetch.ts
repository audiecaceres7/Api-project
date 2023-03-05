export interface pokemon {
    id: number;
    name: string;
    abilitie: string;
    xp: number;
    hp: number;
    image: string;
    type: string;
}

function getOnePokemon( { url }: {url: string} ) {
    return fetch(url) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch pokemon');
            }
            return response;
        })
        .then((response) => response.json());
}

export function gettingPokemonData() {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    return fetch(baseUrl)
        .then(res => res.json() as any)
        .then(data => data.results)
        .then((allPokemon) => {
            const AllFetches = allPokemon.map((pokemon: { url: string; }) => 
                getOnePokemon({ url: pokemon.url })
        );
        return Promise.all(AllFetches);
    });
}

















