/*
Description: Home page
Authors: Darshan Prakash, Sami
Date: 9/24/2019
*/

import React, {Component} from 'react';
import fire from "../config/Fire";

class Home extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    logout(){
        fire.auth().signOut();
    }
    
    render() {
        return (
            <div className={"Home"}>
                <h1>
                You are in Home!
                </h1>
                <button onClick={this.logout}> Sign out
                </button>
            </div>
        );
    }

}



export default Home;
