import { gettingPokemonData } from "./fetch";
import { renderCard, renderFavCard } from "./card";
import { pokemon } from "./fetch";
import { filterTypesOfPokemon } from "./dynamicDataList";
import { removeElement } from "./remove";

const dataSwitchers = document.querySelectorAll('[data-switcher]');

for (let i = 0; i < dataSwitchers.length; i++) {
    const tabSwitcher = dataSwitchers[i];
    if (tabSwitcher instanceof HTMLElement) {
        const pageId = tabSwitcher.dataset.tab;
        tabSwitcher.addEventListener('click', function() {
            document.querySelector('.nav-items .box.is-active')?.classList.remove('is-active');
            tabSwitcher.parentElement?.classList.add('is-active');
            switchPage(pageId);
        });
    };
};

function switchPage(pageId: string | undefined) {
    const currPage = document.querySelector('.container.is-active');
    currPage?.classList.remove('is-active');

    const nextPage = document.querySelector(`.container[data-page="${pageId}"]`);
    nextPage?.classList.add('is-active');
};

const collection: pokemon[] = [];
const favorites: pokemon[] = [];

gettingPokemonData()
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
        }
        collection.push(pok);
        renderCard(pok);
    })
    
    const col = document.querySelector('.collection-container');
    if (col === null) {
        throw new Error('col is not defined...');
    } 
    const fav = document.querySelector('.favorites-container');
    if (fav === null) {
        throw new Error('fav its not defined...');
    }

    addingEventListener();

    function addingEventListener() {
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
    
                        // updating list 
                        console.log(collection);
                        console.log(favorites);
    
                    }
                }
            })
        }
        
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

                        // Updating list
                        console.log(collection);
                        console.log(favorites);
                    }
                }
            })
        }
    }
    
    const sortBtn = document.querySelectorAll('.atoz');
    for (const btn of sortBtn) {
        btn.addEventListener('click', function() {
            const colSorted = collection.sort((a, z) => a.name.localeCompare(z.name));
            const favSorted = favorites.sort((a, z) => a.name.localeCompare(z.name));
            col.innerHTML = '';
            fav.innerHTML = '';
            colSorted.map(pokemon => renderCard(pokemon));
            favSorted.map(pokemon => renderFavCard(pokemon));
            addingEventListener();
        })
    }

    const sortBtnTwo = document.querySelectorAll('.ztoa');
    for (const btn of sortBtnTwo) {
        btn.addEventListener('click', function() {
            const colSorted = collection.sort((a, z) => z.name.localeCompare(a.name));
            const favSorted = favorites.sort((a, z) => z.name.localeCompare(a.name));
            col.innerHTML = '';
            fav.innerHTML = '';
            colSorted.map(pokemon => renderCard(pokemon));
            favSorted.map(pokemon => renderFavCard(pokemon));
            addingEventListener();
        })
    }
    

});

// const typeList = ['electric', 'water', 'grass', 'bug', 'fire'];
// for (let i = 0; i < typeList.length; i++) {
//     filterTypesOfPokemon(collection, typeList[i]);
// };

// function sortingToggle(elm: any, selector: string) {
//     if (document.querySelector(`${selector}.active`) !== null) {
//         document.querySelector(`${selector}.active`)?.classList.remove('active');
//     }
//     elm.classList.add('active');
// }



