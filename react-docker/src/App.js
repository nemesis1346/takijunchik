import React, { Component, createRef } from "react";
import { Route, Routes, HashRouter, BrowserRouter } from "react-router-dom"; // Import Routes
import LoginPage from './components/pages/LoginPage'
import MainPage from './components/pages/MainPage';
import * as ROUTES from './constants/routes';

class App extends Component {

  render() {
    return (
      <HashRouter>
        {/* <Route path={ROUTES.ROUTE_LOGIN} exact component={LoginPage}></Route> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path={ROUTES.ROUTE_MAIN_PAGE} component={MainPage}></Route>
        </Routes>
      </HashRouter>
    )
  }
}
export default App;
