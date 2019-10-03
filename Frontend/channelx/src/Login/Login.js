/*
Description: Login page
Authors: Subhradeep Biswas
Date: 10/01/2019
*/

import React, {Component} from 'react';
import './Login.css'
import fire from "../config/Fire";

class Login extends Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: null,
            password: null,

            errors: {
                email: "",
                password: ""
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
            case 'email':
                break;
            case 'password':
                formErrors.password = value.length<8 ? 'password should be no less than 8 characters': '';
                break;

            default: break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
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
                    <h1>Sign in</h1>
                </div>
                <form onSubmit={this.login}>
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

                    <div className="login">
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


export default Login;
