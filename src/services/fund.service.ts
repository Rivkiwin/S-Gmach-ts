import axios from "axios";
import { BaseService } from "./baseService";

export class FundService extends BaseService {
    
    constructor() {
        super("fund");
    }

    async getByUser(id:string)
    {
        let res=await axios.get(`${this.baseUrl}uif/getByUser/${id}`);
        return res
    }
}

export default FundService