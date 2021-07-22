import { Button, Icon } from '@material-ui/core';
import React, { useState } from 'react'
import { GetSubDepositControllers, SubDeposit } from '../../modles/subDeposite.model';
import CreatUpdate from '../model/create-update';
import useModal from '../model/useModel';

const SubDepositCU = ({ _subDeposit, deposit }: any) => {
    const { isShowing, toggle } = useModal();
    const [_SubDeposit, setSubDeposit] = useState(_subDeposit ? _subDeposit : new SubDeposit());
    const Update = (subD: SubDeposit) => {
        console.groupCollapsed(subD);
    }

    const Add = (subD: SubDeposit) => {
        subD.depositId = deposit._id;
        console.groupCollapsed(subD);

    }
    const onSubmit = _subDeposit ? Update : Add;
    return (
        <>
            <h2>{deposit?.depositName}</h2>
            <Icon className="inline f-l" style={{ color: '#00bcd4c7', fontSize: 30 }} onClick={toggle}>add_circle</Icon>
            {/* <Button variant="outlined" color="primary" onClick={() => { debugger; toggle(); }}>{"הוסף תת הפקדה"}</Button> */}
            <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={onSubmit}
                type={"creat"} header={"header"} rows={GetSubDepositControllers} doc={_SubDeposit} />
        </>)
}
export default SubDepositCU;