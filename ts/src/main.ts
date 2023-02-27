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

const collectionPokemon: pokemon[] = [];
const favoritePokemons: pokemon[] = [];

iterate(4);

const main = async () => {
    const allPokemon = await Promise.all(pokemonData);
    allPokemon.map(pokemon => collectionPokemon.push(pokemon))
    collectionPokemon.map(pokemon => renderCard(pokemon));
    liked();
    
};

main();

function liked() {
    const liked = document.querySelectorAll('.liked');
    for (const elm of liked) {
        elm.addEventListener('click', function(this: any) {
            const card = this.parentElement.parentElement.parentElement;
            const favContainer = document.querySelector('.fav-container')! as HTMLElement;
            favContainer?.append(card);
        });
    }
};

function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    };
    return arr;
};
