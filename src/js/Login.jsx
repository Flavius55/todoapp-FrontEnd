import React from "react";
import {Redirect,Link} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username:"",
          password:""
        }
    }

    onChangeHandler = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      });
  };

    render(){
      if(this.props.isLogged) return(<Redirect to="/dashboard"></Redirect>)
      else return(
          <div className="container">
                
                <div id="orange">
                      Login here
                </div>

                <input type="text" name="username" id="username2" placeholder="username" 
                className="inputs" style={{marginLeft:"20%"}}
                onChange={(e) => this.onChangeHandler(e)} value={this.state.username}/>
                <input type="password" name="password" id="password2" placeholder="password" 
                className="inputs" style={{marginLeft:"20%"}}
                onChange={(e) => this.onChangeHandler(e)} value={this.state.password}/>
                
                <div className="obut" onClick={async () => {
                   let r = await this.props.request(this.state.username,this.state.password);
                   if(r) {
                    let error = document.getElementById("error2");
                    let text = document.getElementById("errorText2");
                    text.textContent=r;
                    error.style.display="flex";
                    setTimeout(() => {
                        error.style.display="none";
                      }, 3000);
                  }
                   }}>
                Submit</div>
                <div id="error2">
                    <p id="errorText2">as</p>
                  </div>

                <Link id="redirect" to="register">
                    <p id="redirectText">I don't have an account!</p>
                </Link>
          </div>
        );
  }
}

export default Login;
