import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import { Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="ui container">

        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
      </div>
    )
  }
}
export default App;
