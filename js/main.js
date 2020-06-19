import PokemonList from './PokemonList.ts';
import Search from './Search.ts';
import PokemonPage from './PokemonPage.ts';
import SignUpPage from './SignUpPage.ts';
import LoginPage from './LoginPage.ts';
import Router from './Router.ts';
import Header from './Header/Header.ts';
import LS from './Assets/LocalStorage.ts';
import User from './User.ts';

import searchIMG from '../img/search.svg';

import '../index.css';

const main = document.querySelector('.main');
const DOMcontainer = document.querySelector('#app');

const app = () => {
    const { token } = new LS('pwb').get('_t');
    const user = new User();

    if(!!token) user.setToken(token);

    const searchBtn = document.createElement('img');
    searchBtn.id = 'o-search';
    searchBtn.src = searchIMG;
    searchBtn.classList.add('search-open-btn');

    const header = new Header([
        { href: '#list', content: 'Pokemons' },
        { href: '#signUp', content: 'Sign up' }, 
        { href: '#login', content: 'Login' }
    ]);
    header.setSearchBtn(searchBtn);
    header.showElement(main, user.token);

    const router = new Router(DOMcontainer);
    const pokemonList = new PokemonList(20, 0);
    const pokemonPage = new PokemonPage();
    const signUpPage = new SignUpPage();
    const loginPage = new LoginPage();

    router.init();

    let routes = [
        {path: '#list', content: pokemonList}, 
        {path: '#pokedex/:id', content: pokemonPage}, 
        {path: '#signUp', content: signUpPage},
        {path: '#login', content: loginPage}
    ];

    routes.forEach(route => {
        router.setRoute(route);
    })

    router.initRoutes();

    const modal = document.querySelector('#modal');
    const searchResults = document.querySelector('#s-results');

    const search = new Search(modal, searchResults);
    search.init(
        document.querySelector('input#search'), 
        document.querySelector('button#close'), 
        document.querySelector('search-drop'),
        document.querySelector('img#o-search')
    );
}

app();

// (
//     async () => {
//         const data = await new Http('https://pokeapi.co/api/v2/type/12/').getData();

//         console.log(data);
//     }
// )();