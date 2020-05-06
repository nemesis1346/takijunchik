import React, { Component } from 'react';
import TraductorPage from './TraductorPage';
import UploadFilePage from './UploadFilePage';
import NavBar from '../navigation/NavBar';
import AboutPage from './AboutPage';
import { BrowserRouter, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class MainPage extends Component {

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <NavBar></NavBar>
          <Route path={ROUTES.ROUTE_DEFAULT} exact component={TraductorPage}></Route>
          <Route path={ROUTES.ROUTE_DATABASE_MEDIA_LENGUA_PAGE} component={TraductorPage} />
          <Route path={ROUTES.ROUTE_UPLOADFILE_PAGE} component={UploadFilePage} />
          <Route path={ROUTES.ROUTE_ABOUT_PAGE} component={AboutPage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}
export default MainPage;
