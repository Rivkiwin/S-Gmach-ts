import { Stats } from 'node:fs';
import React, { useEffect, useState } from 'react';
import { HeadCells } from '../../modles/headCells.model';
import { Status } from '../../modles/status';
import DepositService from '../../services/deposit.service';
import EnhancedTable from '../model/list/baselist';

const headCells: HeadCells[] = [
    { id: "userName", label: "שם המפקיד", numeric: false, disablePadding: true },
    { id: "fundName", label: "קרן", numeric: false, disablePadding: false },
    { id: "createdAt", label: "תאריך יצירה", numeric: false, disablePadding: true },
    { id: "updatedAt", label: "תאריך עדכון", numeric: false, disablePadding: false },
]

const depositService = new DepositService();
export const DepositList = ({ userId }: any) => {

    const [Deposits, setDeposits] = useState([]);
    const [Paginator, setPaginator] = useState<PannerOptions>();



    useEffect(() => {
        depositService.get({ userId: userId.id ?? '' }).then(
            res => {
                if (res.data.docs) {
                    let list = res.data.docs.map((w: any) => {
                        return {
                            userName: w.userName,
                            fundName: w.fundName,
                            createdAt: w.createdAt,
                            updatedAt: w.updatedAt,
                            _id: w._id
                        }
                    }
                    );
                    debugger
                    setDeposits(list);
                }

            }
        )
    }, []);

    function onselect(id: string) {
        console.log(id);
    }

    return (
        <EnhancedTable headCells={headCells} onSelect={onselect} rows={Deposits} />
    )
}
export default DepositList;