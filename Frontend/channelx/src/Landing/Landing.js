/*
Description: Landing page
Authors: Manisha Miriyala
Date: 9/20/2019
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Landing.css'
import { Button} from 'reactstrap';

/*import Button from 'react-bootstrap-button-loader';*/
class Landing extends React.Component {

routeTo = (path) => this.props.history.push(path);

render(){
    return (
        <div className="wrapper">
        <header>
           <h1> Welcome to ChannelX </h1>
        </header>
         <div className="Register">
                        <button
                            type="button"
                            style={{ marginLeft: "auto" }}
                            className="Register"
                            onClick={() => this.routeTo('/signup')}    
                        >Register</button>
        </div>
   
        <div className="Login">
                        <button
                            type="button"
                            style={{ marginLeft: "auto" }}
                            className="Login"
                        >Login</button>
        </div>
        <div>

           <p> ChannelX will make it possible to create, share, and destroy transient communication channels. </p>
          <p> These channels should be tied to users existing communication streams (e.g., SMS, e-mail, etc.) without exposing the users actual phone number or e-mail address.</p>     
              </div>

</div>
    );
};
}
export default Landing;