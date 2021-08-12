import { controller } from "../components/model/create-update";
import FundService from "../services/fund.service";
import { PaymentsMethod } from "./paymentsMethod.model";
const types = [
    { value: "ManagerDeposit", label: "הפקדת מנהל" },
    { value: "disposable", label: "חד פעמי" },
    { value: "monthly", label: "חודשי" },
]

export class Deposit {
    amount: number = 0;
    type: string = "";
    payment_method: string = "cash";
    fundId: string = "";
    userId: string = "";
}


export const GetDepositControllers = (id: string) => {
    let fundService = new FundService();
    let options: any[] = []
    fundService.getByUser(id).then(
        res => {
     
            if (res.data.success) {
                res.data.funds.map((f: any) => {
                   
                    console.log(f)
                    options.push({ label: f.fundName, value: f.uf.fundId });
                    console.log(options)
                }
                )
            }
        })

    return [
        [
            { name: "type", label: "סוג", type: "select", required: true, options: [...types] },
            { name: "depositName", label: "שם ההפקדה", type: "text", required: true },
            { name: "payment_method", label: "צורת הפקדה", type: "select", required: true , options: [...PaymentsMethod]},
            { name: "fundId", label: "עבור קרן", type: "select", required: true, options: options },
        ]
    ]
}



