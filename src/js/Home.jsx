import React from "react";
import "../css/Home.css"


function Home(){
    return(<div className="container">
        
        <div id="bigtext">
            <p>Welcome to TODOAPP, easly manage your chores</p>
            <div>
                <a id="aaa" href="/login">Login now</a>
            </div>
        </div>

        <div id="credits">
            <div className="wrap">
                <p>Made by Flavius Rabuga</p>
            </div>
        </div>
    </div>)
};

export default Home;