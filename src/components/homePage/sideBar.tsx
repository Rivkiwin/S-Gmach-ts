import React from 'react'
import ReactDOM from 'react-dom';
import { routers } from '../../routers';

class appProp{
    hide:any;
    isShowing:boolean =false
}

const SideBar=({hide,isShowing}:appProp)=>{

    return (isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="side-bar">
            {routers.map(route => {
        //   return <Link key={route.path}  to={route.path} >{route.name}</Link>
          })}
            </div>
        </React.Fragment>, document.body) : null)
}
export default SideBar