export class Loan {
    _id: string = '';
    numPayments: number = 1;
    numMonth: number = 5;
    paid: number = 0;
    amount: number = 0;
    dateStart: Date = new Date();
    remarks: string = "";
    score: number = 0;
    status: string = '';

}

export const loanControlers = [
    { name: "numPayments", label: " מספר תשלומים", type: "number", required: true },
    { name: "numMonth", label: "חודשים", type: "number", required: true },
    { name: "amount", label: "סכום", type: "number", required: true },
    { name: "dateStart", label: "תאריך התחלה", type: "date", required: true },
    { name: "remarks", label: "הערות", type: "text", required: true },
    { name: "status", label: "סטטוס", type: "text", required: true },

]