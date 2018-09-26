import api from "../api";

/**
 * 
 * @param {Object} credentials //It takes the credentials
 * @returns {Function} returns a function dispatch 
 */
//This event is called from the SignPage to be executed, then is sent to api, so here the credentials are being defined to the api post or get
export const signup = (params) => () => api.user.signup(params);//Here it makes the call to the server
