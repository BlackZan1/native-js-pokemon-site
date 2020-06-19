interface iFormHandler {
    event: any | string
    callback: any | Function
}

interface iFormOptions {
    placeholder?: string
    name: string
    type: string
    className: string
}

export default class Form {
    private children: Element[];
    private form: HTMLFormElement;

    constructor(private node: Element) {
        this.children = [];
        this.form = document.createElement('form');
    }

    createInput(formOptions: iFormOptions, labelText?: string, handler?: iFormHandler): void {
        const formBlock: HTMLElement = document.createElement('div');
        formBlock.classList.add('form-block');

        const input: HTMLInputElement = document.createElement('input');
        input.name = formOptions.name;
        input.classList.add(formOptions.className);
        input.type = formOptions.type;
        
        if(formOptions.placeholder) {
            input.placeholder = formOptions.placeholder;
        }

        if(!!labelText) {
            const label = document.createElement('label');
            label.textContent = labelText;

            formBlock.append(label);
        }

        if(!!handler) {
            input.addEventListener(handler.event, handler.callback);
        }

        formBlock.append(input);

        this.children.push(formBlock);
    }

    createButton(className: string, textContent: string, handler?: iFormHandler): void {
        const button = document.createElement('button');
        button.textContent = textContent;
        button.classList.add(className);
        button.style.marginTop = '20px';

        if(!!handler) {
            button.addEventListener(handler.event, handler.callback);
        }

        this.children.push(button);
    }

    // protected init() {

    // }

    createForm(className?: string, title?: string, handler?: iFormHandler): void {
        if(!!className) this.form.classList.add(className);

        if(!!title) {
            const formTitle = document.createElement('div');
            formTitle.classList.add('form-title');
            formTitle.textContent = title;

            this.form.appendChild(formTitle);
        }

        this.form.addEventListener('submit', (ev: Event) => ev.preventDefault());

        if(!!handler) {
            this.form.addEventListener(handler.event, handler.callback);
        }

        this.children.forEach((child: Element) => {
            this.form.appendChild(child);
        })

        this.node.append(this.form);
    }

    getChildren(): Element[] {
        return this.children;
    }

    setErrors(errors: any) {
        console.log(errors)

        for(let i in errors) {
            this.children.forEach((child: HTMLElement, index: number) => {
                if(child.tagName === 'BUTTON') return;

                const input: Element & any = child.children[1];
                const error: Element = child.children[2];

                console.log(error);

                if(!!input.name) {
                    if(i === input.name) {
                        const errorTitle = document.createElement('p');
                        errorTitle.classList.add('error-title');
                        errorTitle.textContent = errors[i];

                        if(!!error) child.removeChild(error);

                        this.children[index].appendChild(errorTitle);
                    }
                    else {
                        if(!!error) child.removeChild(error);
                    }
                }
            })
        }

        this.createForm();
    }
}