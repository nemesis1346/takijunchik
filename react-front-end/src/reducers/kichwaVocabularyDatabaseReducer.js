//with {} we initialize the action and state
import {
    GET_OBJECTS_SUCCESS,
    GET_OBJECT_DETAIL_SUCCESS,
  } from "../constants/types";
  const initState = {
    objects: [],
    hideResultMessage: false,
    hideSpinner: false,
    kichwaVocabularyDetailData: {
      spanish: "",
      kichwa1: "",
      id: ""
    },
    audioUrl: ""
  };
  const kichwaVocabularyDatabaseReducer = (state = initState, action = {}) => {
    switch (action.type) {
      case GET_OBJECTS_SUCCESS:
        return {
          ...state,
          objects: action.objects,
          hideResultMessage: true,
          hideSpinner: true
        };
      case GET_OBJECT_DETAIL_SUCCESS:
        return {
          ...state,
          kichwaVocabularyDetailData: {
            spanish: action.object.spanish,
            kichwa1: action.object.kichwa1,
            id: action.object.id
          }
        };
      default:
        return state;
    }
  };
  
  export default kichwaVocabularyDatabaseReducer;
  