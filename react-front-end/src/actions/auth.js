import { USER_LOGGED_IN } from '../types';
import api from "../api";

//This is the definition of the returning method described below, the User model is done according with my necessities. 
export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})
//This event is called from the LoginPage to be executed, then is sent to api, so here the credentials are being defined to the api post or get

/**
 * 
 * @param {Object} credentials //It takes the credentials
 * @returns {Function} returns a function dispatch 
 */
export const login = (credentials) => (dispatch) => api.user.login(credentials);//Here it makes the call to the server

    // console.log('Auth'); 
    // console.log(credentials);       
