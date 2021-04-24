import React from 'react';
import logo from './logo.svg';
import './App.css';
import './scss/base.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";


import UsersList from './components/users/list';
import { routers, routersB } from './routers';
import HomePage from './components/homePage/homePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HomePage />
        <Switch>
          {routers.map(route => {
            return <Route key={route.path} path={route.path} component={route.component} />
          })}
               {routersB.map(route => {
            return <Route key={route.path} path={route.path} component={route.component} />
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
