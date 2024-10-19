import React, { Component } from 'react';
import MediaLenguaPage from './MediaLenguaPage';
import UploadFilePage from './UploadFilePage';
import LoginPage from './LoginPage';
import KichwaVocabularyPage from './KichwaVocabularyPage';
import NavBar from '../navigation/NavBar';
import AboutPage from './AboutPage';
import { BrowserRouter, Route, HashRouter, Routes } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class MainPage extends Component {

  render() {
    return (
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path={ROUTES.ROUTE_DEFAULT} exact component={MediaLenguaPage}></Route>
            <Route path={ROUTES.ROUTE_DATABASE_MEDIA_LENGUA_PAGE} component={MediaLenguaPage} />
            <Route path={ROUTES.ROUTE_VOCABULARY} component={KichwaVocabularyPage} />
            <Route path={ROUTES.ROUTE_UPLOADFILE_PAGE} component={UploadFilePage} />
            <Route path={ROUTES.ROUTE_LOGIN} component={LoginPage}></Route>
            <Route path={ROUTES.ROUTE_ABOUT_PAGE} component={AboutPage}></Route>
          </Routes>

        </main>
      </div>
    )
  }
}
export default MainPage;
