import { Button } from "@material-ui/core";
import React, { useState } from "react"
import { repaymentsService } from "../../../services/loan.service";
import useModal from "../../model/useModel";
import { t } from "../t";

const LoanRepayments=({id}:{id:string})=>{
    const { isShowing, toggle } = useModal();
    const [load,setLoad]=useState(false)
    const [Repayments,setRepayments]=useState<any>()
    const Open=async()=>{
        setLoad(true);
        toggle();
        let _repayments=await repaymentsService.get({loanId:id});
        if(_repayments.status===200 && _repayments.data)
        {
            console.log(_repayments.data)
            setRepayments(_repayments.data);
        }
    }
    return (
        <div className="inline">
            {isShowing ? <div></div>
                : <div><Button variant="outlined" color="primary" onClick={Open}>{t.Repayments}</Button></div>}
        </div>
    )
}
export default LoanRepayments;