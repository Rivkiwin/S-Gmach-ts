import { Stats } from 'node:fs';
import React, { useEffect, useState } from 'react';
import { HeadCells } from '../../modles/headCells.model';
import { PaginateOptions } from '../../modles/PaginateOptions';
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
export const WithdrawalList = ({ userId }: any) => {

    const [Withdrawals, setWithdrawals] = useState([]);
    const [Paginator, setPaginator] = useState(new PaginateOptions());
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);


    useEffect(() => {
        Paginator.query = { userId: userId.id ?? '' };
        Paginator.pageSize = 5;
        Paginator.page = 0;
        getData(Paginator);
    }, []);
    function getData(prams: any) {
        prams.query = { userId: userId.id ?? '' };
        return withdrawalService.paginator(prams).then(
            res => {
                if (res.data.docs) {
                    setPage(res.data.page - 1);
                    setCount(res.data.total);
                    setRowsPerPage(res.data.limit);
                    let list = res.data.docs.map((w: any) => {
                        return {
                            status: Status.find(s => s.value == w.status)?.label,
                            userName: w.userName,
                            fundName: w.fundName,
                            date: w.date.split('T')[0],
                            createdAt: w.createdAt.split('T')[0],
                            updatedAt: w.updatedAt.split('T')[0],
                            _id: w._id
                        }
                    }
                    );
                    debugger
                    setWithdrawals(list);
                    return list;

                }

            }
        )
    }
    function onselect(id: string) {
        console.log(id);
    }

    return (
        <EnhancedTable
            headCells={headCells}
            page={page}
            onPaginationChange={getData}
            count={count}
            rowsPerPage={rowsPerPage}
            onSelect={onselect}
            rows={Withdrawals}
            header="משיכות" />
    )
}
export default WithdrawalList;