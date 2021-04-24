import axios from "axios";
import { BaseService } from "./baseService";

export class DepositService extends BaseService {
    
    constructor() {
        super("deposits");
    }

    async getByUser(id:string)
    {
        let res=await axios.get(`${this.baseUrl}deposit/getByUser/${id}`);
        return res
    }
}

export default DepositService