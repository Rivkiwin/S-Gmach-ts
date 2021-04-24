import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toEditorSettings } from "typescript";
import { Deposit, GetDepositControllers } from "../../modles/deposits.modle";
import { GetWithdrawalControllers, Withdrawal } from "../../modles/withdrawal.model";
import DepositService from "../../services/deposit.service";
import FundService from "../../services/fund.service";
import { UserService } from "../../services/userService";
import WithdrawalService from "../../services/withdrawal.service";
import CreatUpdate from "../model/create-update";
import input from "../model/from/input";
import useModal from "../model/useModel";
import { UserControllers } from "./arrayController.user";
import DepositByUser from "./depositByUser";
import { t } from "./t";
import WithdrawalByUser from "./withdrawalByUser";

const userService = new UserService();
const depositService = new DepositService();
const fundService = new FundService();
const withdrawalService = new WithdrawalService();

const UserDetails = () => {
    const [User, setUser] = useState<any>({});
    const [DepositController, setDepositController] = useState<any>([{}]);
    const [WithdrawalControllers, setWithdrawalControllers] = useState<any>([{}]);
    const { isShowing, toggle, isShowing4, toggle4, isShowing3, toggle3, isShowing2, toggle2 } = useModal();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { id }: any = useParams();
    useEffect(() => {
        userService.getById(id).then(
            res => {
                setUser(res.data)
            }

        )
        const dControllers = GetDepositControllers(id);
        setDepositController(dControllers);
        const WControllers = GetWithdrawalControllers(id);
        console.log(WControllers);
        debugger;
        setWithdrawalControllers(WControllers);
        withdrawalService.get({ userId: id }).then(
            res => {
                console.log(res)
            }
        );
    }, []);

    const edit = (user: any) => {

        userService.update(user).then(
            res => { setOpen(true); toggle() },
            err => console.log(err)

        )
    }

    function addDeposit(deposit: Deposit) {
        deposit.userId = id;
        depositService.add(deposit).then(
            res => {
                console.log(res);
                setOpen(true);
                setMessage("נוסף בהצלחה")
            }
        )
    }

    async function addWithdrawal(withdrawal: any) {
        withdrawal.userId = id;
        console.log(withdrawal);
        let ok = true;
        Object.keys(withdrawal).forEach((key) => {
            debugger
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
            let res = await withdrawalService.add(withdrawal);
            console.log(res);

        }

        const userInFunds = fundService.getByUser(id).then(
            res => {
                if (res.data.funds) {
                    let funds = res.data.funds;
                    let fund = funds.find((f: any) => f.uf.fundId == withdrawal.fundId);
                    if (fund) {
                        if ((withdrawal.amount * withdrawal.cnt ?? 1) > fund.uf.balance) {
                            setOpen(true);
                            setMessage("הסכום*כפול גדול מהיתרה הנוכחית")
                        }
                    }
                }
            }
        )
        // depositService.add(withdrawal).then(
        //     res => {
        //         console.log(res);
        //     }
        // )
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={toggle2}>{t.addDeposit}</Button>
            <Button variant="outlined" color="primary" onClick={() => { debugger; toggle3(); }}>{t.addWithdrawal}</Button>
            <Button variant="outlined" color="primary" onClick={toggle}>{t.edit}</Button>
            <WithdrawalByUser id={id} />
            <DepositByUser id={id} />
            <CreatUpdate isShowing={isShowing3} hide={toggle3} OnSubmit={addWithdrawal} type={"creat"} header={"header"} rows={WithdrawalControllers} doc={new Withdrawal()} />
            <CreatUpdate isShowing={isShowing2} hide={toggle2} OnSubmit={addDeposit} type={"creat"} header={"header"} rows={DepositController} doc={new Deposit()} />
            <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={edit} type={"update"} header={"header"} rows={UserControllers} doc={User} />
            <Snackbar open={open} autoHideDuration={6000} >
                <Alert onClose={() => setOpen(false)} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </div>

    )
}
export default UserDetails