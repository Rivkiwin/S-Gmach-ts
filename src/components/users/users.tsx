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
import UsersList from './usersList';

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

const Users = () => {
    const history = useHistory();
    const { isShowing, toggle } = useModal();
    const [open, setOpen] = useState(false);

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


    const newUser: User = new User();

    return (
        <div>
            <div className="w-90 m-u">
                <h2 className="txt-blue inline">משתמשים</h2>
                <Icon className="inline f-l" style={{ color: '#00bcd4c7', fontSize: 30 }} onClick={toggle}>add_circle</Icon>
            </div>
            <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={add} type={"add"} header={"header"} rows={UserControllers} doc={newUser} />
            <UsersList onSelect={onselect} />
            <Snackbar open={open} autoHideDuration={6000} >
                <Alert onClose={() => setOpen(false)} severity="success">
                    add success!
                </Alert>
            </Snackbar>

        </div>)
}
export default Users;