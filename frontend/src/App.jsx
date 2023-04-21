import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import Pages from './components/Pages';
import axios from 'axios';
import userData from './components/auth/user';
import { BarLoader } from 'react-spinner-animated';

function App() {

  const { user, getUser, loading } = userData();

  useEffect(() => {
    getUser()
  })

  if (loading) {
    return <div className="center">
      <BarLoader text={"Loading..."}
        center={false} width={"150px"} height={"150px"} />
    </div>
  }

  return (
    <div className="App">
      <Pages />
    </div>
  );
}

export default App;
