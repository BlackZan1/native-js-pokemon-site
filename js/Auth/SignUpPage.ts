import Form from '../Form/Form';
import Validator from '../Form/Validator';
import Auth from './Auth';

import '../Form/form.css';

interface iSignUpData {
    email: string
    password: string
    fullname: string
}

export default class SignUpPage {
    private data: iSignUpData;
    private errors: any;
    private currentNode: Element;
    private form: Form

    constructor() {
        this.errors = {};

        this.data = {
            email: '',
            password: '',
            fullname: ''
        }
    }

    private initForm(container: Element) {
        this.form = new Form(container);

        this.form.createInput({name: 'email', type: 'email', className: 'input-white'}, 'Email');
        this.form.createInput({name: 'fullname', type: 'text', className: 'input-white'}, 'Fullname');
        this.form.createInput({name: 'password', type: 'password', className: 'input-white'}, 'Password');

        this.form.createButton('btn-grey', 'Sign up');

        const children = this.form.getChildren();

        this.init(children[0], children[2], children[1], children[3]);

        this.form.createForm('auth-form', 'Welcome to Pokemon Web Battle!');
    }

    private init(emailInput: Element, passwordInput: Element, nameInput: Element, button: Element) {
        emailInput.addEventListener('change', (ev: Event | any) => {
            let value = ev.target.value;

            this.data['email'] = value; 
        })

        passwordInput.addEventListener('change', (ev: Event | any) => {
            let value = ev.target.value;

            this.data['password'] = value; 
        })

        nameInput.addEventListener('change', (ev: Event | any) => {
            let value = ev.target.value;

            this.data['fullname'] = value; 
        })

        button.addEventListener('click', () => {
            this.submit();
        })
    }

    private async submit(): Promise<void> {
        console.log(this.data);

        const validator = new Validator(this.data);
        const errors = validator.init();
        const auth = new Auth();

        if(Object.values(errors).some((i: string) => i.length > 0)) {
            console.log(Object.keys(errors).length);

            console.log('Errors!');

            this.form.setErrors(errors);
            // this.update();

            return;
        }

        console.log(errors);

        const result: any = await auth.signup(this.data.email, this.data.fullname, this.data.password);

        if(result.errors.length) {
            this.errors['result'] = result.errors[0].message;

            this.update();
        }
    }

    update() {
        this.currentNode.innerHTML = '';

        this.data = {
            email: '',
            password: '',
            fullname: ''
        }

        this.showElement(this.currentNode);
    }

    showElement(node: Element): void {
        this.currentNode = node;

        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('sign-up');

        this.initForm(container);

        if(this.errors.result) {
            const errorTitle = document.createElement('p');
            errorTitle.textContent = this.errors.result;
            errorTitle.classList.add('error-title');

            container.append(errorTitle);
        }

        node.appendChild(container);
    }
}