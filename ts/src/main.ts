import { renderCard } from "./card";
import { getData } from "./fetch";
import { pokemon } from "./fetch";

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

function iterate(id: number) {
    for (let i = 1; i <= id; i++) {
        const allPokemon = getData(i);
        pokemonData.push(allPokemon);
    };
};

const pokemonData: Promise<pokemon>[] = [];
const pokemonList: pokemon[] = []

iterate(30);

const main = async () => {
    const allPokemon = await Promise.all(pokemonData);
    allPokemon.map(pokemon => pokemonList.push(pokemon))
    pokemonList.map(pokemon => renderCard(pokemon))
    addingCardsToCollectionContainer();
    removingCardsFromContainer();
    const typeList = ['electric', 'fire', 'water', 'grass', 'bug'];
    for (let i = 0; i < typeList.length; i++) {
        filterTypesOfPokemon(pokemonList, typeList[i]);
    }
    const sortBtn = document.querySelectorAll('.sort-btn');
    for (const elm of sortBtn) {
        elm.addEventListener('click', function() {
            sortingPokemonByName(pokemonList);
        })
    }
    
};

main();

function sortingPokemonByName(array: pokemon[]) {
    const sorted = array.map(elm => elm)
    const list = sorted.sort((a: any , z:any) => a - z);
    return list;
}

function filterTypesOfPokemon(array: pokemon[], type: string) {
   const list = array.filter(elm => elm.type === `${type}`);
    const value = document.querySelector('.value-container')! as HTMLElement;
    value.innerHTML += `<h2>${type}: ${list.length}</h2>`;
}


function setActive(elm: any, selector: string) {
    if (document.querySelector(`${selector}.active`) !== null) {
        document.querySelector(`${selector}.active`)?.classList.remove('active');
    } 
    elm.classList.add('active');
}

function isActive(elm: any) {
    if (!elm.classList.contains('active')) {
        elm.classList.add('active');
    } else {
        elm.classList.remove('active');
    }
}

function addingCardsToCollectionContainer() {
    const switcherBtn = document.querySelectorAll('.switcher-btn');
    const like = document.querySelectorAll('.fa-folder-plus');
    for (const elm of like) {
        elm.addEventListener('click', function(this: any) {
            const fav = document.querySelector('.favorites-container')! as HTMLElement;
            const card = this.parentElement.parentElement.parentElement.parentElement;
            fav.append(card);
            for (const elm of switcherBtn) {
                setActive(elm, '.switcher-btn');
            }
        })
    }
}

function removingCardsFromContainer() {
    const switcherBtn = document.querySelectorAll('.switcher-btn');
    const disLike = document.querySelectorAll('.fa-trash');
    for (const elm of disLike) {
        elm.addEventListener('click', function(this: any) {
            const col = document.querySelector('.collection-container')! as HTMLElement;
            const card = this.parentElement.parentElement.parentElement.parentElement;
            col.append(card);
            for (const elm of switcherBtn) {
                setActive(elm, '.switcher-btn');
                isActive(elm);
            }
        })
    }
}