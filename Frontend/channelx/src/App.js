/*
Description: Basic routing for landing page and register page
Author: Hongfei Ju, Darshan Prakash, Manisha, Sami
Date: 10/02/2019
*/

import React,{Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EmailSent from './components/VerificationEmailPage/EmailSent';
import Fire from "./config/Fire";
import Home from "./components/Home/Home";
import AboutUs from "./components/Landing/AboutUs/AboutUs";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import TestPage from "./components/TestPage/TestPage";
import * as ROUTES from './constants/routes';
import CreatePublicChannel from "./components/ChannelModals/CreatePublicChannel";
import CreatePrivateChannel from "./components/ChannelModals/CreatePrivateChannel";
import Landing from "./components/Landing/Landing";
import ChannelInfoEditor from './components/ChannelModals/ChannelInfoEditor';



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
                        <Route path={ROUTES.HOME}  exact component={Home}/>
                        <Route path={ROUTES.EMAIL_SENT}  exact component={EmailSent}/>
                        <Route path={ROUTES.CHAT_PAGE}  exact component={ChatRoom}/>
                        <Route path={ROUTES.TEST_PAGE}  exact component={TestPage}/>
                        <Route path={ROUTES.ABOUTUS}  exact component={AboutUs}/>
                        <Route path={ROUTES.CREATE_CHANNEL} exact component={CreatePublicChannel}/>
                        <Route path={ROUTES.EDIT_CHANNEL} exact component={ChannelInfoEditor}/>
                        <Route path={ROUTES.CREATE_PRIVATE_CHANNEL} exact component={CreatePrivateChannel}/>
                    </div>
                </Router>
            </div>
        );
    }
}



export default App;
