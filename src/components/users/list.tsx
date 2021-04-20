import React from 'react'
import { UserStatus } from '../../modles/status';
import { User } from '../../modles/user';
import CreatUpdate, { controller } from '../model/create-update';
import useModal from '../model/useModel';


const UserControllers: controller[][] = [
    [
        { name: "first_name", label: "שם פרטי", type: "text" },
        { name: "last_name", label: "שם משפחה", type: 'text' },
        { name: "father_name", label: "שם האב", type: 'text' },
        { name: "DateOfBirth", label: "תאריך לידה", type: 'date' },
        { name: "maritalStatus", label: "מצב אישי", type: "select" }
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

const UsersList = () => {
    const { isShowing, toggle } = useModal();
    const onsubmit = (data: any) => {
        debugger
        console.log(data);
    }
    const newUser: User = new User();
    return (
        <div>
            <button onClick={toggle}>add</button>
            <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={onsubmit} type={"add"} header={"header"} rows={UserControllers} doc={newUser} />
            userList
        </div>)
}
export default UsersList;