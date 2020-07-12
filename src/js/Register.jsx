import React from "react";
import {BrowserRouter as Redirect,Link} from "react-router-dom";
import "../css/Register.css";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username:"",
          password:"",
          email:""
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
              <div id="forPc">

                    <div id="orange">
                      Register here
                    </div>
                    <input type="text" name="username" id="username" placeholder="username" 
                    className="inputs" style={{marginLeft:"20%"}}
                    onChange={(e) => this.onChangeHandler(e)} value={this.state.username}/>

                    <input type="text" name="email" id="email" placeholder="email" 
                    className="inputs" style={{marginLeft:"25%", width:"55%"}}
                    onChange={(e) => this.onChangeHandler(e)} value={this.state.email}/>

                    <input type="password" name="password" id="password" placeholder="password" 
                    className="inputs" style={{marginLeft:"20%"}}
                    onChange={(e) => this.onChangeHandler(e)} value={this.state.password}/>

                  <div className="obut" onClick={async () => {
                    let r = await this.props.request(this.state.username,this.state.password,this.state.email);
                    if(r) {
                        let error = document.getElementById("error");
                        let text = document.getElementById("errorText");
                        text.textContent=r;
                        error.style.display="flex";
                        setTimeout(() => {
                            error.style.display="none";
                          }, 3000);
                      }
                      else{
                        let redirect = document.getElementById("redirect");
                        let text = document.getElementById("redirectText");
                        redirect.style.color="green";
                        redirect.style.border="solid green 5px";
                        redirect.style.borderRight="none";
                        redirect.style.borderLeft="none";
                        redirect.style.borderTop="none";
                        text.textContent="To the Login page!";
                      }
                    }}>
                  Submit</div>
                  
                  <div id="error">
                    <p id="errorText">as</p>
                  </div>
                  <Link id="redirect" to="login">
                    <p id="redirectText">I already have an account!</p>
                  </Link>
                  {/* <div id="designBar"></div> */}
                  {/* <div id="sideBar">
                    <div className="wrap">
                      <p>Make your time count!</p>
                      <br/>
                      <p>Use TODOAPP evrey day!</p>
                    </div>
                  </div>*/}
              </div>

              
          </div>
        );
  }
}

export default Register;
