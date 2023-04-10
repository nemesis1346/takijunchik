import { combineReducers } from 'redux';
import user from './user';
import kichwaVocabularyDatabaseReducer from './kichwaVocabularyDatabaseReducer';
import mediaLenguaDatabaseReducer from './mediaLenguaDatabaseReducer';

//This is for comining all different reducers
export default combineReducers({
    user,
    mediaLenguaDatabaseReducer,
    kichwaVocabularyDatabaseReducer
});