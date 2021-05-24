import React, { useEffect, useState } from 'react';
import { creatDetailsMod } from '../../modles/details.modle';
import Details from '../model/details';
import { t } from './t';

const FundsUser = ({ uif }: any) => {
    const [details, setDetails] = useState<any>([])

    useEffect(() => {
        let _details: any[] = [];
        uif.map((f: any) => {
            //    let d:any={};
            _details.push({ name: t.fundName, value: f.fundName });
            _details.push({ name: t.amount, value: f.uf.balance });
            _details.push({ name: t.futureWithdrawals, value: f.futureWithdrawals });
            //    return d;
        });
        setDetails(creatDetailsMod(_details, 3));
        console.log(_details);
    }, [])

    return (
        <>
        <Details doc={details} />
        </>
    )
}
export default FundsUser