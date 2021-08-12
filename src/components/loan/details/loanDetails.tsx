import { Button, CardActions, CardContent } from "@material-ui/core"
import { loanService } from "../../../services/loan.service"
import Details from '../../model/details';

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { creatDetailsMod } from "../../../modles/details.modle";
import { t } from "../t";
import { loanStatus } from "../../../modles/status";
import BorrowersLoan from "./BorrowersLoan";
import LoanRepayments from "./Repayment";

const LoanDetails = () => {
    const [loanDetails, setLoanDetails] = useState<any>();
    const [loan, setLoan] = useState<any>();
    const { id }: any = useParams();
    useEffect(() => {
        getLoan()
    }, [])

    useEffect(() => {
        if (loan) {
            let details: any[] = [];
            let _loan: any = { ...loan.loan };
            delete _loan._id;
            delete _loan.__v;
            delete _loan.score;
            delete _loan.remark;
            _loan.type = t[_loan.type]
            _loan.statues = loanStatus.find(s => s.value === _loan.status)?.label;
            _loan.numBorrowers = loan.numBorrowers;
            _loan.updatedAt = _loan.updatedAt?.split('T')[0];
            _loan.createdAt = _loan.createdAt?.split('T')[0];
            _loan.dateStart = _loan.dateStart?.split('T')[0];
            Object.keys(_loan).map((key: any) => {
                console.log(key)
                details.push({ name: t[key], value: _loan[key] });
            });
            console.log(details);
            setLoanDetails(creatDetailsMod(details, 4));
        }
    }, [loan])

    const getLoan = async () => {
        var _loan = await loanService.getById(id);
        console.log(_loan, " loan");
      
        setLoan(_loan.data);
    }

    return (
        <CardContent>
            <div id="details">
                <Details doc={loanDetails} />
                <div className="w-buttons">
                    <BorrowersLoan id={id} />
                    <LoanRepayments id={id} />
                </div>
            </div>
        </CardContent>
    )
}
export default LoanDetails