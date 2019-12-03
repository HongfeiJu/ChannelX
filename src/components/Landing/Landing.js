/*
Description: Landing page which is displayed when user starts running the application
Authors: Hongfei Ju
Date: 11/12/2019
*/

import React from 'react';
import './Landing.css';
import SignupForm from "./SignupForm/SignupForm";
import LoginForm from "./LoginForm/LoginForm";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.switchToSignup=this.switchToSignup.bind(this);
        this.switchToLogin=this.switchToLogin.bind(this);
        this.state = {
            login:true,
            isModalVisible: false,
            isModalLoginVisible: false,
            isModalSocialLoginVisible: false
        }
    }

    routeTo = (path) => this.props.history.push(path);

    modalCall = () => {
        this.setState({isModalVisible: true})
    };

    modalLoginCall = () => {
        this.setState({isModalLoginVisible: true})
    };

    modalSocialLoginCall = () => {
        this.setState({isModalSocialLoginVisible: true})
    };

    onModalClose = () => this.setState({isModalVisible: false});

    onModalLoginClose = () => this.setState({isModalLoginVisible: false});

    onModalSocialLoginClose = () => this.setState({isModalSocialLoginVisible: false});

    form() {
        if(this.state.login){
            return <LoginForm/>;
        }else{
            return <SignupForm/>;
        }
    }

    switchToLogin(){
        this.setState({login: true})
    }

    switchToSignup(){
        this.setState({login: false})
    }

    render() {
        return (
            <div className="landing_wrapper">
                <div className="landing_header">
                    <div className="landing_header_title">
                        <img className="" src={process.env.PUBLIC_URL + '/Title.PNG'}  alt="channelX"/>
                    </div>
                    <div className="landing_header_links">
                        <a href="AboutUs">About us</a>
                        <a href="https://github.com/HongfeiJu/ChannelX">FAQs</a>
                    </div>
                </div>
                <div className="landing_body">
                    <div className="landing_left">
                        <div className="landing_left_description">
                            <p> ChannelX will make it possible to create, share, and destroy transient communication
                                channels. </p>
                            <p> These channels are tied to your existing communication streams (e-mail, Social accounts,
                                etc.)
                                without exposing your personal information.</p>
                        </div>
                    </div>
                    <div className="landing_right">
                        <div className="landing_right_form">
                            <div>
                                <button
                                    style={{backgroundColor:this.state.login?'white':'lightgrey'}}
                                    className="landing_right_form_btn"
                                    onClick={
                                        this.switchToLogin
                                    }
                                >login</button>
                                <button
                                    style={{backgroundColor:this.state.login?'lightgrey':'white'}}
                                    className="landing_right_form_btn"
                                    onClick={
                                        this.switchToSignup
                                    }
                                >sign up</button>
                            </div>
                            <div>
                                {this.form()}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Landing;

