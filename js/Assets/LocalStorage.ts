export default class LS {
    constructor(public storageName: string) {}

    set(data: any, extraContent?: string): void {
        let fullStorageName: string = this.storageName;

        if(extraContent) fullStorageName += extraContent;

        localStorage.setItem(fullStorageName, JSON.stringify(data));
    }

    get(extraContent?: string): any {
        let fullStorageName: string = this.storageName;

        if(extraContent) fullStorageName += extraContent;

        const data: any = JSON.parse(localStorage.getItem(fullStorageName) || '{}');

        return data;
    }

    remove(extraContent?: string) {
        let fullStorageName: string = this.storageName;

        if(extraContent) fullStorageName += extraContent;

        localStorage.removeItem(fullStorageName);
    }
}