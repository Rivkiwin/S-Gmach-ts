import UsersList from "./components/users/usersList";
import UserDetails from "./components/users/userdetails";

export const routers=[
    {
       name:"חברים",
       component:UsersList,
       path:'/user'
    },
    {
        name:"הכנסות",
        component:UsersList,
        path:'/user'
     },
     {
      component:UserDetails,
      path:'/UserDetails/:id'
   }
]

export const routersB=[
   {
      component:UserDetails,
      path:'/user/:id'
   }
]