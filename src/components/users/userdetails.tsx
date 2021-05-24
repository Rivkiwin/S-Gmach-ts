import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import './userScss.scss';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toEditorSettings } from "typescript";
import { Deposit, GetDepositControllers } from "../../modles/deposits.modle";
import { creatDetailsMod } from "../../modles/details.modle";
import { UserStatus } from "../../modles/status";
import { GetWithdrawalControllers, Withdrawal } from "../../modles/withdrawal.model";
import DepositService from "../../services/deposit.service";
import FundService from "../../services/fund.service";
import { UserService } from "../../services/userService";
import WithdrawalService from "../../services/withdrawal.service";
import CreatUpdate from "../model/create-update";
import Details from "../model/details";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useModal from "../model/useModel";
import { UserControllers } from "./arrayController.user";
import DepositByUser from "./depositByUser";
import { t } from "./t";
import WithdrawalByUser from "./withdrawalByUser";
import Card from '@material-ui/core/Card';
import UserD from "./userD";
import WithdrawalCU from "../Withdrawal/withdrawalCU";

const userService = new UserService();
const depositService = new DepositService();
const fundService = new FundService();
const withdrawalService = new WithdrawalService();

const UserDetails = () => {
    const [User, setUser] = useState<any>({});
    const [userDetails, setDetails] = useState<any>([]);
    const [DepositController, setDepositController] = useState<any>([{}]);
    const [uif, setUif] = useState<any>([]);

    const [WithdrawalControllers, setWithdrawalControllers] = useState<any>([{}]);
    const { isShowing, toggle,  isShowing2, toggle2 } = useModal();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { id }: any = useParams();
    useEffect(() => {
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
        fundService.getByUser(id).then(
            res => {
                if (res.data.funds) {
                    setUif( res.data.funds);
                   
                }
            }
            )
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



    return (
        <Card id="usrD">
            <CardActions id="actions">
                <WithdrawalCU id={id} setOpen={setOpen} setMessage={setMessage} uif={uif}/>
                <Button variant="outlined" color="primary" onClick={toggle2}>{t.addDeposit}</Button>
                <Button variant="outlined" color="primary" onClick={toggle}>{t.edit}</Button>
                <WithdrawalByUser id={id} />
                <DepositByUser id={id} />
                <CreatUpdate isShowing={isShowing2} hide={toggle2} OnSubmit={addDeposit} type={"creat"} header={"header"} rows={DepositController} doc={new Deposit()} />
                <CreatUpdate isShowing={isShowing} hide={toggle} OnSubmit={edit} type={"update"} header={"header"} rows={UserControllers} doc={User} />
                <Snackbar open={open} autoHideDuration={6000} >
                    <Alert onClose={() => setOpen(false)} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
            </CardActions>
            <UserD id={id} uif={uif}/>
        </Card>
    )
}
export default UserDetails