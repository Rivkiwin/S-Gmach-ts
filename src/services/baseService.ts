// import axios from "axios";
// import { PaginateOptions } from "../modles/PaginateOptions";

import axios from "axios";
import { PaginateOptions } from "../modles/PaginateOptions";

export class BaseService {
    protected baseUrl = "http://localhost:5000/";
    protected path: string;

    constructor(path: string) {
        this.path = this.baseUrl + path;
    }

    async get(query?:any) {
        let res = await axios.get(`${this.path}`,{params:{query:query}});
        return res;
    }
    async paginator(paginator:PaginateOptions) {
        let res = await axios.get(`${this.path}`,{params:paginator});
        return res;
    }
    async getById(id: string) {
        let res = await axios.get(`${this.path}/${id}`);
        console.log(res);
        return res;
    }

    async add(doc: any) {
        let res = await axios.post(`${this.path}`, doc);
        return res;
    }

    async update(doc: any) {
        let res = await axios.put(`${this.path}/${doc._id}`, doc);
       
        return res;
    }
}