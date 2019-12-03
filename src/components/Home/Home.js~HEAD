/*
Description: Home page
Authors: Darshan Prakash, Sami
Date: 9/24/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";

import * as ROUTES from "../../constants/routes";

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
                    className="Join Channel"
                    onClick={() => this.routeTo(ROUTES.CHAT_PAGE)}>
                Join Channel</button>

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

export default Home;
