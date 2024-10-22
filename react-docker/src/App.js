// React libraries
import React, { Component, createRef } from "react";
import { Route, Routes, HashRouter, BrowserRouter } from "react-router-dom"; // Import Routes
import * as ROUTES from './constants/routes';


// Importing components
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
              <Route path={ROUTES.ROUTE_DEFAULT} exact component={MediaLenguaPage}></Route>
              <Route path={ROUTES.ROUTE_DATABASE_MEDIA_LENGUA_PAGE} component={MediaLenguaPage} />
              <Route path={ROUTES.ROUTE_VOCABULARY} component={KichwaVocabularyPage} />
              <Route path={ROUTES.ROUTE_UPLOADFILE_PAGE} component={UploadFilePage} />
              <Route path={ROUTES.ROUTE_LOGIN} component={LoginPage}></Route>
              <Route path={ROUTES.ROUTE_ABOUT_PAGE} component={AboutPage}></Route>
              <Route path="*" element={MediaLenguaPage} /> {/* Catch-all route */}
            </Routes>
          </main>
        </div>
      </HashRouter>
    )
  }
}
export default App;
