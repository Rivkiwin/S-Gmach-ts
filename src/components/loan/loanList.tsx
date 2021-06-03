import { Icon, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useEffect, useState } from "react"
import { PaginateOptions } from "../../modles/PaginateOptions"
import CreatUpdate from "../model/create-update"
import EnhancedTable from "../model/list/baselist"
import useModal from "../model/useModel"
import AddLoan from "./addLoan"


const headCells: any[] = [
    { id: "type", label: "סוג", numeric: false, disablePadding: false },
    { id: "status", label: "סטטוס", numeric: false, disablePadding: false },
    { id: "dateStart", label: "תאריך התחלה", numeric: false, disablePadding: false },
    { id: "amount", label: "סכום", numeric: true, disablePadding: false },
    { id: "paid", label: "סכום שהחזר", numeric: true, disablePadding: false },
    { id: "numMonth", label: "מספר חודשים", numeric: true, disablePadding: false },
    { id: "numPayments", label: "מספר תשלומים", numeric: true, disablePadding: false },
];
const filters:any[]=[];
const LoanList = () => {
    const { toggle, isShowing } = useModal();
    const [rows, setHRows] = useState<any[]>([])
    const [paginator, sePaginator] = useState(new PaginateOptions());

    useEffect(() => {
        getLoans()
    }, [])

    function getLoans() {

    }

    function onselect(id:string)
    {

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