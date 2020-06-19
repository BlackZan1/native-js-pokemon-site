export default class Validator {
    private errors: any;

    constructor(private data: any) {
        this.errors = {};
    }

    init() {
        this.errors = {};

        for(let i in this.data) {
            console.log(this.data);

            const inputName = i.toLowerCase();

            if(!this.data[i]) {
                this.errors[i] = 'This field is required';
            }

            if(inputName === 'email') {
                if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.data[i])) {
                    this.errors[i] = 'Invalid email';
                }
            }

            if(inputName === 'password') {
                console.log(i, this.data[i])

                if(this.data[i].length > 32) {
                    this.errors[i] = 'Password has to be less than 32 symbols';
                }
                else if(this.data[i].length < 8) {
                    this.errors[i] = 'Password has to be more than 8 symbols'; 
                } 
            }
        }

        console.log(this.errors)

        return this.errors;
    }
}