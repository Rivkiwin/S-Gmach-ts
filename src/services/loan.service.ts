import { BaseService } from "./baseService";

export class LoanService extends BaseService {

    constructor() {
        super("loan");
    }
}
export const loanService = new LoanService();

export class RepaymentsService extends BaseService {

    constructor() {
        super("repayment");
    }
}
export const repaymentsService = new RepaymentsService();