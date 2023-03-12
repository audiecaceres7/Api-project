import { pokemon } from "./fetch";

export function filterTypesOfPokemon(array: pokemon[], type: string) {
    const list = array.filter(elm => elm.type === `${type}`);
     const value = document.querySelector('.type-info')! as HTMLElement;
     value.innerHTML += `<h2>${type}: ${list.length}</h2>`;
};