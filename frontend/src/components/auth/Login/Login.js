import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);

  useEffect (() => {
    if(state.user){
        navigate('/')
    }
  },[state.user])

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const login = () => {
    const requestBody = {
      email: email,
      password: password,
    };

    fetch("http://localhost:5000/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        response.json().then((result) => {
          localStorage.setItem("token", result.token);
          dispatch(setUser(result))
        });

        if (response.ok) {
          console.log("Login successful");
        } else {
          console.error("Login failed");
        }
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
              <h3 style={{ color: "black", textAlign: "left" }}>Login</h3>
              <h4 style={{ color: "black", textAlign: "left" }}>
                Use an existing account to log in.
              </h4>
              <br />
              <div className="form-group">
                <label htmlFor="email" style={{ textAlign: "left" }}>
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
                <label htmlFor="password" style={{ textAlign: "left" }}>
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
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="rememberMe"
                  style={{ textAlign: "left" }}
                >
                  Remember Me
                </label>
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
                className="btn btn-primary"
              >
                Login
              </button>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h6 style={{ marginRight: "5px" }}>Don't have an account?</h6>
                <Link to="/signup">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
