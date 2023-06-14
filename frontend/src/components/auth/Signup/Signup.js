import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscribe, setUser } from '../../../redux/actions';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);

  useEffect (() => {
    if(state.user){
        navigate('/')
    }
  },[state.user])

  const signup = () => {
    const requestBody = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    fetch('http://localhost:5000/api/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response) => {
      response.json().then((result) => {
        localStorage.setItem('token', result.token);
        dispatch(setUser(result))
        dispatch(setSubscribe(result.subscribe))
      });
    });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form>
              <h3 style={{ color: 'black', textAlign: 'left' }}>Sign up</h3>
              <h4 style={{ color: 'black', textAlign: 'left' }}>Create a new account.</h4>
              <br />
              <div className="form-group">
                <label htmlFor="email" style={{ textAlign: 'left' }}>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ textAlign: 'left' }}>
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ textAlign: 'left' }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" style={{ textAlign: 'left' }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  signup();
                }}
                className="btn btn-primary"
              >
                Signup
              </button>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h6 style={{ marginRight: "5px" }}>Already have an account?</h6>
                <Link to="/login">Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
