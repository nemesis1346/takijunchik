import React, { Component } from 'react';
import './App.css';
import LoginPage from "./components/pages/LoginPage";
import SignupPage from './components/pages/SignupPage';
import TraductorPage from './components/pages/TraductorPage';
import UploadFilePage from './components/pages/UploadFilePage';
import { Route } from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import AboutPage from './components/pages/AboutPage';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar></NavBar>
          {/* <Route path="/" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} /> */}
          <Route path="/" exact component={AboutPage}></Route>
          <Route path='/DatabasePage' component={TraductorPage} />
          <Route path='/UploadFilePage' component={UploadFilePage} />
          <Route path='/AboutPage' component={AboutPage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
