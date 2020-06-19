import Http from "../Http/Http";
import { Pokemon } from "./Pokemon";
import NavButton from "../Nav/NavButton";
import Loader from "../Assets/Loader";

export interface iPokemonList {
    name: string
    url: string
}

export async function* createPokemons(pokemons: any) {
    for(let i = 0; i < pokemons.length; i++) {
        let selectedPokemon: any = pokemons[i];
        let pokemon = new Pokemon();

        await pokemon.getData(selectedPokemon.url);

        yield pokemon.showPokemonCard();
    }
}

export default class PokemonList {
    private list: iPokemonList[];
    private children: Element[];
    private updated: boolean;
    private page: number;
    private isFetching: boolean;
    private node: Element;

    constructor(private limit: number = 20, private offset: number = 0, node?: Element) {
        node ? this.node = node : this.node;
        
        this.list = [];
        this.children = [];
        this.page = 1;
        this.isFetching = true;

        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    async getData(): Promise<iPokemonList[]> {
        this.list = [];
        this.children = [];

        const request = new Http('https://pokeapi.co/api/v2');
        const result = await request.getData(`/pokemon?offset=${this.offset}&limit=${this.limit}`);

        this.list = result.results;

        for await (let item of createPokemons(this.list)) {
            this.children.push(item);
        }

        this.isFetching = false;

        return this.list;
    }

    showElement(node: Element): void {
        this.node = node;

        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('container');

        console.log(this.isFetching);

        if(this.isFetching) {
            new Loader('loader').showElement(this.node);

            return;
        }
        else this.node.innerHTML = '';

        const buttons = document.createElement('div');
        buttons.classList.add('btn-row');
        
        if(this.page > 1) {
            new NavButton(buttons).showPageBtn(this.prevPage, '< Prev');
        }

        new NavButton(buttons).showPageBtn(this.nextPage, 'Next >');

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-list');

        this.children.forEach((child: Element) => {
            wrapper.appendChild(child);
        })

        container.appendChild(buttons);
        container.appendChild(wrapper);

        this.node.append(container);
    }

    async nextPage(): Promise<void> {
        this.node.innerHTML = '';
        this.isFetching = true;

        this.update();

        this.offset += this.limit;

        await this.getData();

        console.log(this.list);

        this.page += 1;

        this.update();
    }

    async prevPage(): Promise<void> {
        this.node.innerHTML = '';
        this.isFetching = true;

        this.update();

        this.offset -= this.limit;

        await this.getData();

        console.log(this.list);

        this.page -= 1;

        this.update();
    }

    private update(): void {
        this.updated = true;

        while(this.updated) {
            this.showElement(this.node);

            this.updated = false;
        }
    }
}