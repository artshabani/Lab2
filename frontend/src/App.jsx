import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import Pages from './components/Pages';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  useEffect(()=> {
    const token = window.localStorage.getItem("signupToken");
    console.log(token)
  })

  return (
    <div className="App">
      
        <Pages />

    </div>
  );
}

export default App;
