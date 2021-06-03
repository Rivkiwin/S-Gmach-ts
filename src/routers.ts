import UserDetails from "./components/users/userdetails";
import LoanList from "./components/loan/loanList";
import Users from "./components/users/users";

export const routers = [
   {
      name: "חברים",
      component: Users,
      path: '/user'
   },
   {
      name: "הלוואות",
      component: LoanList,
      path: '/loans'
   },
   {
      name: "הכנסות",
      component: Users,
      path: '/user'
   },
   {
      component: UserDetails,
      path: '/UserDetails/:id'
   }
]

export const routersB = [
   {
      component: UserDetails,
      path: '/user/:id'
   }
]