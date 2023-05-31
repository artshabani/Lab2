import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      email: null,
      password: null,
      signup: false,
      store: null,
    };
  }

  componentDidMount() {
    this.storeCollector();
  }

  storeCollector() {
    let store = JSON.parse(localStorage.getItem('signup'));
    if (store && store.signup) {
      this.setState({ signup: true, store: store });
    }
  }

  signup() {
    const name = document.getElementById('name_field').value;
    const username = document.getElementById('username_field').value;
    const email = document.getElementById('email_field').value;
    const password = document.getElementById('password_field').value;

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
    }).then(response => {
      response.json().then(result => {
        console.warn('result', result);
        localStorage.setItem('token', result.token);
        //this.storeCollector()
      });
    });
  }

  render() {
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
                  <label htmlFor="email" style={{ textAlign: 'left' }}>Name</label>
                  <input type="email" className="form-control" id="name_field" placeholder="Enter name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" style={{ textAlign: 'left' }}>Username</label>
                  <input type="email" className="form-control" id="username_field" placeholder="Enter username" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" style={{ textAlign: 'left' }}>Email</label>
                  <input type="email" className="form-control" id="email_field" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password" style={{ textAlign: 'left' }}>Password</label>
                  <input type="password" className="form-control" id="password_field" placeholder="Enter password" />
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" checked={this.state.rememberMe} onChange={this.handleRememberMeChange} />
                  <label className="form-check-label" htmlFor="rememberMe" style={{ textAlign: 'left' }}>Remember Me</label>
                </div>
                <button type="submit" onClick={() => {this.signup();}} className="btn btn-primary">Signup</button>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h6 style={{ marginRight: '5px' }}>Already have an account?</h6>
                  <Link to="/login">Log in</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      // <div className="center" style={{ alignItems: 'center' }}>
      //   <h1>Sign up</h1>
      //   Name:
      //   <div className="txt_field">
      //     <input type="text" id="name_field" /> <br />
      //   </div>
      //   Username:
      //   <div className="txt_field">
      //     <input type="text" id="username_field" /> <br />
      //   </div>
      //   Email:
      //   <div className="txt_field">
      //     <input type="text" id="email_field" /> <br />
      //   </div>
      //   Password:
      //   <div className="txt_field">
      //     <input type="password" id="password_field" /> <br />
      //   </div>
      //   <div className="button">
      //     <button
      //       onClick={() => {
      //         this.signup();
      //       }}
      //       className="btn btn-primary"
      //     >
      //       Sign up
      //     </button>
      //   </div>
      // </div>
    );
  }
}

export default Signup;
