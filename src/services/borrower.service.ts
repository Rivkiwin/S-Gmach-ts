import axios from "axios";
import { BaseService } from "./baseService";

export class BorrowerService extends BaseService {

    constructor() {
        super("borrower");
    }

    async getByLoan(id: string) {
        let res = await axios.get(`${this.path}/getByLoan/:${id}`);
        return res;
    }
}
export const borrowerService=new BorrowerService();