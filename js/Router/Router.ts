// import PokemonList from "./PokemonList";
// import PokemonPage from "./PokemonPage";

interface iRoute {
    path: string
    content: any
}

interface iRouteCallback {
    pattern: RegExp
    content: any
}

export default class Router {
    private routes: iRoute[];
    callbacks: iRouteCallback[];

    constructor(private node: Element) {
        this.routes = [];
        this.callbacks = [];
    }

    setRoute(route: iRoute): void {
        this.routes.push(route);
    }

    init(): void {
        addEventListener('hashchange', (ev: HashChangeEvent) => {
            this.dispatch(location.hash);

            ev.preventDefault();
        }) 

        window.addEventListener('load', () => {
            console.log(location.hash);
    
            this.dispatch(location.hash);
        })
    }

    initRoutes(): void {
        this.callbacks = [];

        this.routes.forEach((route: iRoute) => {
            let content: any = route.content;
            let path: string = route.path;
            let pattern: RegExp = new RegExp('^' + path.replace(/:\w+/g,'(\\w+)') + '$');

            this.callbacks.push({
                pattern,
                content
            })
        })
    }

    async dispatch(hashname: string): Promise<void> {
        this.node.innerHTML = '';

        if(!hashname.length) location.hash = '#list';

        const route = this.callbacks.find(i => hashname.match(i.pattern));

        if(route) {
            const params: any = hashname.match(route.pattern);

            console.log(params[1])

            if(route.content.getData) {
                if(params[1]) await route.content.getData(params[1]); // If id was detected
                else await route.content.getData();     
            }

            route.content.showElement(this.node);
        }
        else {
            location.hash = 'list';
        }
    }
}