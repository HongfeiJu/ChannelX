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
    routeTo = (path) => this.props.history.push(path);

    logout(){
        fire.auth().signOut();
    }
    
    render() {
        return (
            <div className="Register">
                <button
                    type="button"
                    style={{ marginLeft: "auto" }}
                    className="Logout"
                    onClick={() => this.routeTo('/')}

                >Logout</button>
            </div>
        );
    }

}



export default Home;
