import DepositService from "../services/deposit.service";
import FundService from "../services/fund.service";
import { PaymentsMethod } from "./paymentsMethod.model";
import { Status } from "./status";

export class Withdrawal {
    amount: number = 0;
    date: Date = new Date();
    fundId: string = '';
    userId: string = '';
    status: string = '';
    depositId:string='';
    cnt: number = 1;
}

export const GetWithdrawalControllers = (id: string) => {
    let depositService = new DepositService();
    let options: any[] = []
    depositService.get({userId:id},true).then(
        res => {
            debugger
            if (res.data) {
                res.data.docs.map((d: any) => {
                    debugger
                    console.log(d);
                    debugger
                    options.push({ label: `${d.depositName} (${d.amount})`, value: d._id });
                    console.log(options)
                }
                )
            }
        })

    return [
        [
            { name: "amount", label: "סכום", type: "number", required: true },
            { name: "payment_method", label: "צורת משיכה", type: "select", required: true, options: [...PaymentsMethod] },
            { name: "depositId", label: "מהפקדה", type: "select", required: true, options: options },
            { name: "date", label: "תאריך", type: "date", required: true, options: options },
            { name: "cnt", label: "כפול", type: "number", required: true },
            { name: "status", label: "סטטוס", type: "select", required: true, options: Status },
        ]
    ]
}