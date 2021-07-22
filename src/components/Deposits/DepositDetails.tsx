import { CardContent } from '@material-ui/core';
import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { SubDeposit } from '../../modles/subDeposite.model';
import SubDepositCU from './subDpositCreateUpdate';
import SubDepositList from './subDpositList';


const DepositDetails = ({deposit}:any) => {
    // const [subDeposit, setsubDeposit] = useState<SubDeposit>(deposit);
    const { id }: any = useParams();
    const location=useLocation();
   
    useEffect(() => {
      console.log( location.state.deposit)
    }, [])
    return (
        <CardContent>
            < SubDepositCU depositId={id}  deposit={location.state.deposit}/>
            <SubDepositList depositId={id} deposit={location.state.deposit}/>
        </CardContent>
    )
}
export default DepositDetails;