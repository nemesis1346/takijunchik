//with {} we initialize the action and state
import {
  GET_OBJECTS_SUCCESS,
  GET_OBJECT_DETAIL_SUCCESS,
  GET_URL_AUDIO_SUCCESS
} from "../constants/types";
const initState = {
  objects: [],
  hideResultMessage: false,
  hideSpinner: false,
  objectDetailData: {
    mediaLengua: "",
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
      console.log(action);
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
          mediaLengua: action.object.mediaLengua,
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
    default:
      return state;
  }
};

export default databaseReducer;
