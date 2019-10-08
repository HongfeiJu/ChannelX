/*
Description: Home page
Authors: Darshan Prakash, Sami
Date: 9/24/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";
import './Home.css'

class Home extends Component{
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
            <div className="Home">
                <div className = "Header"> 
                    <button id="logout"
                        type="button"
                        style={{ marginLeft: "auto" }}
                        onClick={() => this.routeTo('/')}
                    >Logout</button>
                </div>
                <div className = "Main">
                </div>
                <div className = "Footer">
                </div>
            </div>
        );
    }

}



export default Home;
