/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha
Date: 9/24/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";
import './Home.css'

import * as ROUTES from "../../constants/routes";

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    routeTo = (path) => this.props.history.push(path);

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div className="Home">
                <div className="Header">
                    <button id="createChannel"
                            type="button"
                            style={{marginLeft: "auto"}}
                            className="CreateChannel"
                            onClick={() => this.routeTo(ROUTES.CREATE_CHANNEL)}
                    >Create Channel
                    </button>
                    <button id="join"
                            type="button"
                            style={{marginLeft: "auto"}}
                            className="Join Channel"
                            onClick={() => this.routeTo(ROUTES.CHAT_PAGE)}>
                        Join Channel
                    </button>
                    <button id="logout"
                            type="button"
                            style={{marginLeft: "auto"}}
                            className="Logout"
                            onClick={() => this.routeTo(ROUTES.LANDING)}
                    >Logout
                    </button>
                </div>
                <div className="Main">
                </div>
                <div className="Footer">
                </div>
            </div>
        );
    }

}

export default Home;
