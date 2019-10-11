/*
Description: Signup component for modal
Authors: Subhradeep Biswas, Darshan Prakash
Date: 10/01/2019
*/

import React, {Component} from 'react';
import './Signup.css'
import fire from "../../config/Fire";
import * as ROUTES from '../../constants/routes';
import {withRouter} from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            tel: null,
            userName: null,
            password: null,
            passwordConfirm: null,
            fireSignupErrors:'',
            errors: {
                firstName: "",
                lastName: "",
                email: "",
                tel: "",
                userName: "",
                password: "",
                passwordConfirm: "",
            }
        }
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
            case 'firstName':
                break;
            case 'lastName':
                break;
            case 'email':
                break;
            case 'tel':
                break;
            case 'userName':
                formErrors.userName = value.length < 8 ? 'username should be no less than 8 characters' : '';
                break;
            case 'password':
                formErrors.password = value.length < 8 ? 'password should be no less than 8 characters' : '';
                break;
            case 'passwordConfirm':
                setTimeout(e => {
                        formErrors.passwordConfirm =
                            this.state.password === this.state.passwordConfirm ? '' : 'password doesn\'t match';
                        console.log(formErrors.passwordConfirm);
                        this.forceUpdate();
                    },
                    200
                );
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    signup(e) {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then( credentials => {
            fire.auth().currentUser.sendEmailVerification();
            fire.firestore().collection('users').doc(credentials.user.uid).set({
                email : this.state.email,
                firstName : this.state.firstName,
                lastName : this.state.lastName
            });
        }).then((u) => {
            console.log(u);
            this.routeTo(ROUTES.EMAIL_SENT);
        }).catch((error) => {
            this.setState({fireSignupErrors : error.message})
        })
    }


    render() {
        let signupErrorNotification = this.state.fireSignupErrors ?
            (<div> { this.state.fireSignupErrors}</div>): null;
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <div className="FormTitle">
                        <h1>Create an Account</h1>
                    </div>
                    <div className="errorMessage">
                        {signupErrorNotification}
                    </div>
                    <form onSubmit={this.signup}>
                        <div className="firstName">
                            <input
                                type="text"
                                id="firstName"
                                placeholder="First Name"
                                name="firstName"
                                required
                                onChange={this.handleChange}
                            >
                            </input>
                        </div>
                        <div className="lastName">
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                required
                                onChange={this.handleChange}
                            >
                            </input>
                        </div>
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
                        <div className="tel">
                            <input
                                type="tel"
                                id="tel"
                                className="FormField__input"
                                placeholder="tel"
                                name="tel"
                                required
                                onChange={this.handleChange}
                            >
                            </input>
                        </div>
                        <hr/>
                        <div className="userName">
                            <input
                                type="text"
                                id="userName"
                                className="FormField__input"
                                placeholder="user name"
                                name="userName"
                                required
                                onChange={this.handleChange}
                            >
                            </input>
                            {this.state.errors.userName.length > 0 && (
                                <span className="errorMessage">{this.state.errors.userName}</span>
                            )}
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
                            >
                            </input>
                            {this.state.errors.password.length > 0 && (
                                <span className="errorMessage">{this.state.errors.password}</span>
                            )}
                        </div>
                        <div className="password">
                            <input
                                type="password"
                                id="passwordConfirm"
                                className="FormField__input"
                                placeholder="confirm password"
                                name="passwordConfirm"
                                required
                                onChange={this.handleChange}
                            >
                            </input>
                            {this.state.errors.passwordConfirm.length > 0 && (
                                <span className="errorMessage">{this.state.errors.passwordConfirm}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button
                                type="button"
                                id="cancelButton"
                                className="cancelButton"
                                onClick={() => this.props.onModalClose()}
                            >Cancel
                            </button>
                            <button
                                type="submit"
                                id="submitButton"
                                className="submitButton"
                                onClick={() => this.routeTo(ROUTES.LANDING)}
                            >Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default withRouter(Signup);
