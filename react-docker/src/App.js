import React, { Component } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import * as ROUTES from './constants/routes';

import NavBar from './components/navigation/NavBar';
import KichwaVocabularyPage from './components/pages/KichwaVocabularyPage';
import AboutPage from './components/pages/AboutPage';
import MediaLenguaPage from './components/pages/MediaLenguaPage';
import UploadFilePage from './components/pages/UploadFilePage';
import LoginPage from './components/pages/LoginPage'
import './components/styles/App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MediaLenguaPage />} />
              <Route path={ROUTES.ROUTE_DEFAULT} element={<MediaLenguaPage />} />
              <Route path={ROUTES.ROUTE_DATABASE_MEDIA_LENGUA_PAGE} element={<MediaLenguaPage />} />
              <Route path={ROUTES.ROUTE_VOCABULARY} element={<KichwaVocabularyPage />} />
              <Route path={ROUTES.ROUTE_UPLOADFILE_PAGE} element={<UploadFilePage />} />
              <Route path={ROUTES.ROUTE_LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.ROUTE_ABOUT_PAGE} element={<AboutPage />} />
              <Route path="*" element={<MediaLenguaPage />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    )
  }
}

export default App;