/*
Description: Email Sent page will be displayed when user will submit signup form. This page will display the message that an 
email has been sent to your email address for verification of email.
Authors: Sami
Date: 10/03/2019
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../VerificationEmailPage/EmailSent.css'
import * as ROUTES from '../../constants/routes';

class EmailSent extends React.Component {

    routeTo = (path) => this.props.history.push(path);

    render(){
        return (
            <div className="wrapper">
                <header>
                    <h1> Thank you for registering. Please verify your account  </h1>
                </header>
                <div>

                    <p> In order to Login Please Verify your account. </p>
                    <p> An email has been sent to your email address with a link to verify your account</p>
                </div>
                    <div className="Register">
                        <button
                            type="button"
                            style={{ marginLeft: "auto" }}
                            className="Register"
                            onClick={() => this.routeTo(ROUTES.SIGN_IN)}
                        >Login</button>
                    </div>
                    

                </div>
            );

        };
    }
    export default EmailSent;
