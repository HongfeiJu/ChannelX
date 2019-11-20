/*
Description: SignupForm component for modal
Authors: Subhradeep Biswas, Darshan Prakash
Date: 10/01/2019
*/

import React, {Component} from 'react';
import './SignupForm.css'
import fire from "../../../config/Fire";
import * as ROUTES from '../../../constants/routes';
import {withRouter} from 'react-router-dom';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            passwordConfirm: null,
            fireSignupErrors:'',
            errors: {
                firstName: "",
                lastName: "",
                email: "",
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
        })
        .then((u) => {
            if(fire.auth().currentUser){
                fire.auth().currentUser.updateProfile({
                   displayName: this.state.firstName,
                })
              }
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
            <div className="landing_signupform">
                <hr/>
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
                            type="submit"
                            id="submitButton"
                            className="submitButton"
                            onClick={() => this.routeTo(ROUTES.LANDING)}
                        >Sign up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}


export default withRouter(SignupForm);
