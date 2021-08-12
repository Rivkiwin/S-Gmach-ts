import { Button } from "@material-ui/core";
import React,{useState} from "react"
import { borrowerService } from "../../../services/borrower.service";
import useModal from "../../model/useModel";
import { t } from "../t";

const BorrowersLoan = ({ id }: { id: string }) => {
    const { isShowing, toggle } = useModal();
    const[load,SetLoad]=useState(false)
    const [Borrowers,setBorrowers]=useState()
    const Open=async ()=>{
        SetLoad(true);
        toggle();
        var _borrowers=await borrowerService.get({loanId:id});
        console.log(_borrowers.data)
        setBorrowers(_borrowers.data)
    }
    return (
        <div  className="inline">
            {isShowing ? <div></div>
                : <div><Button variant="outlined" color="primary" onClick={Open}>{t.Borrowers}</Button></div>}
        </div>
    )
}
export default BorrowersLoan;