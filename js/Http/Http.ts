import Axios, { AxiosResponse } from "axios";

export default class Http {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getData(query: string = ''): Promise<any> {
        let res: AxiosResponse<any> = await Axios.get(this.baseUrl + query);

        return res.data;
    }

    async postData(query: string = '', data: any = {}): Promise<any> {
        let res: AxiosResponse<any> = await Axios.post(this.baseUrl + query, data, { headers: { 'Content-Type': 'application/json' } });

        return res.data;
    }
}