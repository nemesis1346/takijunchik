import api from "../api/httpApi"; //Api is for axios http endpoints
import {
  UPLOAD_MP3_SUCCESS,
  ERROR_MIDDLEWARE,
  GET_URL_AUDIO_SUCCESS
} from "../constants/types";
import FirebaseApi from "../api/FirebaseApi";
import httpApi from "../api/httpApi";

export const uploadFilesAction = input => {
  return dispatch => {
    httpApi.files
      .uploadFiles(input)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        dispatch(handleError(err.message));
      });
  };
};

export const getUrlSoundAction = filename => {
  return dispatch => {
    FirebaseApi.getUrlHttp(filename)
      .then(res => {
        console.log(res);
        dispatch(getUrlSoundSuccess(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(handleError(err.message));
      });
  };
};

const getUrlSoundSuccess = url => {
  console.log("ACTIONS");
  console.log(url);
  return {
    type: GET_URL_AUDIO_SUCCESS,
    audioUrl: url
  };
};

const uploadMp3Success = data => {
  return {
    type: UPLOAD_MP3_SUCCESS,
    data: data
  };
};

const handleError = message => {
  return {
    type: ERROR_MIDDLEWARE,
    message: message
  };
};
