import { BaseService } from "./baseService";

export class LoanService extends BaseService {
    
    constructor() {
        super("loan");
    }
}
export const loanService=new LoanService();