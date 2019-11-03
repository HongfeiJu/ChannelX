/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha, Subhradeep
Date: 9/24/2019
Updated: 10/31/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";

import { Navbar, Nav } from 'react-bootstrap'

import * as ROUTES from "../../constants/routes";


function getUsername() {
    var user = fire.auth().currentUser;

    if (user) {
        return user.displayName;
    }
}

export default class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    routeTo = (path) => this.props.history.push(path);

    logout() {
        fire.auth().signOut();
    }

    state = {
        channels: null,
        data: [],
        filteredData: [],
        userCreatedChannels: [],
        selectedChannel: null,
    };
   
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">ChannelX</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Hello {getUsername()}</Nav.Link>
                        <Nav.Link onClick={() => this.routeTo(ROUTES.LANDING)}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}