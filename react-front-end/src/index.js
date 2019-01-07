import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import FirestoreConfig from './api/FirebaseConfig';
import FirebaseConfig from './api/FirebaseConfig';

const store = createStore(
    rootReducer,
    // composeWithDevTools(applyMiddleware(thunk))
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(FirebaseConfig),
        reactReduxFirebase(FirebaseConfig)
    )
);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


