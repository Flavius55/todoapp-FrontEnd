import React from "react";
import { Redirect } from "react-router-dom";
import "../css/Dashboard.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            send:"",
            username:"",
            no:""
        }
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    send(){
        let button = document.getElementById("newButton");
        let button2 = document.getElementById("newButton2");
        button.style.display="none";
        button2.style.display="flex";
        let send = document.getElementById("send");
        send.style.display="flex";
    }

    async componentDidMount(){
        if(this.props.isLogged){
            let json = await renderTodos();
            this.setState({
                no:json.no,
                username:json.username
            })
            let name = document.getElementById("username");
            let no = document.getElementById("no");
            no.textContent=json.no+" tasks";
            name.textContent=json.username;

        }
    }

    render(){
        if(this.props.isLogged)
        return(
        <div className="container">
            
            <div id="upperBar"></div>
            <div className="infoBar">
                <p style={{marginRight:"55vw"}} id="username" onClick={()=>{
                    this.props.logMeOut();
                }}>aaa</p>

                <p id="no">5 todos</p>
            </div>

            <div id="todos"></div>
            <div id="space"></div>

            <div id="addTodo">
                <div id="newButton" onClick={this.send}>+</div>
                <input type="text" id="send" name="send" placeholder="enter your task here"
                onChange={(e)=>{this.onChangeHandler(e)}}></input>

                <div id="newButton2" onClick={async()=>{
                    let button = document.getElementById("newButton");
                    let button2 = document.getElementById("newButton2");
                    button.style.display="flex";
                    button2.style.display="none";
                    let send = document.getElementById("send");
                    send.style.display="none";
                    let no = document.getElementById("no");
                    this.state.no++;
                    no.textContent=this.state.no+" tasks";
                    await this.props.sendTodo(this.state.send);
                    this.state.send="";
                    await renderTodos();
                }} style={{display:"none"}}>+
                </div>
            </div>

            
        </div>
        );
        else return(<Redirect to="/login"></Redirect>)
    }


}



async function renderTodos(){
    let json = await getTodo();
        let cont = document.getElementById("todos");
        let t = document.getElementsByClassName("todo");
        while(t[0]) t[0].remove();
        for(let i=json.data.length-1; i>=0; i--){
            if(!json.data[i].done){
                let todo = document.createElement("div");
                let check = document.createElement("div");
                check.onclick=async function(){
                    check.nextSibling.style.textDecoration="line-through";
                    check.style.backgroundColor="rgb(212, 0, 255)";
                   await fetch("https://todoappfr.herokuapp.com/deltodo",{
                        method:"POST",
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body:JSON.stringify({
                            todo:check.nextSibling.textContent,
                            token:localStorage.getItem("token")
                        })
                    })
                }
                check.classList.add("check");
                todo.classList.add("todo");
                todo.appendChild(check);
                let p = document.createElement("p");
                p.textContent = json.data[i].todo;
                todo.appendChild(p);
                cont.appendChild(todo);
            }
    }
    return json;
}

async function getTodo(){
    const response = await fetch("https://todoappfr.herokuapp.com/gettodo" , {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body:JSON.stringify({
            token:localStorage.getItem("token")
        })
    })
    const json = await response.json();
    return json;
}

export default Dashboard;