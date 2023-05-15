import React, { useEffect, useState } from 'react';
import './App.css';
import Pages from './components/Pages';
import axios from 'axios';
import { setUser } from './redux/actions/index';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const getUser = async () => {
      if (token) {
        await axios
          .get('http://localhost:5000/api/account')
          .then(res => dispatch(setUser(res.data)));
      }
    };
    getUser();
  }, []);

  return (
    <div className="App">
      <Pages />
    </div>
  );
}

export default App;
