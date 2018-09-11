import { USER_SIGNED_IN } from '../types';
import api from "../api";

//This is the definition of the returning method described below, the User model is done according with my necessities. 
export const userSignIn = (user) => ({
    type: USER_SIGNED_IN,
    user
})
//This event is called from the SignPage to be executed, then is sent to api, so here the credentials are being defined to the api post or get
export const signup = (params) => (dispatch) =>
    api.user.signup(params)
        .then((user) => {
            console.log('Signup Action Result');
            console.log(user);
            dispatch(userSignIn(user))
        });//Here it makes the call to the server
