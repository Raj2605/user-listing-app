import React from 'react';
import UserList from './components/UserList';
import './App.css';

//Main App user listing feature
function App() {
  return (
    <div className="container">
      <h1>Employees</h1>
      <UserList />
    </div>
  );
}

export default App;
