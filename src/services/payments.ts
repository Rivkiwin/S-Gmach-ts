import axios from "axios";
import { BaseService } from "./baseService";

export class LoanService extends BaseService {

    constructor() {
        super("payment");
    }

    async getByLoan(id: string) {
        let res = await axios.get(`${this.path}/getByLoan/:${id}`);
        return res;
    }
}