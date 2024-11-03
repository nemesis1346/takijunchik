//with {} we initialize the action and state
import {
  GET_OBJECTS_SUCCESS,
  GET_OBJECT_DETAIL_SUCCESS,
  GET_URL_AUDIO_SUCCESS,
  ITEM_QUERY_SUCCESS,
  SET_SPINNER_VISIBILITY
} from "../constants/types";
const initState = {
  objects: [],
  hideResultMessage: true,
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
const mediaLenguaDatabaseReducer = (state = initState, action = {}) => {
  // console.log('Media lengua reducer')
  // console.log('Action',action)
  // console.log('State', state)
  switch (action.type) {
    case SET_SPINNER_VISIBILITY:
      return {
        ...state,
        hideSpinner: action.hideSpinner
      };
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

    default:
      return state;
  }
};

export default mediaLenguaDatabaseReducer;
