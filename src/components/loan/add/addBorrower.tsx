/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Box, Button, Icon, TextField } from '@material-ui/core'
import ReactDOM from 'react-dom'
import useModal from '../../model/useModel'
import UsersList from '../../users/usersList'
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { t } from '../../model/t'
import { loanService, LoanService } from '../../../services/loan.service'
import CheckboxController from '../../model/from/checkBox'
import { AnyCnameRecord } from 'node:dns'

const AddBorrower = ({ newLoan, AutomaticDivision, setDivision, refAmount }: any) => {
    const [Borrowers, setBorrowers] = useState<any>({});
    const [Selected, setSelected] = useState<any>({});
    const { isShowing, toggle } = useModal();
    function onSelectBorrower(user: any) {
        let b = { ...Selected };
        if (b[user._id]) {
            delete b[user._id]
        }
        else {
            b[user._id] = {
                name: user.name,
                userId:user._id,
                status:"valid"
            }
        }
        setSelected(b);
    }

    useEffect(() => {
        setAmountForBorrower({ ...Borrowers });
    }, [AutomaticDivision]);

    function add() {
        delete newLoan.monthlyRepayments;
        let doc:any={};
        doc.loan=newLoan;
        doc.borrowers=Borrowers;
        console.log(doc);
        loanService.add(doc);
        // loanService.add(newLoan).then(
        //     res => console.log(res)
        // )
    }
    function handelAmountChange(e: any, b: any) {
        let _Borrowers = { ...Borrowers };
        newLoan.amount -= +(Borrowers[b].amount);
        newLoan.amount += + (e.target.value);
        _Borrowers[b].amount = + e.target.value;
        refAmount.value = newLoan.amount;
        setBorrowers(_Borrowers);
        console.log(newLoan.amount)

    }

    function addBorrowers() {
        let newList = { ...Borrowers, ...Selected };
        Object.keys(newList).forEach((b: any, index: any) => {
            if (AutomaticDivision) {
                let amountAuto = Math.floor(newLoan.amount / Object.keys(newList).length);
                newList[b].amount = index == 0 ? amountAuto + (newLoan.amount % Object.keys(newList).length) : amountAuto;
            }
            else {
                let amount = 0;
                let loanAmount = newLoan.amount;
                Object.keys(Borrowers).forEach((b: any) => { amount += Borrowers[b].amount });
                loanAmount -= amount;
                loanAmount = loanAmount / Object.keys(Selected).length
                Object.keys(Selected).forEach(b => {
                    newList[b].amount = loanAmount;
                })
            }
        }

        )
        setBorrowers(newList);
        setSelected([])
        toggle();
    }

    async function deleteBorrowers(id: string) {
        let b = { ...Borrowers };
        delete b[id];
        setAmountForBorrower(b)
    }

    const setAmountForBorrower = (_borrowers: any) => {
        if (AutomaticDivision) {
            Object.keys(_borrowers).map((b, index) => {
                let amountAuto = Math.floor(newLoan.amount / Object.keys(_borrowers).length);
                _borrowers[b].amount = index == 0 ? amountAuto + (newLoan.amount % Object.keys(_borrowers).length) : amountAuto;
            })
        }
        else {
            let amount = newLoan.amount;
            Object.keys(_borrowers).forEach(b => {
                amount -= _borrowers[b].amount;
            });
            if (amount > 0) {
                _borrowers[Object.keys(_borrowers)[0]].amount += amount;
            }
        }
        setBorrowers(_borrowers);
    }
    return (
        isShowing ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="model-w">
                    <div className="card mt-12">
                        <div className="txt-left m-1"><Button variant="outlined" color="primary" onClick={toggle}>
                            <span aria-hidden="true">&times;</span></Button>
                            <Button variant="outlined" color="primary" onClick={addBorrowers}>הוסף</Button>
                        </div>
                        <UsersList onSelect={onSelectBorrower} />
                    </div>
                </div>
            </React.Fragment>, document.body) :
            <div className="m-1" >

                <div> <CheckboxController defaultVale={AutomaticDivision} label="חילוק אוטומטי" name="AutomaticDivision" value={true} onChange={(e: any) => { console.log(e.target.checked); setDivision(e.target.checked) }} /></div>
                <Button variant="contained" color="primary" onClick={toggle}>הוסף לווים</Button>
                {Object.keys(Borrowers).map((b: any, index: any) => {
                    return (
                        <div className="w-90 m-u" key={index}>
                            <HighlightOffSharpIcon onClick={() => deleteBorrowers(b)} className="vl-middle" color="primary" style={{ fontSize: 30 }} />
                            <Box className="inline mr-1" width="20%">
                                {

                                    <TextField className="mr-1" variant="outlined"
                                        id="outlined-helperText"
                                        size="small"
                                        label={'סכום'}
                                        type='number'
                                        value={Borrowers[b].amount}
                                        disabled={AutomaticDivision}
                                        onChange={(e) => { handelAmountChange(e, b) }}
                                    />}
                            </Box>
                            <Box className="inline mr-1" width="50%">
                                <TextField fullWidth defaultValue={Borrowers[b].remarks} variant="outlined"
                                    name={'remarks'}
                                    id="outlined-helperText"
                                    size="small"
                                    label={"הערות"}
                                    onChange={(e) => Borrowers[b].remarks = e.target.value}
                                />
                            </Box>
                            <p className="inline mr-1">{Borrowers[b].name}</p>

                        </div>
                    )
                })}
                {<Button disabled={Object.keys(Borrowers).length == 0} variant="contained" onClick={() => add()} color="primary">{t.save}</Button>
                }
            </div>)
}
export default AddBorrower