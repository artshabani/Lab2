import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            login: false,
            store: null,
            rememberMe: false
        }
    }

    componentDidMount() {
        this.storeCollector()
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'));
        if (store && store.login) {
            this.setState({ login: true, store: store })
        }
    }

    login() {
        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;

        const requestBody = {
            email: email,
            password: password
        };

        fetch('http://localhost:5000/api/account/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            response.json().then((result) => {
                console.warn("result", result);
                localStorage.setItem('token', result.token);
                this.storeCollector();
            })


            if (response.ok) {
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        })
    }

    post() {
        let token = "Bearer" + localStorage.getItem('token');
        fetch('http://localhost:5000/api/movies', {
            method: "POST",
            headers: {
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        }).then((response) => {
            response.json().then((result) => {
                this.setState({
                    response: result.message
                })
                console.warn("result", result);
            })
        })
    }

    handleRememberMeChange = (event) => {
        this.setState({ rememberMe: event.target.checked });
    };

    render() {
        return (
            <>
                {/* <br />
                <br />
                <br />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form>
                                <h3 style={{ color: 'black', textAlign: 'left' }}>Login</h3>
                                <h4 style={{ color: 'black', textAlign: 'left' }}>Use an existing account to log in.</h4>
                                <br />
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
                                <button type="submit" onClick={() => { this.login() }} className="btn btn-primary">Login</button>
                                <br />
                                <br />
                                <div style={{ display: 'flex' , justifyContent: 'center'}}>
                                    <h6 style={{ marginRight: '5px' }}>Don't have an account?</h6>
                                    <Link to="/signup">Sign up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}

                <div className="center" style={{ alignItems: 'center' }}>
                    <h1>Log In</h1>

                    Email:
                    <div className="txt_field">
                        <input type="text" id="email_field" /><br />
                    </div>
                    Password:
                    <div className="txt_field">
                        <input type="password" id="password_field" /> <br />
                    </div>

                    <div className="button">
                        <button onClick={() => { this.login() }} className="btn btn-primary">Log in</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;