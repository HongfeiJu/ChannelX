import React from 'react';
import './App.css';
import Signup from './Signup/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './Landing/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Landing}/>
        <Route path="/signup" exact component={Signup}/>
      </div>
    </Router>

  );
}

export default App;
