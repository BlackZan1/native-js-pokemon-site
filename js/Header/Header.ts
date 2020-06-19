import User from '../User/User';

export default class Header {
    private navLinks: any[];
    private searchBtn: Element

    constructor(links: any[]) {
        this.navLinks = links;
    }

    setSearchBtn(element: any) {
        this.searchBtn = element;
    }

    showElement(node: Element, token?: string) {
        const header: HTMLElement = document.createElement('header');
        header.classList.add('header');

        this.navLinks.forEach(link => {
            if(token) {
                if(link.href === '#signUp' || link.href  === '#login') {
                    return;
                }
            }

            if(!token) {
                if(link.href === '#home') return;
            }

            const linkItem = document.createElement('a');
            linkItem.href = link.href;
            linkItem.textContent = link.content;

            header.appendChild(linkItem);
        })

        header.appendChild(this.searchBtn);

        node.prepend(header);
    }
}