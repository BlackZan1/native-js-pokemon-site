import LS from '../Assets/LocalStorage';

interface iUserData {
    email: string
    fullname: string
}

export default class User {
    token: string;
    data: iUserData;
    private isAuth: boolean;

    constructor() {
        this.isAuth = false;
    }

    setToken(token: string) {
        this.token = token;

        new LS('pwb').set({token}, '_t');
    }

    setData(data: iUserData) {
        this.data = data;

        this.toggleIsAuth();
    }

    toggleIsAuth() {
        this.isAuth = !this.isAuth;
    }
}