/*
Description: Social Login component for modal
Authors: Darshan Prakash
Date: 10/09/2019
*/

import React, {Component} from 'react';
import './SocialLogin.css'
import fire from "../../config/Fire";
import * as ROUTES from '../../constants/routes';
import {withRouter} from 'react-router-dom';
import {
    auth,
    googleProvider,
    facebookProvider,
    twitterProvider,
    githubProvider,
    emailProvider
} from "../../config/Fire";

class SocialLogin extends Component {
    constructor(props) {
        super(props);
    }

    routeTo = (path) => this.props.history.push(path);

    state = {isSignedIn: false}
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            googleProvider,
            facebookProvider,
            twitterProvider,
            githubProvider,
            emailProvider
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }


    componentDidMount = () => {
        auth.onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user})
            console.log("user", user)
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <div className="FormTitle">
                        <h1>Social Login</h1>
                    </div>
                    <div className="socialLoginButtons">
                        <button
                            type="submit"
                            id="googleButton"
                            className="googleButton"
                            onClick={() => auth.signInWithPopup(googleProvider).then((u) => {
                            }).then((u) => {
                                console.log(u);
                                this.routeTo(ROUTES.HOME);
                            }).catch((error) => {
                                console.log(error);
                            })}
                        >Google
                        </button>
                        <button
                            type="submit"
                            id="twitterButton"
                            className="twitterButton"
                            onClick={() => auth.signInWithPopup(twitterProvider).then((u) => {
                            }).then((u) => {
                                console.log(u);
                                this.routeTo(ROUTES.HOME);
                            }).catch((error) => {
                                console.log(error);
                            })}
                        >Twitter
                        </button>
                        <button
                            type="submit"
                            id="githubButton"
                            className="githubButton"
                            onClick={() => auth.signInWithPopup(githubProvider).then((u) => {
                            }).then((u) => {
                                console.log(u);
                                this.routeTo(ROUTES.HOME);
                            }).catch((error) => {
                                console.log(error);
                            })}
                        >Github
                        </button>
                        <button
                            type="submit"
                            id="facebookButton"
                            className="facebookButton"
                            onClick={() => auth.signInWithPopup(facebookProvider).then((u) => {
                            }).then((u) => {
                                console.log(u);
                                this.routeTo(ROUTES.HOME);
                            }).catch((error) => {
                                console.log(error);
                            })}
                        >facebook
                        </button>
                        <button
                            type="submit"
                            id="cancelSocialButton"
                            className="cancelSocialButton"
                            onClick={() => this.props.onModalLoginClose()}
                        >I'm old school
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SocialLogin);
