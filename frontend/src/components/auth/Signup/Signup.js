import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            username: null,
            email: null,
            password: null,
            signup: false,
            store: null
        }
    }

    componentDidMount() {
        this.storeCollector()
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('signup'));
        if (store && store.signup) {
            this.setState({ signup: true, store: store })
        }
    }

    signup() {
        const name = document.getElementById('name_field').value;
        const username = document.getElementById('username_field').value;
        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;
        const confirmpassword = document.getElementById('confirmpassword_field').value;

        const requestBody = {
            name: name,
            username: username,
            email: email,
            password: password,
            confirmpassword: confirmpassword
        };

        fetch('http://localhost:5000/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            response.json().then((result) => {
                console.warn("result", result);
                localStorage.setItem('signupToken', JSON.stringify({
                    signup: true,
                    store: result.token
                }))
                this.storeCollector()
            })
        })
    }

    render() {
        return (
            <div className="center" style={{ alignItems: 'center' }}>
                <h1>Sign up</h1>

                Name:
                <div className="txt_field">
                    <input type="text" id="name_field" /> <br />
                </div>

                Username:
                <div className="txt_field">
                    <input type="text" id="username_field" /> <br />
                </div>

                Email:
                <div className="txt_field">
                    <input type="text" id="email_field" /> <br />
                </div>

                Password:
                <div className="txt_field">
                    <input type="password" id="password_field" /> <br />
                </div>

                Confirm Password:
                <div className="txt_field">
                    <input type="password" id="confirmpassword_field" /> <br />
                </div>

                <div className="button">
                    <button onClick={() => { this.signup() }} className="btn btn-primary">Sign up</button>
                </div>
            </div>
        )
    }
}

export default Signup;