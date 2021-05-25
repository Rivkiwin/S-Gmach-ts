import { CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { creatDetailsMod } from '../../modles/details.modle';
import { maritalStatus, UserStatus } from '../../modles/status';
import { UserService } from '../../services/userService';
import Details from '../model/details';
import FundsUser from './fundUsers';
import { t } from './t';



const userService = new UserService();


const UserD = ({ id, uif }: any) => {
    const [userDetails, setDetails] = useState<any>([]);
    const [User, setUser] = useState<any>({})

    useEffect(() => {
        userService.getById(id).then(
            res => {
                setUser(res.data)
            })
    }, []

    )

    useEffect(() => {
        let details: any[] = [];
        let _user = { ...User };
        delete _user.__v;
        _user.status = UserStatus.find(s => s.value == User.status)?.label;
        _user.maritalStatus = maritalStatus.find(s => s.value == User.maritalStatus)?.label;
        _user.allowed = User.allowed ? 'v' : 'x';
        _user.updatedAt = User.updatedAt?.split('T')[0];
        _user.DateOfBirth = User.DateOfBirth?.split('T')[0];
        _user.createdAt = User.createdAt?.split('T')[0];
        _user.vip = User.vip ? 'v' : 'x';
        Object.keys(_user).map((key: any) => {
            details.push({ name: t[key], value: _user[key] });
        });
        console.log(details);
        setDetails(creatDetailsMod(details, 4));
    }, [User])

    return (
        <CardContent>
            <div id="details">
                <Details doc={userDetails} />
                <h3 className="txt-cyan">{t.funds}</h3>
                {uif && <FundsUser uif={uif} />}
            </div>
        </CardContent>
    )
}
export default UserD;