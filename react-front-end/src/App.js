import React, { Component } from 'react';
import TraductorPage from './components/pages/TraductorPage';
import UploadFilePage from './components/pages/UploadFilePage';
import NavBar from './components/navigation/NavBar';
import AboutPage from './components/pages/AboutPage';
import { BrowserRouter ,Route} from 'react-router-dom';

class App extends Component {
  
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
export default App;
