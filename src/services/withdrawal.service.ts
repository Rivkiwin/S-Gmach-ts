import axios from "axios";
import { BaseService } from "./baseService";

export class WithdrawalService extends BaseService {
    
    constructor() {
        super("withdrawal");
    }

    // async getByUser(id:string)
    // {
    //     let res=await axios.get(`${this.baseUrl}deposit/getByUser/${id}`);
    //     return res
    // }
}

export default WithdrawalService;