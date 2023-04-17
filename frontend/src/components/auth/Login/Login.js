import React, { Component } from "react";

export class Login extends Component {
    constructor(){
        super();
        this.state={
            username: null,
            password:null,
            login:false,
            store:null
        }
    }

    componentDidMount(){
        this.storeCollector()
    }

    storeCollector(){
        let store=JSON.parse(localStorage.getItem('login'));
        if(store && store.login){
            this.setState({login:true,store:store})
        }
    }

    login(){
        const username = document.getElementById('username_field').value;
        const password = document.getElementById('password_field').value;

        const requestBody = {
            username: username,
            password: password
        };

        fetch('http://localhost:5000/api/login' , {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'accept':'application/json'
            },
            body:JSON.stringify(requestBody)
        }).then((response)=>{
            response.json().then((result)=>{
                console.warn("result",result);
                localStorage.setItem('loginToken', result)
                this.storeCollector()
            })
        })
    }

    post(){
        let token = "Bearer" + localStorage.getItem('loginToken');
        fetch('http://localhost:5000/api/users' , {
            method:"POST",
            headers:{
                'Authorization':token
            },
            body:JSON.stringify(this.state)
        }).then((response)=>{
            response.json().then((result)=>{
                this.setState({
                    response:result.message
                })
                console.warn("result",result);
            })
        })
    }

    // handleLogin = async () => {
    //     const username = document.getElementById('username_field').value;
    //     const password = document.getElementById('password_field').value;

    //     const requestBody = {
    //         username: username,
    //         password: password,
    //     };

    //     try {
    //         const response = await fetch('http://localhost:5000/api/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(requestBody),
    //         });

    //         if (response.ok) {
    //             console.log('Login successful');
    //         } else {
    //             console.error('Login failed');
    //         }
    //     } catch (error) {
    //         console.error('Login error', error);
    //     }
    // }

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
                    <button onClick={()=>{this.login()}} className="btn btn-primary">Log in</button>
                </div>
            </div>
        )
    }
}

export default Login;