import React, {Component} from 'react';
import './SocialLogin.css'
import fire from "../../config/Fire";
import * as ROUTES from '../../constants/routes';
import {withRouter} from 'react-router-dom';
import {auth, googleProvider, facebookProvider, twitterProvider, githubProvider, emailProvider} from "../../config/Fire";

class SocialLogin extends Component{
    routeTo = (path) => this.props.history.push(path);

    state = { isSignedIn: false }
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
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }


    handleSubmit=e=>{
        console.log("submit button");
        e.preventDefault();
    };

    render(){
        return (
            <div className="wrapper">
                <header>
                    <h1> Social Login </h1>
                </header>
                <div className="createAccount">
                    <div className="Buttons">
                    <button
                        type="submit"
                        id="submitButton"
                        className="submitButton"
                        onClick = {() => auth.signInWithPopup(googleProvider)}
                    >google</button>
                    </div>
                    <div className="Buttons">
                    <button
                        type="submit"
                        id="submitButton"
                        className="submitButton"
                        onClick = {() => auth.signInWithPopup(twitterProvider)}
                    >twitter</button>
                    </div>
                    <div className="Buttons">
                    <button
                        type="submit"
                        id="submitButton"
                        className="submitButton"
                        onClick = {() => auth.signInWithPopup(githubProvider)}
                    >github</button>
                    </div>
                    <div className="Buttons">
                    <button
                        type="submit"
                        id="submitButton"
                        className="submitButton"
                        onClick = {() => auth.signInWithPopup(facebookProvider)}
                    >facebook</button>
                    </div>
                </div>

            </div>
        );

    }
}

export default withRouter(SocialLogin);