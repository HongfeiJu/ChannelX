/*
Description: Signup page
Authors: Hongfei Ju
Date: 9/20/2019
*/

import React, {Component} from 'react';
import './Signup.css'
import fire from "../config/Fire";

class Signup extends Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
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

    handleSubmit=e=>{
        console.log("submit button");
        e.preventDefault();
    };

    handleChange=e=>{
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.errors;

        switch(name){
            case 'firstName':
                break;
            case 'lastName':
                break;
            case 'email':
                break;
            case 'tel':
                break;
            case 'userName':
                formErrors.userName = value.length<8 ? 'username should be no less than 8 characters': '';
                break;
            case 'password':
                formErrors.password = value.length<8 ? 'password should be no less than 8 characters': '';
                break;
            case 'passwordConfirm':
                setTimeout(e=>{
                        formErrors.passwordConfirm =
                            this.state.password === this.state.passwordConfirm ? '' : 'password doesn\'t match';
                        console.log(formErrors.passwordConfirm);
                        this.forceUpdate();
                    },
                    200
                );
                break;
            default: break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        } );
    }

    signup(e){
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{
            console.log(u);
            this.routeTo('/home');
        }).catch((error) => {
                console.log(error);
            })
    }


    render(){
        return <div className="wrapper">
            <div className="form-wrapper">
                <div className="FormTitle">
                    <h1>create an account</h1>
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
                            onClick={() => this.routeTo('/')}
                        >cancel</button>
                        <button
                            type="submit"
                            id="submitButton"
                            className="submitButton"
                        >submit</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}


export default Signup;
