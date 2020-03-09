import React, { Component } from 'react';
import { BrowserRouter ,Route} from 'react-router-dom';
import LoginPage from './components/pages/LoginPage'
import MainPage from './components/pages/MainPage';
import * as ROUTES from './constants/routes';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Route path={ROUTES.ROUTE_DEFAULT} exact component={LoginPage}></Route>
          <Route path={ROUTES.ROUTE_MAIN_PAGE} component={MainPage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
