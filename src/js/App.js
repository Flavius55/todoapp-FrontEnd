import React from 'react';
import {BrowserRouter as Router,Switch,Route,
  // Link
} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Home from "./Home"
//const control = require('./control');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      // backDev:"http://localhost:5000/",
      backDev:"https://todoappfr.herokuapp.com/"
    }
    this.setLoggedToTrue = this.setLoggedToTrue.bind(this);
    this.sendLoginData = this.sendLoginData.bind(this);
    // this.sendTodo = this.sendTodo.bind(this);
  }

  setLoggedToTrue=() =>{
    this.setState({isLogged:true});
  }
  setLoggedToFalse=() =>{
    this.setState({isLogged:false});
    localStorage.clear();
  }
  setLoggedToFalseOnly=() =>{
    this.setState({isLogged:false});
    localStorage.clear();
  }

  async sendTodo(send,backDev){
    if(send){
        const response = await fetch(backDev+"addtodo" , {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body:JSON.stringify({
                token:localStorage.getItem("token"),
                todo:send
            })
        })
        const json = await response.json();
        return json;
    }
}

  async sendLoginData(username,password){
    //form validation
    let r;
    if(username==="" || password==="") r="Please fill all fields!";
    if(r) return r;
    else{
      //comunicate with the server
      const response = await fetch(this.state.backDev+"login" , {
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              username:username,
              password:password
          })
      })
      const json = await response.json();
      if(!json.error) {
       
        //localStorage.clear();
        localStorage.setItem("token",json.token);
        this.setLoggedToTrue();
      }
      return json.error; 
  }
}

  async sendRegisterData(username,password,email) {
    //form validation
    let r;
    if(username==="" || password==="" || email==="") r="Please fill all fields!";
    else if(!username[0].match(/[a-z]/i)) r="Username can't start with a number!";
    else if(username.match(/ /)) r="Username can't contain special caracters!";
    else if(!email.match(/@/)) r="Please enter a valid email!";
    else if(email.match(/ /)) r="Please enter a valid email!";
    if(r) return r;
      else{
        //comunicate with the server
        const response = await fetch(this.state.backDev+"register" , {
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username:username,
            password:password,
            email:email
          })
        });
        const json = await response.json();
        return(json.error);
    }
  }

  render(){
    return(
        <Router>
          {/* <div>
            <ul>
              <li>
                <Link to="login">Login</Link>
              </li>
              <li>
                <Link to="register">Register</Link>
              </li>
              <li>
                <Link to="">Home</Link>
              </li>
              <li>
                
                <Link onClick={this.setLoggedToFalse} to="login">Log out</Link>
              </li>
            </ul>
          </div>

          <hr /> */}

          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/login" render={(props)=> (<Login 
            {...props}
            isLogged={this.state.isLogged}
            redirectLink="/register"
            request={this.sendLoginData}
            logMeIn={this.setLoggedToTrue}
            logMeOut={this.setLoggedToFalse}
            backDev={this.state.backDev}
            />)}/>
            <Route exact path="/Register" render={(props)=>(<Register
            isLogged={this.state.isLogged}
            request={this.sendRegisterData}
            backDev={this.state.backDev}
            />)}/>
            <Route exact path="/Dashboard" render={(props)=> (<Dashboard 
            {...props}
            isLogged={this.state.isLogged}
            sendTodo = {this.sendTodo}
            logMeOut = {this.setLoggedToFalseOnly}
            backDev={this.state.backDev}
            // getTodos={this.getTodos}
            />)}/>
          </Switch>
        </Router>


    
    )
  }

}

export default App;
