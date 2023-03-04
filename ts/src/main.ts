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
    allPokemon.map(pokemon => pokemonList.push(pokemon));
    pokemonList.map(pokemon => renderCard(pokemon));
    adding();
    
    const typeList = ['electric', 'water', 'grass', 'bug', 'fire'];
    for (let i = 0; i < typeList.length; i++) {
        filterTypesOfPokemon(pokemonList, typeList[i]);
    };

    const sortBtn = document.querySelectorAll('.sort-btn');
    for (const elm of sortBtn) {
        elm.addEventListener('click', function() {
            const list = [];
            const cards = document.querySelectorAll('.card');
            const col = document.querySelector('.sort-btn')! as HTMLElement;
            for (const elm of cards) {
                list.push(elm.id);
            }
            const lol = list.sort();
            console.log(lol);
        })
    }
};

main();

function filterTypesOfPokemon(array: pokemon[], type: string) {
   const list = array.filter(elm => elm.type === `${type}`);
    const value = document.querySelector('.value-container')! as HTMLElement;
    value.innerHTML += `<h2>${type}: ${list.length}</h2>`;
}

function isActive(elm: any) {
    if (!elm.classList.contains('active')) {
        elm.classList.add('active');
    } else {
        elm.classList.remove('active');
    }
}

function adding() {
    const fav = document.querySelector('.favorites-container')! as HTMLElement;
    const col = document.querySelector('.collection-container')! as HTMLElement;
    const cards = document.querySelectorAll(`.card`);
    for (const card of cards) {
        const likeBtn = card.querySelector('.fa-folder-plus')! as HTMLElement;
        const disLikeBtn = card.querySelector('.fa-trash')! as HTMLElement; // get all switcher buttons inside the current card

        likeBtn?.addEventListener('click', function(this: any) {
            fav.append(card);
            console.log(card);
            const switcherBtn = card.querySelectorAll('.switcher-btn');
            for (const elm of switcherBtn) {
                isActive(elm);
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
}
