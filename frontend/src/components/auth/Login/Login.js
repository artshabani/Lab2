import React, { Component } from "react";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            login: false,
            store: null
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
        const username = document.getElementById('username_field').value;
        const password = document.getElementById('password_field').value;

        const requestBody = {
            username: username,
            password: password
        };

        fetch('http://localhost:5000/api/login/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            response.json().then((result) => {
                console.warn("result", result);
                localStorage.setItem('loginToken', result)
                this.storeCollector()
            })


            if (response.ok) {
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        })
    }

    post() {
        let token = "Bearer" + localStorage.getItem('loginToken');
        fetch('http://localhost:5000/api/users', {
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

    render() {
        return (
            <>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form class='card p-3 bg-light' style={{ width: 700, display: 'inline-block', top: 30 }} >
                        <div class="form-outline mb-4">
                            <input type="email" id="username_field" class="form-control" />
                            <label class="form-label" for="loginName">Username</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="password" id="password_field" class="form-control" />
                            <label class="form-label" for="loginPassword">Password</label>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6 d-flex justify-content-center">

                                <div class="form-check mb-3 mb-md-0">
                                    <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                                    <label class="form-check-label" for="loginCheck"> Remember me </label>
                                </div>
                            </div>

                            <div class="col-md-6 d-flex justify-content-center">

                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>


                        <button onClick={() => { this.login() }} type="submit" class="btn btn-primary" style={{ width: 80 }}>Log in</button>


                        <div class="text-center">
                            <p>Not a member? <a href="#!">Register</a></p>
                        </div>
                    </form>
                </div>
            </div >
            </>
  )
    }
}

export default Login;

            // <div className="center" style={{ alignItems: 'center' }}>
            //     <h1>Log In</h1>

            //     <div className="txt_field">
            //         <input type="text" id="username_field" /> <br />
            //     </div>

            //     <div className="txt_field">
            //         <input type="password" id="password_field" /> <br />
            //     </div>

            //     <div className="button">
            //         <button onClick={() => { this.login() }} className="btn btn-primary">Log in</button>
            //     </div>
            // </div>