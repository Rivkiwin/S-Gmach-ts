import { Icon } from '@material-ui/core';
import { type } from 'node:os';
import React from 'react'
import { IncomeControllers, IncomeModel } from '../../../modles/incomeModel';
import { incomeService } from '../../../services/Income.service';
import CreatUpdate from '../../model/create-update';
import useModal from '../../model/useModel';

class props {
    income: IncomeModel = new IncomeModel();
    type: string = "create";
}





const AUincome = ({ income, type }: props) => {
    const { isShowing, toggle } = useModal();

    const onsubmit = (doc: IncomeModel) => {
        console.log(doc);
        if (type == "create") {
            incomeService.add(doc).then(
                res => console.log(res)
            )
        }
    }
    
    return (
        <>
            {type === "create" ?
                <Icon className="inline f-l" style={{ color: '#00bcd4c7', fontSize: 30 }} onClick={toggle}>add_circle</Icon> :
                <></>
            }
            <CreatUpdate
                doc={income}
                isShowing={isShowing}
                hide={toggle}
                OnSubmit={onsubmit}
                header={""}
                rows={IncomeControllers}
                type={type}></CreatUpdate>
        </>
    )
}
export default AUincome;