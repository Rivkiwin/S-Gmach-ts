import { maritalStatus, UserStatus } from "../../modles/status";
import { controller } from "../model/create-update";

export const UserControllers: controller[][] = [
    [
        { name: "first_name", label: "שם פרטי", type: "text", required: true },
        { name: "last_name", label: "שם משפחה", type: 'text', required: true },
        { name: "father_name", label: "שם האב", type: 'text' },
        { name: "DateOfBirth", label: "תאריך לידה", type: 'date' },
        { name: "tz", label: "תז", type: 'text' },
        { name: "maritalStatus", label: "מצב אישי", type: "select", options: [...maritalStatus] }
    ],
    [{ name: "street", label: "רחוב", type: "text" },
    { name: "num_street", label: "מספר רחוב", type: "text" },
    { name: "house", label: "בית", type: "number" },
    { name: "city", label: "עיר", type: "text" },
    { name: "phon", label: "טלפון", type: "text" },
    { name: "phon2", label: "טלפון2", type: "text" },
    { name: "email", label: "איימל", type: "email" },],
    [
        { name: "vip", label: "vip", type: "checkBox" },
        { name: "allowed", type: "checkBox", label: "חבר" }
    ],
    // joined_date: "תאריך הצטרפות",
    // manager_permissions: "הרשאות מנהל",
    // scoring: "ניקוד",
    [
        { name: "status", label: "סטטוס", type: "select", options: [...UserStatus] },
        { name: "statusReason", label: "סיבת הסטטוס", type: "text" }
    ],

]