import { USER_LOGGED_IN } from "../types";
import { USER_SIGNED_IN } from '../types';

export default function user(state = {}, action = {}) {
    console.log('User Reducer');
    console.log(state);
    console.log(action);
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_SIGNED_IN:
            return action.user;
        default: return state;
    }
}