import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export class Signup extends Component {

    render() {
        return (
          <div className="center" style={{ alignItems: 'center' }}>
                <h1>Sign up</h1>

                <div className="txt_field">
                    <input type="text" id="username_field" /> <br />
                </div>

                <div className="txt_field">
                    <input type="password" id="password_field" /> <br />
                </div>

                <div className="button">
                    <button className="btn btn-primary">Sign up</button>
                </div>
            </div>
        )
    }
}

export default Signup;