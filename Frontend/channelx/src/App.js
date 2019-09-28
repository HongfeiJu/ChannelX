/*
Description: Basic routing for landing page and register page
Author: Hongfei Ju, Darshan Prakash
Date: 9/20/2019
*/

import React,{Component} from 'react';
import './App.css';
import Signup from './Signup/Signup';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './Landing/Landing';
import fire from "./config/Fire";
import Home from "./Home/Home";

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
        fire.auth().onAuthStateChanged((user) => {
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
                {this.state.user ?(<Home />):(<Signup />)}
            </div>
        );
    }
}



export default App;
