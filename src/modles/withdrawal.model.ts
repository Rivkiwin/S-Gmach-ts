import FundService from "../services/fund.service";
import { PaymentsMethod } from "./paymentsMethod.model";
import { Status } from "./status";

export class Withdrawal {
    amount: number = 0;
    date: Date = new Date();
    fundId: string = '';
    userId: string = '';
    status: string = '';
    cnt: number = 1;
}

export const GetWithdrawalControllers = (id: string) => {
    let fundService = new FundService();
    let options: any[] = []
    fundService.getByUser(id).then(
        res => {
            debugger
            if (res.data.success) {
                res.data.funds.map((f: any) => {
                    debugger
                    console.log(f);
                    debugger
                    console.log(f.uf.balance - f.futureWithdrawals, "cccc")
                    options.push({ label: `${f.fundName} (${f.uf.balance - f.futureWithdrawals})`, value: f.uf.fundId });
                    console.log(options)
                }
                )
            }
        })

    return [
        [
            { name: "amount", label: "סכום", type: "number", required: true },
            { name: "payment_method", label: "צורת משיכה", type: "select", required: true, options: [...PaymentsMethod] },
            { name: "fundId", label: "מקרן", type: "select", required: true, options: options },
            { name: "date", label: "תאריך", type: "date", required: true, options: options },
            { name: "cnt", label: "כפול", type: "number", required: true },
            { name: "status", label: "סטטוס", type: "select", required: true, options: Status },
        ]
    ]
}