/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Loan } from "../../modles/loan.modle"
import { PaginateOptions } from "../../modles/PaginateOptions"
import { Status } from "../../modles/status"
import { loanService, LoanService } from "../../services/loan.service"
import CreatUpdate from "../model/create-update"
import EnhancedTable from "../model/list/baselist"
import useModal from "../model/useModel"
import AddLoan from "./add/addLoan"


const headCells: any[] = [
    { id: "type", label: "סוג", numeric: false, disablePadding: false },
    { id: "status", label: "סטטוס", numeric: false, disablePadding: false },
    { id: "dateStart", label: "תאריך התחלה", numeric: false, disablePadding: false },
    { id: "amount", label: "סכום", numeric: true, disablePadding: false },
    { id: "paid", label: "סכום שהחזר", numeric: true, disablePadding: false },
    { id: "monthlyRepayments", label: "החזר חודשי משוער", numeric: true, disablePadding: false },
    { id: "numMonth", label: "מספר חודשים", numeric: true, disablePadding: false },
    { id: "numPayments", label: "מספר תשלומים", numeric: true, disablePadding: false },
];
const filters: any[] = [];

const LoanList = () => {
    const { toggle, isShowing } = useModal();
    const [rows, setRows] = useState<any[]>([]);
    const [paginator, sePaginator] = useState(new PaginateOptions());
    const history = useHistory();

    useEffect(() => {
        getLoans()
    }, [])

    function getLoans() {
        loanService.paginator(paginator, null).then(
            res => {
                let data = res.data.docs.map((loan: Loan) => {
                    return {
                        _id:loan._id,
                        type: loan.type,
                        status: Status.find(s => s.value === loan.status)?.label,
                        dateStart: loan.dateStart,
                        amount: loan.amount,
                        paid: loan.paid,
                        monthlyRepayments: loan.amount / loan.numPayments,
                        numMonth: loan.numMonth,
                        numPayments: loan.numPayments
                    }
                });;
                setRows(data);
            }
        )
    }

    function onselect(loan: any) {
        console.log(loan);
        
        history.push(`loanDetails/${loan._id}`);
    }

    return (
        <div>
            <div className="w-90 m-u">
                <h2 className="txt-blue inline">הלוואות</h2>
                <Icon className="inline f-l" style={{ color: '#00bcd4c7', fontSize: 30 }} onClick={toggle}>add_circle</Icon>
            </div>
            <AddLoan toggle={toggle} isShowing={isShowing} />
            <EnhancedTable
                onPaginationChange={getLoans}
                rows={rows}
                onSelect={onselect}
                headCells={headCells}
                header={"רשימת הלואוות"}
                rowsPerPage={paginator.pageSize}
                page={paginator.page}
                count={paginator.total}
                filters={filters}
            />
        </div>)
}
export default LoanList