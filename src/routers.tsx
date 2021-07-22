import UserDetails from "./components/users/userdetails";
import LoanList from "./components/loan/loanList";
import Users from "./components/users/users";
import DepositDetails from "./components/Deposits/DepositDetails";
import PeopleIcon from '@material-ui/icons/People';
import ListIcon from '@material-ui/icons/List';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Reports from "./components/reports/Reports";
import Incoms from "./components/pattyCash/incom/incoms";

export const routers = [
   {
      name: "חברים",
      component: Users,
      path: '/user',
      icon:<PeopleIcon/>,
   },
   {
      name: "הלוואות",
      component: LoanList,
      path: '/loans',
      icon:<ListIcon/>
   },
   {
      name: "הכנסות",
      component: Incoms,
      path: '/Incoms',
      icon:<ListIcon/>
   },
   {
      name: "מחולל דוחות",
      component: Reports,
      path: '/reports',
      icon:<FileCopyOutlinedIcon/>
   }
]

export const routersB = [
   {
      component: UserDetails,
      path: '/UserDetails/:id'
   },
   {
      component: DepositDetails,
      path: '/deposit/:id'
   }
]