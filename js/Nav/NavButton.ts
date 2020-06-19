export default class NavButtons {
    constructor(private node: Element) {}

    showPageBtn(handler: Function, text?: string): void {
        const button = document.createElement('button');
        button.classList.add('btn-grey');
        
        if(text) {
            button.textContent = text;
        }
        else button.textContent = 'Next >';

        button.onclick = () => handler();

        this.node.appendChild(button);
    }
}