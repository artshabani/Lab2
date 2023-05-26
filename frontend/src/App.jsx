import React, { useEffect, useState } from 'react';
import './App.css';
import Pages from './components/Pages';
import axios from 'axios';
import { BarLoader } from 'react-spinner-animated';
import { setUser } from './redux/actions/index'
import { useDispatch } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const getUser = async () => {
      setLoading(true);
      if (token) {
        await axios.get("http://localhost:5000/api/account").then((res) => dispatch(setUser(res.data)));
      }
      setLoading(false);
    }
    getUser();
  }, []);

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
