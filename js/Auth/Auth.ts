import Http from "../Http/Http";

interface iAuthData {
    email: string
    password: string
}

interface iAuthToken {
    t: string
}

export default class Auth {
    data: iAuthData;

    constructor() {
        this.data = {
            email: '',
            password: ''
        };
    }

    async login(email: string, password: string): Promise<any> {
        const request = new Http('http://localhost:2020/graphql');
        const result = await request.postData('', { query: `
            query {
                login(input: { email: "${email}", password: "${password}" }) {
                    token
                    tokenExp
                }
            }  
        ` });

        console.log(result);

        return result;
    }

    async signup(email: string, fullname: string, password: string): Promise<any> {
        const request = new Http('http://localhost:2020/graphql');
        const result = await request.postData('', { query: `
            mutation {
                signUp(input: { email: "${email}", fullname: "${fullname}", password: "${password}" }) {
                    email
                    fullname
                    password
                    id
                }
            }
        ` });

        console.log(result);

        return result;
    }

    async me(lsName: string): Promise<any> {    
        let token: iAuthToken = JSON.parse(localStorage.getItem(lsName) || '{}');

        if(token.t) {
            const request = new Http('http://localhost:2020/graphql');
            const result = await request.postData('/me', { 'Authorization': token.t });

            console.log(result);
        }
    }
}