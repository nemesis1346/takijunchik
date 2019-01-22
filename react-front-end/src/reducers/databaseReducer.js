//with {} we initialize the action and state
import {
  GET_OBJECTS_SUCCESS,
  GET_OBJECT_DETAIL_SUCCESS
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
    audioUrl: "",
    objectId: ""
  }
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
          audioUrl: action.object.audioUrl,
          objectId: action.object.objectId
        },
      };
    default:
      return state;
  }
};

export default databaseReducer;
