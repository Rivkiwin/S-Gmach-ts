export class BankDetails{
    _id:string='';
    branch: string='';
    bank: string='';
    account: string='';
    owner: string="";
    userId: string='';
    userName:string='';
}

export const BankDetailsControllers=[
    { name: "bank", label: "שם הבנק", type: "text", required: true },
    { name: "branch", label: "סניף", type: "text", required: true },
    { name: "account", label: "מספר חשבון", type: "text", required: true },
    { name: "owner", label: "שם בעל החשבון", type: "text", required: true }
];