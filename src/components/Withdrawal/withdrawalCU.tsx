import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { GetWithdrawalControllers, Withdrawal } from '../../modles/withdrawal.model';
import WithdrawalService from '../../services/withdrawal.service';
import CreatUpdate from '../model/create-update';
import { t } from '../users/t';
import useModal from '../model/useModel';

const withdrawalService = new WithdrawalService();

const WithdrawalCU = ({ id, setOpen, setMessage, uif }: any) => {
    const { isShowing, toggle } = useModal();
    const [WithdrawalControllers, setWithdrawalControllers] = useState<any>([{}]);

    useEffect(() => {
        const WControllers = GetWithdrawalControllers(id);
        console.log(WControllers, "WControllers");
        debugger;
        setWithdrawalControllers(WControllers);
        withdrawalService.get({ userId: id }).then(
            res => {
                console.log(res, "WCddd")
            }
        );
    }, []);
    async function addWithdrawal(withdrawal: any) {
        withdrawal.userId = id;
        console.log(withdrawal);
        let ok = true;
        Object.keys(withdrawal).forEach((key) => {
            
            if (withdrawal[key] == undefined || withdrawal[key] == "") {
                ok = false;
            }
        });
        if (withdrawal.amount <= 0) {
            ok = false
            setOpen(true);
            setMessage("הסכום חייב לביות גדול מ-0")
            return
        }
        if (!ok) {
            setOpen(true);
            setMessage("אנא מלא את כל השדות");
            return
        }
        else {
            let fund = uif.find((f: any) => f.uf.fundId == withdrawal.fundId);
            if (fund) {
                debugger
                if ((withdrawal.amount * withdrawal.cnt ?? 1) > (fund.uf.balance - fund.futureWithdrawals)) {
                    setOpen(true);
                    setMessage(" הסכום * כמות גדול מהיתרה הנוכחית - משיכות עתדיות")
                }
                else {
                    // let res = await withdrawalService.add(withdrawal);
                    // console.log(res);
                }
            }
        }
        // const userInFunds = fundService.getByUser(id).then(
        // res => {
        //     if (res.data.funds) {
        //         let funds = res.data.funds;
        //        
        //     }
        // }
        // )

    }


    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => { debugger; toggle(); }}>{t.addWithdrawal}</Button>
            <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={addWithdrawal}
                type={"creat"} header={"header"} rows={WithdrawalControllers} doc={new Withdrawal()} />
        </>
    )
}
export default WithdrawalCU;