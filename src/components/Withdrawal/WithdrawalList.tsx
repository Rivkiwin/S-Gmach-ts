import { Stats } from 'node:fs';
import React, { useEffect, useState } from 'react';
import { HeadCells } from '../../modles/headCells.model';
import { Status } from '../../modles/status';
import WithdrawalService from '../../services/withdrawal.service';
import EnhancedTable from '../model/list/baselist';

const headCells: HeadCells[] = [
    { id: "status", label: "סטטוס", numeric: false, disablePadding: false },
    { id: "userName", label: "שם מושך", numeric: false, disablePadding: true },
    { id: "fundName", label: "קרן", numeric: false, disablePadding: false },
    { id: "date", label: "תאריך", numeric: false, disablePadding: false },
    { id: "createdAt", label: "תאריך יצירה", numeric: false, disablePadding: true },
    { id: "updatedAt", label: "תאריך עדכון", numeric: false, disablePadding: false },
]

const withdrawalService = new WithdrawalService();
export const WithdrawalList = ({userId}:any) => {

    const [Withdrawals, setWithdrawals] = useState([]);
    const [Paginator, setPaginator] = useState<PannerOptions>();



    useEffect(() => {
        withdrawalService.get({ userId: userId.id ?? '' }).then(
            res => {
                if (res.data.docs) {
                    let list = res.data.docs.map((w: any) => {
                        return {
                            status: Status.find(s=>s.value== w.status)?.label,
                            userName:w.userName,
                            fundName:w.fundName,
                            date:w.date.split('T')[0],
                            createdAt:w.createdAt.split('T')[0],
                            updatedAt:w.updatedAt.split('T')[0],
                            _id:w._id
                        }
                    }
                    );
                    debugger
                    setWithdrawals(list);
                }

            }
        )
    }, []);

   function onselect(id:string)
    {
      console.log(id);
    }

    return(
        <EnhancedTable headCells={headCells}  onSelect={onselect} rows={Withdrawals} header="משיכות"/>
    )
}
export default WithdrawalList;