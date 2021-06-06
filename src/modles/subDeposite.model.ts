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
    fundId: string = "";
    userId: string = "";
}


export const GetSubDepositControllers = (id: string) => {
    let depositService = new DepositService();
    let options: any[] = [];
    depositService.get({isOptions:true,}).then(
        res => {
            debugger
            if (res) {
                res.data.map((d: any) => {
                    debugger
                    console.log(d)
                    options.push({ label: d.depositName, value: d._id });
                    console.log(options)
                }
                )
            }
        })

    return [
        [
            { name: "type", label: "סוג", type: "select", required: true, options: [...types] },
            { name: "depositName", label: "שם ההפקדה", type: "text", required: true },
            { name: " payment_method", label: "צורת הפקדה", type: "select", required: true , options: [...PaymentsMethod]},
            { name: "fundId", label: "עבור קרן", type: "select", required: true, options: options },
        ]
    ]
}



