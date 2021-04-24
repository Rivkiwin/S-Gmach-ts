import { Button } from '@material-ui/core'
import React from 'react'
import DepositList from '../Deposits/DeposittList'
import useModal from '../model/useModel'
import { t } from './t'


const DepositByUser = (id: any) => {
    const { toggle, isShowing } = useModal();

    return (<>
        <Button variant="outlined" color="primary" onClick={toggle}>{t.Deposits}</Button>
        { isShowing &&
            <div className="model-w">
                <div className="card mt-12">
                    <div className="txt-left"><Button variant="outlined" color="primary" onClick={toggle}>
                        <span aria-hidden="true">&times;</span></Button></div>
                    <DepositList userId={id} />
                </div>
            </div>}
    </>

    )
}
export default DepositByUser