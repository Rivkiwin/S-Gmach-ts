import axios from "axios";
import { BaseService } from "./baseService";

export class UserService extends BaseService {
    
    constructor() {
        super("user");
    }

    getByFund()
    {

    }

    async getFunds(id:string)
    {
        let res=await axios.get(`${this.baseUrl}uif/getByUser/${id}`);
        return res
    }
}