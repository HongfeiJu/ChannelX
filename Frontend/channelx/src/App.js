/*
Description: Basic routing for landing page and register page
Author: Hongfei Ju, Darshan Prakash, Manisha, Sami
Date: 10/02/2019
*/

import React,{Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ForgetPassword from './components/Login/ForgetPassword';
import Landing from './components/Landing/Landing';
import EmailSent from './components/VerificationEmailPage/EmailSent';
import Fire from "./config/Fire";
import Home from "./components/Home/Home";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import TestPage from "./components/TestPage/TestPage";
import * as ROUTES from './constants/routes';
import CreateChannel from "./components/CreateChannel/CreateChannel";
import CreatePrivateChannel from "./components/CreateChannel/CreatePrivateChannel";
import LandingV2 from "./components/LandingV2/LandingV2";
import ChannelInfoEditor from './components/CreateChannel/ChannelInfoEditor';



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{}
        };
    }

    componentDidMount() {
        this.authlistener();
    }

    authlistener() {
        Fire.auth().onAuthStateChanged((user) => {
            console.log(user);
            if(user) {
                this.setState({user});
            } else {
                this.setState({user: null});
            }
        });
    }

    render() {
        return (
            <div className={"App"}>
                <Router>
                    <div className="App">
                        <Route path={ROUTES.LANDING} exact component={Landing}/>
                        {/*<Route path={ROUTES.SIGN_UP}  exact component={Signup}/>*/}
                        {/*<Route path={ROUTES.SIGN_IN} exact component={Login}/>*/}
                        <Route path={ROUTES.FORGET_PWD} exact component={ForgetPassword}/>
                        <Route path={ROUTES.HOME}  exact component={Home}/>
                        <Route path={ROUTES.EMAIL_SENT}  exact component={EmailSent}/>
                        <Route path={ROUTES.CHAT_PAGE}  exact component={ChatRoom}/>
                        <Route path={ROUTES.TEST_PAGE}  exact component={TestPage}/>
                        <Route path={ROUTES.CREATE_CHANNEL} exact component={CreateChannel}/>
                        <Route path={ROUTES.EDIT_CHANNEL} exact component={ChannelInfoEditor}/>
                        <Route path={ROUTES.CREATE_PRIVATE_CHANNEL} exact component={CreatePrivateChannel}/>
                        <Route path={ROUTES.LANDINGV2} exact component={LandingV2}/>
                    </div>
                </Router>
                {/*{this.state.user ?(<Home />):(<Signup />)}*/}
            </div>
        );
    }
}



export default App;
