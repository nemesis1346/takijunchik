import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <BrowserRouter>
    {/* Provider that inside we want to rap our application*/}
        <Provider store={store}><App /></Provider>
    </BrowserRouter>,
    document.getElementById('root'));


//export default App;