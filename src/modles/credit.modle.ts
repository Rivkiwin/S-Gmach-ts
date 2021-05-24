export class BankDetails {
    _id: string = '';
    userId: string = '';
    owner: string = '';
    ownerId: string = '';
    last_numbers: string = "";
    date: string = '';
    token: string = '';
    cvv: string = '';

}

export const BankDetailsControllers = [
    { name: "last_numbers", label: "מספר כרטיס", type: "text", required: true },
    { name: "cvv", label: "3 ספרות אחוריות", type: "text", required: true },
    { name: "date", label: "תוקף", type: "text", required: true },
    { name: "ownerId", label: "תז בעלים", type: "text", required: true },
    { name: "owner", label: "שם בעלי הכרטיס", type: "text", required: true }
];