import { gettingPokemonData } from "./fetch";
import { renderCard } from "./renderCards";
import { renderFavCard } from "./renderFavCard";
import { pokemon } from "./fetch";
import { filterTypesOfPokemon } from "./dynamicDataList";
import { removeElement } from "./remove";
import { isActive } from "./checkingIfActive";

const dataSwitchers = document.querySelectorAll('[data-switcher]');

for (let i = 0; i < dataSwitchers.length; i++) {
    const tabSwitcher = dataSwitchers[i];
    if (tabSwitcher instanceof HTMLElement) {
        const pageId = tabSwitcher.dataset.tab; 
        if (pageId) {
            tabSwitcher.addEventListener('click', function() {
                document.querySelector('.nav-items .box.is-active')?.classList.remove('is-active');
                tabSwitcher.classList.add('is-active');
                switchPage(pageId);
            });
        };
    };
};

function switchPage(pageId: string) {
    const currPage = document.querySelector('.container.is-active');
    currPage?.classList.remove('is-active');

    const nextPage = document.querySelector(`.container[data-page="${pageId}"]`);
    nextPage?.classList.add('is-active');
};

const collection: pokemon[] = [];
const favorites: pokemon[] = [];

gettingPokemonData(30)
    .then(allData => {
        allData.forEach(pokemon => {
        const pok: pokemon = {
            id: pokemon.id,
            name: pokemon.name,
            abilitie: pokemon.abilities[0].ability.name,
            xp: pokemon.base_experience,
            hp: pokemon.stats[0].base_stat,
            image: pokemon.sprites.other['official-artwork'].front_default,
            type: pokemon.types[0].type.name,
        };
        collection.push(pok);
        renderCard(pok);
    });
    
    const typeList = ['electric', 'water', 'grass', 'bug', 'fire'];
    for (let i = 0; i < typeList.length; i++) {
        filterTypesOfPokemon(collection, typeList[i]);
    };

    addingEventsToLikeBtn();
    addingDislikeEvents();

    function addingEventsToLikeBtn() {
        const cards = document.querySelectorAll('.card');
        for (const card of cards) {
            const likeBtn = card.querySelector('.fa-folder-plus');
            likeBtn?.addEventListener('click', function() {
                for (const pokemons of collection) {
                    if (pokemons.name === card.id) {
                        favorites.push(pokemons)
                        removeElement(collection, pokemons);
                        renderFavCard(pokemons);
                        card.remove();
                        addingDislikeEvents();
                        // updating list 
                        console.log(collection);
                        console.log(favorites);
                    };
                };
            });
        };
    };

    function addingDislikeEvents() {
        const favCards = document.querySelectorAll('.fav-card');
        for (const card of favCards) {
            const disLikeBtn = card.querySelector('.fa-trash');
            disLikeBtn?.addEventListener('click', function() {
                for (const pokemons of favorites) {
                    if (pokemons.name === card.id) {
                        collection.push(pokemons)
                        removeElement(favorites, pokemons);
                        renderCard(pokemons);
                        card.remove();
                        addingEventsToLikeBtn();
                        // Updating list
                        console.log(collection);
                        console.log(favorites);
                    };
                };
            });
        };
    };
    
    function sortPokemon(order: 'atoz' | 'ztoa') {
        let colSorted, favSorted;
        const col = document.querySelector('.collection-container');
        if (col === null) {
            throw new Error('col is not defined...');
        };
        const fav = document.querySelector('.favorites-container');
        if (fav === null) {
            throw new Error('fav its not defined...');
        };
        if (order === 'atoz') {
          colSorted = collection.sort((a, z) => a.name.localeCompare(z.name));
          favSorted = favorites.sort((a, z) => a.name.localeCompare(z.name));
        } else if (order === 'ztoa'){
          colSorted = collection.sort((a, z) => z.name.localeCompare(a.name));
          favSorted = favorites.sort((a, z) => z.name.localeCompare(a.name));
        };
        col.innerHTML = '';
        fav.innerHTML = '';
        if (colSorted) {
            colSorted.map(pokemon => renderCard(pokemon));
        }
        if (favSorted) {
            favSorted.map(pokemon => renderFavCard(pokemon));
        }
        addingEventsToLikeBtn();
        addingDislikeEvents();
    };
    
    const sortingAtoZ = document.querySelectorAll('.atoz');
    sortingAtoZ.forEach(btn => {
        btn.addEventListener('click', () => {
            sortPokemon('atoz');
        });
    });
    
    const sortingZtoA = document.querySelectorAll('.ztoa');
    sortingZtoA.forEach(btn => {
        btn.addEventListener('click', () => {
            sortPokemon('ztoa');
        });
    });

    const toggleContainer = document.querySelectorAll('.toggle-container');
    for (const elm of toggleContainer) {
        const btn = elm.querySelectorAll('.sort-btn');
        btn.forEach(elm => {
            elm.addEventListener('click', function() {
                isActive(elm, '.sort-btn');
            });
        });
    };
});







