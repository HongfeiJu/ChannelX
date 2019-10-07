/*
Description: Login page
Authors: Subhradeep Biswas
Date: 10/01/2019
*/

import React, {Component} from 'react';
import './Login.css'
import fire from "../../config/Fire";

import * as ROUTES from '../../constants/routes';

class Login extends Component{
    constructor(props){
        super(props);
        this.forgetpass = this.forgetpass.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: null,

            errors: {
                email: ""
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
          
            default: break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    forgetpass(e) {
        e.preventDefault();
        fire.auth().sendPasswordResetEmail(this.state.email).then((u) => {
            alert('Please check your email...')
            this.routeTo(ROUTES.SIGN_IN);
        }).catch((error) => {
          //alert(error.code);
          console.log(error);
        })
    }

    render(){
        return <div className="wrapper">
            <div className="form-wrapper">
                <div className="FormTitle">
                    <h1>Reset your password</h1>
                </div>
                <form onSubmit={this.forgetpass}>
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

                    

                    <div className="Reset">
                        <button
                            type="button"
                            id="cancelButton"
                            className="cancelButton"
                            onClick={() => this.routeTo(ROUTES.SIGN_IN)}
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
