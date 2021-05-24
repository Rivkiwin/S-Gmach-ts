import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { maritalStatus, UserStatus } from '../../modles/status';
import { User } from '../../modles/user';
import { UserService } from '../../services/userService';
import CreatUpdate, { controller } from '../model/create-update';
import EnhancedTable from '../model/list/baselist';
import useModal from '../model/useModel';
import { UserControllers } from './arrayController.user';
import { t } from './t';
import { HeadCells } from '../../modles/headCells.model';
import { useHistory } from 'react-router';
import FundService from '../../services/fund.service';


const headCells: HeadCells[] = [
    { id: "name", label: "שם", numeric: false, disablePadding: false },
    { id: "father_name", label: "שם האב", numeric: false, disablePadding: true },
    { id: "status", label: "סטטוס", numeric: false, disablePadding: true },
    { id: "vip", label: "vip", numeric: false, disablePadding: true },
    { id: "allowed", label: "חבר", numeric: false, disablePadding: false },
    { id: "tz", label: "תז", numeric: false, disablePadding: false },
]

const userService = new UserService();
const fundService = new FundService();
const UsersList = () => {
    const { isShowing, toggle } = useModal();
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const history = useHistory();

    const add = async (data: any) => {
        console.log(data);
        let res = await userService.add(data);
        console.log(res);
        if (res.status == 200) {
            toggle();
            setOpen(true);
        }
    }

    function onselect(user: any) {
        history.push({ pathname: `/UserDetails/${user._id}` })
    }
    useEffect(() => {
        let funds: any[] = [];
        fundService.get().then(
            res => {
                res.data.docs.map((doc: any) => {
                    headCells.push({ id: doc.nameId, label: doc.name, numeric: false, disablePadding: false });
                    funds.push(doc.nameId)
                })
            }
        )
        userService.get().then(
            (res: any) => {
                let users = res.data["docs"];
                users = users.map((user: any) => {
                    let u: any =
                    {
                        name: `${user.last_name} ${user.first_name}`,
                        father_name: user.father_name,
                        status: UserStatus.find(s => s.value == user.status)?.label,
                        vip: user.vip ? "V" : "X",
                        allowed: user.allowed ? "V" : "X",
                        tz: user.tz,
                        _id: user._id
                    }
                    funds.map(f => {
                        u[f] = user[f] ?? "-"
                    })
                    return u
                });
                setRows(users);
            }
        )
    }, [])

    const newUser: User = new User();
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={toggle}>{t.add}</Button>
            <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={add} type={"add"} header={"header"} rows={UserControllers} doc={newUser} />
            userList
            {rows.length > 0 && <EnhancedTable rows={rows} onSelect={onselect} headCells={headCells} header={"רשימת חברים"}/>}
            <Snackbar open={open} autoHideDuration={6000} >
                <Alert onClose={() => setOpen(false)} severity="success">
                    add success!
                </Alert>
            </Snackbar>

        </div>)
}
export default UsersList;