export interface pokemon {
    id: number;
    name: string;
    abilitie: string;
    xp: number;
    hp: number;
    image: string;
}

export async function getData(id: number): Promise<pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    const newPokemon: pokemon = {
        id: data.id,
        name: data.name,
        abilitie: data.abilities[0].ability.name,
        xp: data.base_experience,
        hp: data.stats[0].base_stat,
        image: data.sprites.other['official-artwork'].front_default
    }
    return newPokemon;
}













