import { pokemon } from "./fetch";

const container = document.querySelector('.collection-container')! as HTMLElement;

export function renderCard(data: pokemon) {
    const html = `
            <div class="card" id="${data.name}">
                <div class="card-body">
                    <div class="card-header">
                        <h3>${data.name}</h3>
                        <h3><span><i class="fa-solid fa-heart"></i></span> Hp ${data.hp}</h3>
                    </div>
                    <div class="card-img">
                        <img src="${data.image}" alt="">
                    </div>
                    <div class="description-section">
                        <h3>Attack: ${data.abilitie}</h3>
                        <h3>Xp: ${data.xp}</h3>
                        <h3>Type: ${data.type}</h3>
                    </div>
                    <div class="icon-container">
                        <span class="switcher-btn active"><i class="fa-solid fa-folder-plus"></i></span>
                        <span class="switcher-btn"><i class="fa-sharp fa-solid fa-trash"></i></span>
                    </div>
                </div>
            </div>
    `;
    container?.insertAdjacentHTML('beforeend', html);
} 