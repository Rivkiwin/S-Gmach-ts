import { BaseService } from "./baseService";

export class IncomeService extends BaseService{
    constructor() {
        super("income");
    }
}

export  const incomeService=new IncomeService();