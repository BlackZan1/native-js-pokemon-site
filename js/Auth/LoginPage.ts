import Form from '../Form/Form';
import Validator from '../Form/Validator';
import Auth from './Auth';
import User from '../User/User';

import './form.css';

interface iLoginData {
    email: string
    password: string
}

export default class LoginPage {
    private data: iLoginData;
    private errors: any;
    private currentNode: Element;
    private form: Form;

    constructor() {
        this.errors = {};

        this.data = {
            email: '',
            password: ''
        }
    }

    private initForm(container: Element) {
        this.form = new Form(container);

        this.form.createInput({name: 'email', type: 'email', className: 'input-white'}, 'Email');
        this.form.createInput({name: 'password', type: 'password', className: 'input-white'}, 'Password');

        this.form.createButton('btn-grey', 'Log in');

        const children = this.form.getChildren();

        this.init(children[0], children[1], children[2]);

        this.form.createForm('auth-form', 'Log in and let\'s go!');
    }

    private init(emailInput: Element, passwordInput: Element, button: Element) {
        emailInput.addEventListener('change', (ev: Event | any) => {
            let value = ev.target.value;

            this.data['email'] = value; 
        })

        passwordInput.addEventListener('change', (ev: Event | any) => {
            let value = ev.target.value;

            this.data['password'] = value; 
        })

        button.addEventListener('click', async () => {
            await this.submit();    
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

        const result: any = await auth.login(this.data.email, this.data.password);

        debugger;

        if(result.errors) {
            this.errors['result'] = result.errors[0].message;

            return this.update();
        }

        console.log(result);

        const user = new User();
        user.setToken(result.data.login.token);

        location.reload();
    }

    update() {
        this.currentNode.innerHTML = '';

        this.data = {
            email: '',
            password: ''
        }

        this.showElement(this.currentNode);
    }

    showElement(node: Element): void {
        this.currentNode = node;

        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('log-in');

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