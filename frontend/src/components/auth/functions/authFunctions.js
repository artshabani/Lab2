 
    function signup(){
        fetch('http://localhost:5000/api/register' , {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'accept':'application/json'
            },
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password
        })
        }).then((response)=>{
            response.json().then((result)=>{
                console.warn("result",result);
                localStorage.setItem('signupToken',JSON.stringify({
                    signup:true,
                    store:result.token
                }))
                this.storeCollector()
            })
        })
    }
   
    function login(){
        fetch('http://localhost:5000/api/login' , {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'accept':'application/json'
            },
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password
        })
        }).then((response)=>{
            response.json().then((result)=>{
                console.warn("result",result);
                localStorage.setItem('loginToken',JSON.stringify({
                    login:true,
                    store:result.token
                }))
                // this.setState({login:true})
                this.storeCollector()
            })
        })
    }

    function post(){
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

    const logout = () => {
    localStorage.removeItem("user");
    };
  
    const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
    };
  
    const authfunctions = {
    signup,
    login,
    post,
    logout,
    getCurrentUser,
    };
  
export default authService;