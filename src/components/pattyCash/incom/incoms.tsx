import React from 'react'
import { IncomeModel } from '../../../modles/incomeModel';
import AUincome from './AUincom'



const Incoms = () => {
    return(
<>
<AUincome income={new IncomeModel()} type="create"></AUincome>
</>)
}
export default Incoms;