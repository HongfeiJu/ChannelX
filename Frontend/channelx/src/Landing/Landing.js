import React from 'react';
Class LandingPage extends React.Component {


const landing = () => {
    return (
        <div>
            Welcome to ChannelX
        </div>
         <div className="Register">
                        <button
                            type="button"
                            className="Register"
                            onClick={() => this.routeTo('././SignUp/SignUp')}
                        >Register</button>
        </div>
       </div>
        <div className="Login">
                        <button
                            type="button"
                            className="Login"
                            //onClick={() => this.routeTo('https://github.com/')}
                        >Login</button>
        </div>
        <div className="About">
                        <button
                           <p> ChannelX will make it possible to create, share, and destroy transient communication channels. These channels should be tied to users' existing communication streams (e.g., SMS, e-mail, etc.) without exposing the user's actual phone number or e-mail address. </p>
        </div>

    );
};
}
export default landing;