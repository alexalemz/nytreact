import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Nav from "./components/Nav";
import API from "./utils/API";
import './App.css';

class App extends Component {
  render() {
    
    return (
      <Router>
        <div>
          <Nav />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/saved" component={Saved} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
