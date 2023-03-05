import { gettingPokemonData } from "./fetch";
import { renderCard } from "./card";
import { pokemon } from "./fetch";
import { isActive } from "./movingCard";
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
    })

    collection.map(pokemon => renderCard(pokemon));

    const col = document.querySelector('.collection-container')! as HTMLElement;
    const fav = document.querySelector('.favorites-container')! as HTMLElement;
    const cards = document.querySelectorAll(`.card`);
    
    for (const card of cards) {
        const likeBtn = card.querySelector('.fa-folder-plus')! as HTMLElement;
        const disLikeBtn = card.querySelector('.fa-trash')! as HTMLElement;
        
        likeBtn?.addEventListener('click', function(this: any) {
            const card = this.parentElement.parentElement.parentElement.parentElement;
            fav.append(card);
            for (const elms of collection) {
                if (elms.name === card.id) {
                    favorites.push(elms)
                    removeElement(collection, elms);

                    console.log(collection);
                    console.log(favorites);
                }
            }
            const switcherBtn = card.querySelectorAll('.switcher-btn');
            for (const btn of switcherBtn) {
                isActive(btn);
            }
        })
        
        disLikeBtn?.addEventListener('click', function(this: any) {
            col.append(card);
            const switcherBtn = card.querySelectorAll('.switcher-btn');
            for (const elm of switcherBtn) {
                isActive(elm);
            }
        })
    }
});

// const typeList = ['electric', 'water', 'grass', 'bug', 'fire'];
// for (let i = 0; i < typeList.length; i++) {
//     filterTypesOfPokemon(collection, typeList[i]);
// };

// const sort = document.querySelector('#atoz')! as HTMLElement;
// sort.addEventListener('click', function() {
//     sortingAtoZ(collection, '.collection-container');
//     sortingAtoZ(favorites, '.favorites-container');
// })

// const sortTwo = document.querySelector('#ztoa')! as HTMLElement;
// sortTwo.addEventListener('click', function() {
//     sortingZtoA(collection, '.collection-container');
//     sortingZtoA(favorites, '.favorites-container');
// })

// function sortingAtoZ(array: pokemon[], selector: string) {
//     const sortedCollection = array.sort((a, z) => a.name.localeCompare(z.name));
//     const container = document.querySelector(`${selector}`)! as HTMLElement;
//     container.innerHTML = '';
//     sortedCollection.map((pokemon: pokemon) => renderCard(pokemon));
//     btnToggleAndAppend();
// }

// function sortingZtoA(array: pokemon[], selector: string) {
//     const sortedCollection = array.sort((a, z) => z.name.localeCompare(a.name));
//     const container = document.querySelector(`${selector}`)! as HTMLElement;
//     container.innerHTML = '';
//     sortedCollection.map((pokemon: pokemon) => renderCard(pokemon));
//     btnToggleAndAppend();
// }

// function sortingToggle(elm: any, selector: string) {
//     if (document.querySelector(`${selector}.active`) !== null) {
//         document.querySelector(`${selector}.active`)?.classList.remove('active');
//     }
//     elm.classList.add('active');
// }



