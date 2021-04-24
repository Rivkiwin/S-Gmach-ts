import { Button } from '@material-ui/core'
import React from 'react'
import useModal from '../model/useModel'
import WithdrawalList from '../Withdrawal/WithdrawalList'
import { t } from './t'


const WithdrawalByUser = (id: any) => {
    const { toggle, isShowing } = useModal();

    return (<>
        <Button variant="outlined" color="primary" onClick={toggle}>{t.Withdrawals}</Button>
        { isShowing &&
            <div className="model-w">
                <div className="card mt-12">
                    <div className="txt-left"><Button variant="outlined" color="primary" onClick={toggle}>
                        <span aria-hidden="true">&times;</span></Button></div>
                    <WithdrawalList userId={id} />
                </div>
            </div>}
    </>

    )
}
export default WithdrawalByUser