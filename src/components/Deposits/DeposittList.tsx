import { Stats } from 'node:fs';
import React, { useEffect, useState } from 'react';
import { HeadCells } from '../../modles/headCells.model';
import { PaginateOptions } from '../../modles/PaginateOptions';
import { Status } from '../../modles/status';
import DepositService from '../../services/deposit.service';
import EnhancedTable from '../model/list/baselist';

const headCells: HeadCells[] = [
    { id: "userName", label: "שם המפקיד", numeric: false, disablePadding: true },
    { id: "fundName", label: "קרן", numeric: false, disablePadding: false },
    { id: "amount", label: "סכום", numeric: true, disablePadding: false },
    { id: "createdAt", label: "תאריך יצירה", numeric: false, disablePadding: true },
    { id: "updatedAt", label: "תאריך עדכון", numeric: false, disablePadding: false },
]

const depositService = new DepositService();
export const DepositList = ({ userId }: any) => {

    const [Deposits, setDeposits] = useState([]);
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

    function getData(_p: any) {
        _p.query = { userId: userId.id ?? '' };
        depositService.paginator(_p,userId.id??null).then(
            res => {
                if (res.data.docs) {
                    setPage(res.data.page-1);
                    setCount(res.data.total);
                    setRowsPerPage(res.data.limit);
                    let list = res.data.docs.map((w: any) => {
                        return {
                            userName: w.userName,
                            fundName: w.fundName,
                            amount: w.amount,
                            createdAt: w.createdAt.slice(0, 10),
                            updatedAt: w.updatedAt.slice(0, 10),
                            _id: w._id
                        }
                    }
                    );
                    setDeposits(list);
                }

            }
        )
    }

    function onselect(id: string) {
        console.log(id);
    }

    return (
        <EnhancedTable
        page={page}
            onPaginationChange={getData}
            count={count}
            rowsPerPage={rowsPerPage}
            headCells={headCells}
            onSelect={onselect}
            rows={Deposits}
            header="הפקדות"
            filters={[]}
        />
    )
}
export default DepositList;