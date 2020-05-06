import { combineReducers } from 'redux';
import user from './user';
import databaseReducer from './databaseReducer';

//This is for comining all different reducers
export default combineReducers({
    user,
    databaseReducer
});