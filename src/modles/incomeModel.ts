import { PaymentsMethod } from "./paymentsMethod.model";
import { Status } from "./status";

export class IncomeModel {
    data: Date = new Date();
    amount: number = 0;
    payment_method: string = 'cash';
    from: string = '';
    remarks: string = '';
    status: string = '';

}

export const IncomeControllers =
    [
        [
            { name: "data", label: "תאריך", type: "date", required: true },
            { name: "amount", label: "סכום", type: "number", required: true },
            { name: "payment_method", label: "צורת תשלום", type: "select", required: true, options: [...PaymentsMethod] },
            { name: "from", label: "התקבל מ:", type: "text", required: true },
            { name: "status", label: "סטטוס:", type: "select", required: true, options: Status },

        ],
        [{ name: "remarks", label: "הערות", type: "textArea", required: false }]
    ]
