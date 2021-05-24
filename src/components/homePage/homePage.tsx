import React from 'react'
import { creatDetailsMod, details } from '../../modles/details.modle';
import Details from '../model/details';
import Toolbar from './toolbar';

let d = [{ name: "שם", value: "roui" },
{ name: "ret", value: "jbi" }, { name: "שם", value: "roui" },
{ name: "ret", value: "jbi" }, { name: "שם", value: "roui" },
{ name: "ret", value: "jbi" }, { name: "שם", value: "roui" },
{ name: "ret", value: "jbi" }
]
let doc:details=creatDetailsMod(d,3);
const HomePage = () => {
  return (
    <div className="homePage">
      <Toolbar />
      <Details doc={doc}></Details>
    </div>
  )
}
export default HomePage;