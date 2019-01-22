import api from "../api/httpApi"; //Api is for axios http endpoints
import { UPLOAD_MP3_SUCCESS, ERROR_MIDDLEWARE } from "../constants/types";
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

export const getUrlSound = filename => {
    console.log('ACTIONS');

  return dispatch => {
    FirebaseApi.getUrlHttp(filename)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        //dispatch(handleError(err.message));
      });
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
