import React, { Component } from "react";

export class Login extends Component {
    render() {
        return (
            <div className="center" style={{ alignItems: 'center' }}>
                <h1>Log In</h1>

                <div className="txt_field">
                    <input type="text" id="username_field" /> <br />
                </div>

                <div className="txt_field">
                    <input type="password" id="password_field" /> <br />
                </div>

                <div className="button">
                    <button className="btn btn-primary">Log in</button>
                </div>
            </div>
        )
    }
}

export default Login;