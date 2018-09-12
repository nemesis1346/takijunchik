import React, { Component } from 'react';
import './App.css';
import LoginPage from "./components/pages/LoginPage";
import SignupPage from './components/pages/SignupPage';
import TraductorPage from './components/pages/TraductorPage';
import MainMenuPage from './components/pages/MainMenuPage';
import { Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Route path="/" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path='/translate' exact component={TraductorPage} />
        <Route path='/mainMenu' exact component={MainMenuPage} />
      </div>
    )
  }
}
export default App;
