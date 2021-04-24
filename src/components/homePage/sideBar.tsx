import React from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { routers } from '../../routers';

class appProp {
    hide: any;
    isShowing: boolean = false
}

const SideBar = ({ hide, isShowing }: appProp) => {

    return (isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="side-bar">
                {routers.map(route => {
                    return <div><Link key={route.path} to={route.path} onClick={hide}>{route.name}</Link></div>
                })}
            </div>
        </React.Fragment>, document.body) : null)
}
export default SideBar