import api from "../api";

//This event is called from the LoginPage to be executed, then is sent to api, so here the credentials are being defined to the api post or get

/**
 * 
 * @param {Object} credentials //It takes the credentials
 * @returns {Function} returns a function dispatch 
 */
export const login = (credentials) => () => api.user.login(credentials);//Here it makes the call to the server

