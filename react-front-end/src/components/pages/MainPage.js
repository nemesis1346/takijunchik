import React, { Component } from 'react';
import TraductorPage from './TraductorPage';
import UploadFilePage from './UploadFilePage';
import NavBar from '../navigation/NavBar';
import AboutPage from './AboutPage';
import { BrowserRouter ,Route} from 'react-router-dom';
import LoginPage from './LoginPage'

class MainPage extends Component {
  
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <NavBar></NavBar>
          <Route path="/" exact component={TraductorPage}></Route>
          <Route path='/DatabasePage' component={TraductorPage} />
          <Route path='/UploadFilePage' component={UploadFilePage} />
          <Route path='/AboutPage' component={AboutPage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}
export default MainPage;
