/*
Description: LoginForm component for modal
Authors: Subhradeep Biswas, Darshan Prakash, Hongfei Ju, Manisha Miriyala
Date: 11/20/2019
*/

import React, {Component} from 'react';
import './LoginForm.css'
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import firebase from "firebase";
import SocialLoginForm from "./SocialLoginForm/SocialLoginForm";
import Modal from '@material-ui/core/Modal'
import ForgetPasword from './ForgetPassword';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: null,
            password: null,
            fireLoginErrors:'',
            forgotPasswordModal: false,
            errors: {
                email: "",
                password: ""
            }
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if(user) {
                this.setState({
                    emailVerified: firebase.auth().currentUser.emailVerified
                });
            } else {
                this.setState({emailVerified : false});
            }
        });
    }

    routeTo(path) {
        this.props.history.push(path);
    }

    handleSubmit = e => {
        console.log("submit button");
        e.preventDefault();
    };

    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.errors;

        switch (name) {
            case 'email':
                break;
            case 'password':
                formErrors.password = value.length < 8 ? 'password should be no less than 8 characters' : '';
                break;

            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    login(e) {
        e.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() =>{
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        }).then(() => {
            setTimeout(e => {
                if(this.state.emailVerified === true)
                    this.routeTo(ROUTES.HOME);
                else {
                    this.setState({fireLoginErrors: "Kindly verify your email before you login"})
                }
            }, 500);
        }).catch((error) => {
          console.log(error);
          this.setState({fireLoginErrors : error.message})
        })
    }

    openForgotPasswordModal = () => {
        this.setState({ forgotPasswordModal: true })
    }

    closeForgotPasswordModal = () => {
        this.setState({ forgotPasswordModal: false })
    }



    render() {
        let loginErrorNotification = this.state.fireLoginErrors ?
            (<div> { this.state.fireLoginErrors}</div>): null;
        return (
            <div className="landing_signupform">
                <div className="errorMessage">
                    {loginErrorNotification}
                </div>
                <hr/>
                <form onSubmit ={this.login}>   
                    <div className="email">
                        <input
                            type="email"
                            id="email"
                            placeholder="email"
                            name="email"
                            required
                            onChange={this.handleChange}
                        >
                        </input>
                    </div>

                    <div className="password">
                        <input
                            type="password"
                            id="password"
                            className="FormField__input"
                            placeholder="password"
                            name="password"
                            required
                            onChange={this.handleChange}
                        ></input>
                        {this.state.errors.password.length > 0 && (
                            <span className="errorMessage">{this.state.errors.password}</span>
                        )}
                    </div>

                    <div className="login_form_control">
                        <div className="login_form_login">
                            <button
                                type="submit"
                                id="loginSubmitButton"
                            >Login
                            </button>
                        </div>
                        <div className="login_form_forget">
                            <button
                                type="button"
                                id="forgotPasswordButton"
                                onClick={(e) => this.openForgotPasswordModal()}
                            >Forgot Password?
                            </button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.forgotPasswordModal}
                                onClose={this.closeForgotPasswordModal}
                            >
                                <ForgetPasword
                                    closeForgotPasswordModal={this.closeForgotPasswordModal}
                                />
                            </Modal>
                            {/* <a href="#" onClick={() => this.logoutModalCall()} >Forgot password?</a> */}
                        </div>
                    </div>
                </form>
                <div>or</div>
                <div>
                    <SocialLoginForm/>
                </div>
            </div>
        );
    }
}


export default withRouter(LoginForm);

