
/*
Description: Email Sent page will be displayed when user will submit signup form. This page will display the message that an 
email has been sent to your email address for verification of email.
Authors: Sami, Manisha 
Date: 10/03/2019
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './EmailSent.css';
import * as ROUTES from '../../constants/routes';

class EmailSent extends React.Component {

    routeTo = (path) => this.props.history.push(path);

    render() {
        return (
            <div className="landing_wrapper">
            <div className="signUp_form_emailSent">
                <p> Thank you for registering. To login, please verify your account </p>
                <div className="signUp_form_emailSentbody">
                    <p> An email has been sent to your email address with a link to verify your account</p>  
                </div>
                <div>
                    <button
                        type="button"
                        style={{marginLeft: "auto"}}
                        className="signUp_form_login"
                        onClick={() => this.routeTo(ROUTES.LANDING)}
                    >Login
                    </button>
                </div>
                </div>
            </div>
        );
    };
}

export default EmailSent;