/*
Description: Basic routing for landing page and register page
Author: Hongfei Ju, Darshan Prakash, Manisha Miriyala   
Date: 9/20/2019
*/

import React,{Component} from 'react';
import './App.css';
import Signup from './Signup/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
    <Router>
      <div className="App">
        <Route path="/" exact component={Landing}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/home" exact component={Home}/>
      </div>
    </Router>
        );
    }
}
export default App;