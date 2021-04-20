import React from 'react';
import logo from './logo.svg';
import './App.css';
import './scss/base.scss';

import UsersList from './components/users/list';

function App() {
  return (
    <div className="App">
      <UsersList/>
    </div>
  );
}

export default App;
