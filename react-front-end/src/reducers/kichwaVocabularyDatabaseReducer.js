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
      mediaLenguaContent: "",
      spanishContent: "",
      kichwaContent: "",
      elicitSentenceContent: "",
      ipaContent: "",
      objectId: ""
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
            spanishContent: action.object.spanishContent,
            kichwaContent: action.object.kichwaContent,
            objectId: action.object.objectId
          }
        };
      default:
        return state;
    }
  };
  
  export default kichwaVocabularyDatabaseReducer;
  