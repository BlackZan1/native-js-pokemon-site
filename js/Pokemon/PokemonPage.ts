import { Pokemon } from "./Pokemon";
import { getPaletteColors, fixName } from '../Assets/utils.js';
import Http from "../Http/Http";

export default class PokemonPage {
    data: any;

    constructor() {
        this.data = {};
    }   

    async getData(id: string): Promise<any> {
        const currentPokemon: any = await new Pokemon().getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
        this.data = currentPokemon;

        console.log(this.data);

        return this.data;
    }

    protected async getSpeciesData(url: string) {
        const species: any = await new Http(url).getData();

        console.log(species);
    }

    public showElement(node: Element): void {
        const container: Element = document.createElement('div');

        const frontImage: HTMLImageElement = document.createElement('img');
        frontImage.src = this.data.sprites.front_default;
        frontImage.crossOrigin = "Anonymous"; // XD !!!

        const backImage: HTMLImageElement = document.createElement('img');
        backImage.src = this.data.sprites.back_default;
        backImage.crossOrigin = "Anonymous"; // XD !!!

        const shinyImage: HTMLImageElement = document.createElement('img');
        shinyImage.src = this.data.sprites.front_shiny;
        shinyImage.crossOrigin = "Anonymous"; // XD !!!

        const pokemonName = document.createElement('h1');
        pokemonName.textContent = fixName(this.data.name);

        frontImage.addEventListener('load', (ev: Event) => {
            const colors = getPaletteColors(ev.currentTarget);

            pokemonName.style.color = colors[0];
        })

        container.append(frontImage, backImage, shinyImage, pokemonName);
        node.append(container);

        this.getSpeciesData(this.data.species.url);
    }
}