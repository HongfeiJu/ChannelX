/*
Description: Signup page
Authors: Hongfei Ju
Date: 9/20/2019
*/

import React, {Component} from 'react';
import './Signup.css'

class Signup extends Component{

    onSubmit=e=>{
        console.log("submit button");
        e.preventDefault();
    };

    render(){
        return <div className="wrapper">
            <div className="form-wrapper">
                <div className="FormTitle">
                    <h1>create an account</h1>
                </div>
                <form onSubmit={this.onSubmit} noValidate>
                    <div className="firstName">
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            name="firstName"
                            required
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
                        >
                        </input>
                    </div>
                    <div className="phone">
                        <input
                            type="phone"
                            id="phone"
                            className="FormField__input"
                            placeholder="phone"
                            name="phone"
                            required
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
                        >
                        </input>
                    </div>
                    <div className="password">
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="FormField__input"
                            placeholder="confirm password"
                            name="password"
                            required
                        >
                        </input>
                    </div>
                    <div className="createAccount">
                        <button
                            type="button"
                            className="cancelButton"
                        >cancel</button>
                        <button
                            type="submit"
                            className="submitButton"
                        >submit</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}


export default Signup;
