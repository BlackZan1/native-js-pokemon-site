import Http from "../Http/Http";
import { createPokemons } from '../Pokemon/PokemonList';
import Loader from "../Assets/Loader";

export default class Search {
    private data: any[];
    private limit: number;
    private isFetching: boolean;
    private children: any[];

    constructor(private modal: Element, private resultsNode: Element) {
        this.isFetching = true;
        this.limit = 10;
        this.children = [];
    }

    private async search(title: string) {
        this.isFetching = true;
        this.data = []; // Clear data
        
        const data = await new Http('http://localhost:2020/graphql').postData('', { query: `
            query {    
                search(title: "${title}") {
                    url
                    name
                }
            }
        ` });

        this.data = data.data.search;
    }

    async init(input: HTMLElement, closeButton: HTMLElement, drop?: HTMLElement, openButton?: HTMLElement): Promise<void> {
        input.addEventListener('change', async (ev: InputEvent | any) => {
            let title: string = ev.currentTarget.value.toLowerCase();

            if(title.length) {
                this.limit = 10;
                this.isFetching = true;

                this.showResults();

                await this.search(title);
                await this.getData();

                this.showResults();
            }
        })

        openButton?.addEventListener('click', () => {
            this.modal.classList.add('active');
        })

        drop?.addEventListener('click', () => {
            this.modal.classList.remove('active');
        })

        closeButton.addEventListener('click', () => {
            this.modal.classList.remove('active');
        })
    }

    private async getData(): Promise<void> {
        this.children = []; // clear node children

        let slicedData = this.data.slice(0, this.limit); // Data with limits

        for await(let i of createPokemons(slicedData)) {
            this.children.push(i);
        }

        this.isFetching = false;
    }

    showResults(): void {
        this.resultsNode.innerHTML = '';

        if(this.isFetching) {
            new Loader('loader').showElement(this.resultsNode);
            
            return;
        }

        this.children.forEach((child: Element) => {
            this.resultsNode.appendChild(child);
        })

        if(this.data.length > this.limit) {
            const moreBtn: HTMLButtonElement = document.createElement('button');
            moreBtn.classList.add('btn-grey');
            moreBtn.textContent = 'More';

            moreBtn.onclick = (ev: Event | any) => {
                ev.currentTarget.disabled = true;

                this.more();
            }

            this.resultsNode.appendChild(moreBtn);
        }
    }

    async more(): Promise<void> {
        this.limit += this.limit;

        await this.getData();

        this.showResults();
    }
}