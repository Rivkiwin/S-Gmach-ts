import React, { useEffect, useState } from "react"
import { HeadCells } from "../../modles/headCells.model";
import { PaginateOptions } from "../../modles/PaginateOptions";
import DepositService from "../../services/deposit.service";
import EnhancedTable from "../model/list/baselist";

const headCells: HeadCells[] = [
    { id: "amount", label: "סכום", numeric: true, disablePadding: false },
    { id: "createdAt", label: "תאריך יצירה", numeric: false, disablePadding: true },
    { id: "updatedAt", label: "תאריך עדכון", numeric: false, disablePadding: false },
    { id: "remarks", label: "הערות", numeric: false, disablePadding: false },

];
const filters:any = [];
const depositService = new DepositService();
const SubDepositList = ({ depositId }: any) => {
    const [SubDeposits, setSubDeposits] = useState<any>([]);
    const [Paginate, setPaginate] = useState(new PaginateOptions())
    useEffect(() => {
        GetSubDeposits(Paginate);
    }, [])

    const GetSubDeposits = async (paginate:any) => {
        try {
            let res = await depositService.GetSubDeposits(depositId,paginate);
            if (res.status == 200 && res.data) {
                let _p=new PaginateOptions();
                _p.pageSize=res.data.limit;
                _p.total=res.data.total;
                _p.page=res.data.page - 1;
                setPaginate(_p);
                let _subDeposits = res.data.docs?.map((d: any) => {
                    return {
                        amount: d.amount,
                        createdAt: d.createdAt,
                        updatedAt: d.updatedAt,
                        remarks: d.remarks,
                        _id: d._id
                    }
                });
                setSubDeposits(_subDeposits);
            }
        }

        catch { }
    }

    const onSelect = (subDeposit: any) => { }
    return (
        <EnhancedTable
            onPaginationChange={GetSubDeposits}
            rows={SubDeposits}
            onSelect={onSelect}
            headCells={headCells}
            header={""}
            rowsPerPage={Paginate.pageSize}
            page={Paginate.page}
            count={Paginate.total}
            filters={filters}
        />
    )

}
export default SubDepositList;