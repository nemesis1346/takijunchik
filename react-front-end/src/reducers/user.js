import { USER_LOGGED_IN } from "../constants/types";
import { USER_SIGNED_IN } from '../constants/types';
import api from "../api";

//Each reducer will have the state of all the application
export default function user(state = {}, action = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_SIGNED_IN:
            return action.user;
        case 'AUTH':
            api.user.login(action.credentials); //still in revision
        case 'SIGNIN':
            api.user.signup(action.params)
        default: return state;
    }
}