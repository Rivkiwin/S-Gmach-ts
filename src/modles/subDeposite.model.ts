import { controller } from "../components/model/create-update";
import DepositService from "../services/deposit.service";
import FundService from "../services/fund.service";
import { PaymentsMethod } from "./paymentsMethod.model";
const types = [
    { value: "ManagerDeposit", label: "הפקדת מנהל" },
    { value: "disposable", label: "חד פעמי" },
    { value: "monthly", label: "חודשי" },
]

export class SubDeposit {
    amount: number = 0;
    type: string = "";
    payment_method: string = "cash";
    userId: string = "";
    remarks: string = '';
    depositId: string = '';
}


export const GetSubDepositControllers =
   [ [
        { name: "amount", label: "סכום", type: "number", required: true },
        { name: "payment_method", label: "צורת הפקדה", type: "select", required: true, options: [...PaymentsMethod] },
        { name: "remarks", label: "הערות", type: "text", required: false },
    ]];




