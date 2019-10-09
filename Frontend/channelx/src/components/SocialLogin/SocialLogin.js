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
                            onClick={() => auth.signInWithPopup(googleProvider)}
                        >google
                        </button>
                        <button
                            type="submit"
                            id="twitterButton"
                            className="twitterButton"
                            onClick={() => auth.signInWithPopup(twitterProvider)}
                        >twitter
                        </button>
                        <button
                            type="submit"
                            id="githubButton"
                            className="githubButton"
                            onClick={() => auth.signInWithPopup(githubProvider)}
                        >github
                        </button>
                        <button
                            type="submit"
                            id="facebookButton"
                            className="facebookButton"
                            onClick={() => auth.signInWithPopup(facebookProvider)}
                        >facebook
                        </button>
                        <button
                            type="submit"
                            id="cancelSocialButton"
                            className="cancelSocialButton"
                            onClick={() => this.props.onModalLoginClose()}
                        >cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SocialLogin);
