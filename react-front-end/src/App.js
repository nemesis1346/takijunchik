import React, { Component } from 'react';
import './App.css';
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from './components/pages/SignupPage';
import TraductorPage from './components/pages/TraductorPage';
import { Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="ui container">

        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path='/translate' exact component={TraductorPage} />
      </div>
    )
  }
}
export default App;
