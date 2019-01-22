//with {} we initialize the action and state
import {
  GET_OBJECTS_SUCCESS,
  GET_OBJECT_DETAIL_SUCCESS,
  GET_URL_AUDIO_SUCCESS,
  TRANSLATE_SUCCESS
} from "../constants/types";
const initState = {
  objects: [],
  hideResultMessage: false,
  hideSpinner: false,
  objectDetailData: {
    mediaLenguaContent: "",
    spanishContent: "",
    kichwaContent: "",
    elicitSentenceContent: "",
    ipaContent: "",
    objectId: ""
  },
  audioUrl: ""
};
const databaseReducer = (state = initState, action = {}) => {
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
        objectDetailData: {
          mediaLenguaContent: action.object.mediaLenguaContent,
          spanishContent: action.object.spanishContent,
          kichwaContent: action.object.kichwaContent,
          elicitSentenceContent: action.object.elicitSentenceContent,
          ipaContent: action.object.ipaContent,
          objectId: action.object.objectId
        }
      };
    case GET_URL_AUDIO_SUCCESS:
      return {
        ...state,
        audioUrl: action.audioUrl
      };
    case TRANSLATE_SUCCESS:
      console.log(action);
      return {
        ...state,
        object: action.object
      };
    default:
      return state;
  }
};

export default databaseReducer;
