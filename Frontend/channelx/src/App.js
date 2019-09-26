import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';


function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/" exact component={Landing}/>
      <Route path="/signup" exact component={Signup}/>
        <a
          className="App-link"
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register
          </a>
    </div>
    </Router>
  );
}

export default App;
