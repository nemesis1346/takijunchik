/**
 * 
 * @param {Object} credentials //It takes the credentials
 * @returns {Function} returns a function dispatch 
 */
//This event is called from the SignPage to be executed, then is sent to api, so here the credentials are being defined to the api post or get
export const SignupAction = (params) => {
    return {
        type: 'SIGNUP',
        params: params
    }
};//Here it makes the call to the server
