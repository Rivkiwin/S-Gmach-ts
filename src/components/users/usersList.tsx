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
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { PaginateOptions } from '../../modles/PaginateOptions';

const filters = [
    { id: 'userName', name: "שם", type: "string" },
    { id: 'father_name', name: 'שם האב', type: "string" },
    { id: 'tz', name: 'ת"ז', type: "string" },
    { id: 'city', name: 'עיר', type: 'string' },
    { id: 'street', name: 'רחוב', type: 'string' },
    { id: 'createdAt', name: 'תאריך יצירה', type: 'date' },
    { id: 'updatedAt', name: 'תאריך עדכון', type: 'date' },


]
let headCells: HeadCells[] = [];
const userService = new UserService();
const fundService = new FundService();

const UsersList = ({onSelect}:any) => {
 
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [funds, setFunds] = useState<any[]>([]);
    const [rows, setRows] = useState([]);
    const history = useHistory();


   
    useEffect(() => {
        headCells = [{ id: "name", label: "שם", numeric: false, disablePadding: false },
        { id: "father_name", label: "שם האב", numeric: false, disablePadding: false },
        { id: "status", label: "סטטוס", numeric: false, disablePadding: false },
        { id: "vip", label: "vip", numeric: false, disablePadding: false },
        { id: "allowed", label: "חבר", numeric: false, disablePadding: false },
        { id: "tz", label: "תז", numeric: false, disablePadding: false },
        { id: "city", label: "עיר", numeric: false, disablePadding: false },
        { id: "street", label: "רחוב", numeric: false, disablePadding: false },
        { id: "updatedAt", label: "תאריך עידכון", numeric: false, disablePadding: false },
        { id: "createdAt", label: "תאריך יצירה", numeric: false, disablePadding: false },
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
        userService.paginator(paginator, null).then(
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
                        vip: user.vip ? <CheckIcon /> : <ClearIcon />,
                        allowed: user.allowed ? <CheckIcon /> : <ClearIcon />,
                        tz: user.tz,
                        city: user.city,
                        street: user.street,
                        createdAt: user.createdAt.slice(0, 10),
                        updatedAt: user.updatedAt.slice(0, 10),
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
        <EnhancedTable
            onPaginationChange={getUsers}
            rows={rows}
            onSelect={onSelect}
            headCells={headCells}
            header={"רשימת חברים"}
            rowsPerPage={rowsPerPage}
            page={page}
            count={count}
            filters={filters}
        />
    )
}
export default UsersList;