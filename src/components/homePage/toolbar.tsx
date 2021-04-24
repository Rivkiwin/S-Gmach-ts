import { Button } from '@material-ui/core';
import React from 'react'
import useModal from '../model/useModel'
// import { GoThreeBars } from 'react-icons/go';
import SideBar from './sideBar';


const Toolbar = () => {
    const { toggle, isShowing } = useModal();
    return (
        <div className="Toolbar">
            {/* <GoThreeBars onClick={toggle} /> */}
            <Button onClick={toggle}>{"nav"}</Button>

            <SideBar hide={toggle} isShowing={isShowing} />
        </div>

    )
}
export default Toolbar