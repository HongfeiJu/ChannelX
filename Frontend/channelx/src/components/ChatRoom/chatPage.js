/*
Description: Basic ChatRoom page redirected when user clicks join chatRoom button is clicked on home page.
Authors: Manisha
Date: 9/30/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";
import './chatPage.css';
import * as ROUTES from "../../constants/routes";

class chatPage extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    routeTo = (path) => this.props.history.push(path);

    logout(){
        fire.auth().signOut();
    }
    
    render() {
        return (
            <div className="ChatPage">
            <h1> Welcome to Chat room of the users </h1>  
             <button
                    type="button"
                    style={{ marginLeft: "auto" }}
                    className="Logout"
                    onClick={() => this.routeTo(ROUTES.LANDING)}

                >Logout</button>          
            </div>
        );
    }

}

export default chatPage;
