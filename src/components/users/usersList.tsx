import { Box, Button, Icon, Snackbar } from '@material-ui/core';
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
import { blue, green } from '@material-ui/core/colors';
import { PaginateOptions } from '../../modles/PaginateOptions';


let headCells: HeadCells[] = [];


const userService = new UserService();
const fundService = new FundService();
const UsersList = () => {
    const { isShowing, toggle } = useModal();
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);

    const [funds, setFunds] = useState<any[]>([]);

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
        headCells = [{ id: "name", label: "שם", numeric: false, disablePadding: false },
        { id: "father_name", label: "שם האב", numeric: false, disablePadding: true },
        { id: "status", label: "סטטוס", numeric: false, disablePadding: true },
        { id: "vip", label: "vip", numeric: false, disablePadding: true },
        { id: "allowed", label: "חבר", numeric: false, disablePadding: false },
        { id: "tz", label: "תז", numeric: false, disablePadding: false },
        ]
        fundService.get().then(
            res => {
                res.data.docs.map((doc: any) => {
                    headCells.push({ id: doc.nameId, label: doc.name, numeric: false, disablePadding: false, enableSorting: false });
                    funds.push(doc.nameId);
                });
                setFunds(funds);
            }
        )

    }, [])

    useEffect(() => {
        let paginateOptions = new PaginateOptions();
        paginateOptions.sort = { last_name: 1, first_name: 1 };
        paginateOptions.pageNo = 1;
        paginateOptions.pageSize = 11;
        getUsers(paginateOptions);
    }, [funds])

    function getUsers(paginator: PaginateOptions) {


        userService.paginator(paginator).then(
            (res: any) => {
                let users = res.data["docs"];
                setPage(res.data.page - 1);
                setCount(res.data.total);
                setRowsPerPage(res.data.limit)
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
    }

    const newUser: User = new User();
    return (
        <div>
            <div className="w-90 m-u">
                <h2 className="txt-blue inline">רשימת משתמשים</h2>
                <Icon className="inline f-l" style={{ color: '#00bcd4c7', fontSize: 30 }} onClick={toggle}>add_circle</Icon>
            </div>
            <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={add} type={"add"} header={"header"} rows={UserControllers} doc={newUser} />
            {rows.length > 0 && <EnhancedTable
                onPaginationChange={getUsers}
                rows={rows} onSelect={onselect}
                headCells={headCells}
                header={"רשימת חברים"}
                rowsPerPage={rowsPerPage}
                page={page}
                count={count} />}
            <Snackbar open={open} autoHideDuration={6000} >
                <Alert onClose={() => setOpen(false)} severity="success">
                    add success!
                </Alert>
            </Snackbar>

        </div>)
}
export default UsersList;