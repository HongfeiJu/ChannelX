/*
Description: Social Login component for modal
Authors: Darshan Prakash
Date: 10/09/2019
*/

import React, {Component} from 'react';
import './SocialLoginForm.css'
import fire from "../../../../config/Fire";
import * as ROUTES from '../../../../constants/routes';
import {withRouter} from 'react-router-dom';
import {
    auth,
    googleProvider,
    facebookProvider,
    twitterProvider,
    githubProvider,
    emailProvider
} from "../../../../config/Fire";

class SocialLoginForm extends Component {
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
            <div className="social_login_form">
                <h5>login with social account</h5>
                <img
                    src="https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip"
                    alt="google"
                    onClick={() => auth.signInWithPopup(googleProvider).then((u) => {
                    }).then((u) => {
                        console.log(u);
                        this.routeTo(ROUTES.HOME);
                    }).catch((error) => {
                        console.log(error);
                    })}
                />
                <img
                    src="http://www.vectorsland.com/imgd/l62697-new-twitter-logo-49466.png"
                    alt="twitter"
                    onClick={() => auth.signInWithPopup(twitterProvider).then((u) => {
                    }).then((u) => {
                        console.log(u);
                        this.routeTo(ROUTES.HOME);
                    }).catch((error) => {
                        console.log(error);
                    })}
                />
                <img
                    src="http://pngimg.com/uploads/github/github_PNG40.png"
                    alt="github"
                    onClick={() => auth.signInWithPopup(githubProvider).then((u) => {
                    }).then((u) => {
                        console.log(u);
                        this.routeTo(ROUTES.HOME);
                    }).catch((error) => {
                        console.log(error);
                    })}
                />
                <img
                    src="https://www.novotelnewyork.com/wp-content/themes/novotel-template/images/icon-facebook-black.svg"
                    alt="facebook"
                    onClick={() => auth.signInWithPopup(facebookProvider).then((u) => {
                    }).then((u) => {
                        console.log(u);
                        this.routeTo(ROUTES.HOME);
                    }).catch((error) => {
                        console.log(error);
                    })}
                />
            </div>
        );
    }
}

export default withRouter(SocialLoginForm);
