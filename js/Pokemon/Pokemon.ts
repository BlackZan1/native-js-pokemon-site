import Http from "../Http/Http";
import { fixName, getPaletteColors } from "../Assets/utils.js";

import './pokemon.css';

const types = {
    'bug': 'forestgreen',
    'dark': '#323232',
    'dragon': 'royalblue',
    'electric': 'gold',
    'fairy': 'hotpink',
    'fighting': 'sienna',
    'fire': 'crimson',
    'flying': 'paleturquoise',
    'ghost': 'indigo',
    'grass': 'springgreen',
    'ground': 'peru',
    'ice': 'darkturquoise',
    'normal': 'gainsboro',
    'poison': 'darkorchid',
    'psychic': 'mediumvioletred',
    'rock': 'saddlebrown',
    'steel': 'slategray',
    'water': 'deepskyblue',
}

export class Pokemon {
    data: any;

    constructor() {
        this.data = {};
    }

    async getData(url: string) {
        const request = new Http(url);
        const result = await request.getData();

        this.data = result;

        console.log(result);

        return this.data;
    }

    getTypes(): HTMLElement {
        const typesDiv: HTMLElement = document.createElement('div');
        typesDiv.classList.add('pokemon-item-info');
        typesDiv.style.marginTop = '20px';

        this.data.types.forEach((i: any) => {
            let type = document.createElement('div');
            type.classList.add('type');
            type.textContent = i.type.name;
            type.style.background = types[i.type.name];
            type.style.color = '#fff';

            typesDiv.appendChild(type);
        })

        return typesDiv;
    }

    getInfo(card: HTMLElement): HTMLElement {
        const info = document.createElement('div');
        info.classList.add('pokemon-item-info');

        const cardImage: HTMLImageElement = document.createElement('img');
        cardImage.src = this.data.sprites.front_default;
        cardImage.alt = `${this.data.name}...`;
        cardImage.crossOrigin = "Anonymous"; // XD !!!
        cardImage.classList.add('pokemon-item-img');

        const cardTitle: HTMLHeadingElement = document.createElement('h2');
        cardTitle.textContent = fixName(this.data.name);
        cardTitle.classList.add('pokemon-item-title');

        info.append(cardImage, cardTitle);

        cardImage.addEventListener('load', (ev: Event) => {
            const colors = getPaletteColors(ev.currentTarget);
            
            cardTitle.style.color = colors[0];
            card.style.borderBottomColor = `${colors[1]}`;
        })

        return info;
    }

    showPokemonCard(): HTMLElement {
        const card: HTMLAnchorElement = document.createElement('a');
        // Card configs ------------------------
        card.href = `#pokedex/${this.data.id}`;
        card.classList.add('pokemon-item');
        card.draggable = true;

        card.append(this.getInfo(card), this.getTypes());

        return card;
    }
}