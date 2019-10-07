/*
Description: Landing page which is displayed when user starts running the application
Authors: Manisha Miriyala
Date: 9/17/2019
*/

import React from 'react';
import './Landing.css';
import Modal from '@material-ui/core/Modal';
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

class Landing extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            isModalLoginVisible: false
        }
    }

    routeTo = (path) => this.props.history.push(path);


    modalCall = () => {
        this.setState({isModalVisible: true})

    }
    modalLoginCall = () => {
        this.setState({isModalLoginVisible: true})

    }

    onModalClose = () => this.setState({ isModalVisible: false })

    onModalLoginClose = () => this.setState({ isModalLoginVisible: false })

    render(){
        return <div className="wrapper">
            <header>
                <h1> Welcome to ChannelX </h1>
            </header>
            <div className="Register">
                <button
                    type="button"
                    style={{marginLeft: "auto"}}
                    className="Register"
                    onClick={() => this.modalCall()}
                >Register
                </button>
            </div>

            <div className="Login">
                <button
                    type="button"
                    style={{marginLeft: "auto"}}
                    className="Login"
                    onClick={() => this.modalLoginCall()}
                >Login
                </button>
            </div>
            <div>
                <p> ChannelX will make it possible to create, share, and destroy transient communication channels. </p>
                <p> These channels should be tied to users existing communication streams (e.g., SMS, e-mail, etc.)
                    without exposing the users actual phone number or e-mail address.</p>

            </div>
            <Modal
                open={this.state.isModalVisible}
                close={() => this.onModalClose()}
                onBackdropClick={() => this.onModalClose()}
            >
                <Signup
                    onModalClose={this.onModalClose}
                />
            </ Modal>
            <Modal
                open={this.state.isModalLoginVisible}
                close={() => this.onModalLoginClose()}
                onBackdropClick={() => this.onModalLoginClose}
            >
                <Login
                    onModalLoginClose={this.onModalLoginClose}
                />
            </Modal>

        </div>
    };
}
export default Landing;
