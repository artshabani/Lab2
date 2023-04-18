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
    
        const requestBody = {
            name: name,
            username: username,
            email: email,
            password: password
        };

        fetch('http://localhost:5000/api/account/register', {
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
            // <>
            //      <div class="tab-content">
            //         <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            //             <form class='card p-3 bg-light' style={{ width: 700, display: 'inline-block', top: 30 }} >

            //             <div class="form-outline mb-4">
            //                 <input type="text" id="name_field" class="form-control" />
            //                 <label class="form-label" for="registerName">Name</label>
            //             </div>


            //             <div class="form-outline mb-4">
            //                 <input type="text" id="username_field" class="form-control" />
            //                 <label class="form-label" for="registerUsername">Username</label>
            //             </div>


            //             <div class="form-outline mb-4">
            //                 <input type="email" id="registerEmail" class="form-control" />
            //                 <label class="form-label" for="registerEmail">Email</label>
            //             </div>


            //             <div class="form-outline mb-4">
            //                 <input type="password" id="password_field" class="form-control" />
            //                 <label class="form-label" for="registerPassword">Password</label>
            //             </div>


            //             <div class="form-outline mb-4">
            //                 <input type="password" id="confirmpassword_field" class="form-control" />
            //                 <label class="form-label" for="registerRepeatPassword">Confirm password</label>
            //             </div>

            //             <div class="form-check d-flex justify-content-center mb-4">
            //                 <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
            //                     aria-describedby="registerCheckHelpText" />
            //                 <label class="form-check-label" for="registerCheck">
            //                     I have read and agree to the terms
            //                 </label>
            //             </div>


            //             <button onClick={() => { this.signup() }} type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
            //         </form>
            //     </div>
            //     </div>
            // </>

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

                <div className="button">
                    <button onClick={() => { this.signup() }} className="btn btn-primary">Sign up</button>
                </div>
            </div>
        )
    }
}

export default Signup;