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
    
    const col = document.querySelector('.collection-container');
    if (col === null) {
        throw new Error('col is not defined...');
    } 
    const fav = document.querySelector('.favorites-container');
    if (fav === null) {
        throw new Error('fav its not defined...');
    }

    addingClickEventToCard();

    const sortingAtoZ = document.querySelectorAll('.atoz');
    for (const btns of sortingAtoZ) {
        btns.addEventListener('click', function(this: any) {
            const favSort = favorites.sort((a, z) => a.name.localeCompare(z.name));
            const colSort = collection.sort((a, z) => a.name.localeCompare(z.name));
            const mainContainer = this.parentElement.parentElement.parentElement.parentElement;
            const container = mainContainer.lastElementChild;
            container.textContent = '';
            colSort.map(pokemon => renderCard(pokemon));
            favSort.map(pokemon => renderCardFav(pokemon));
            addingClickEventToCard();
        })
    }

    const sortingZtoA = document.querySelectorAll('.ztoa');
    for (const btns of sortingZtoA) {
        btns.addEventListener('click', function(this: any) {
            const favSort = favorites.sort((a, z) => z.name.localeCompare(a.name));
            const colSort = collection.sort((a, z) => z.name.localeCompare(a.name));
            const mainContainer = this.parentElement.parentElement.parentElement.parentElement;
            const container = mainContainer.lastElementChild;
            container.textContent = '';
            favSort.map(pokemon => renderCardFav(pokemon));
            colSort.map(pokemon => renderCard(pokemon));
            addingClickEventToCard();
        })
    }
    
    function addingClickEventToCard() {
        const cards = document.querySelectorAll(`.card`);
        for (const card of cards) {
            const likeBtn = card.querySelector('.fa-folder-plus');
            const disLikeBtn = card.querySelector('.fa-trash');
            
            likeBtn?.addEventListener('click', function() {
                fav?.append(card);
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
            
            disLikeBtn?.addEventListener('click', function() {
                col?.append(card);
                for (const elms of favorites) {
                    if (elms.name === card.id) {
                        collection.push(elms)
                        removeElement(favorites, elms);
    
                        console.log(collection);
                        console.log(favorites);
                    }
                }
                const switcherBtn = card.querySelectorAll('.switcher-btn');
                for (const btn of switcherBtn) {
                    isActive(btn);
                }
            })
        }
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



