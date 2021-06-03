import { loanStatus } from "./status";

let typeLoan = {
    signal: "הלוואת יחיד",
    Many: "הלוואת נשואים"
}
export class Loan {
    _id: string = '';
    numPayments: number = 1;
    numMonth: number = 5;
    paid: number = 0;
    amount: number = 5000;
    dateStart: Date = new Date();
    remarks: string = "";
    score: number = 0;
    status: string = '';
    type: string = "signal";

}

export const loanControllers = [
    [{ name: "amount", label: "סכום", type: "number", required: true },
    { name: "numPayments", label: " מספר תשלומים", type: "number", required: true },
    // { name: "dateStart", label: "תאריך התחלה", type: "date", required: true },
    { name: "status", label: "סטטוס", type: "select", required: true, options: loanStatus },
    ],
    [    { name: "remarks", label: "הערות", type: "textArea", required: true },
]
]