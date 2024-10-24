import FirebaseApi from "../api/FirebaseApi";
import httpApi from "../api/httpApi";
import { ERROR_MIDDLEWARE, GET_OBJECTS_SUCCESS, SET_SPINNER_VISIBILITY, GET_OBJECT_DETAIL_SUCCESS } from "../constants/types";
import { parseResponse } from '../utils/Utils';

/**
 * This is for the search query
 * @param {string} input - The search query input
 */
export const translateFirebaseAction = (input) => (dispatch) => {
  httpApi.mediaLenguaVocabulary.getValueByQuery(input)
    .then((res) => {
      const result = parseResponse(res.data.body);
      console.log('Response in GetObject Login:');
      const listObjects = JSON.parse(result);
      console.log(listObjects);
      dispatch(getObjectsSuccess(listObjects));
    })
    .catch((err) => {
      console.error(err);
      dispatch(handleError(err.message));
    });
};

// This method is taking data from firebase
export const getObjects = () => (dispatch) => {
  FirebaseApi.getValues("/objectModel")
    .then((res) => {
      console.log('Object Model Action');
      console.log(typeof res);
      const dataArray = Object.values(res);
      const objectListResult = dataArray.map((childSnapshot) => childSnapshot);
      dispatch(getObjectsSuccess(objectListResult));
    })
    .catch((err) => {
      console.error(err);
      dispatch(handleError(err.message));
    });
};

// This method is taking data from firebase with a specific input
export const getObjectsByQuery = (input) => (dispatch) => {
  FirebaseApi.getValueByQuery('/objectModel', input, null)
    .then((res) => {
      dispatch(getObjectsSuccess(res));
    })
    .catch((err) => {
      console.error(err);
      dispatch(handleError(err.message));
    });
};

export const setObjectDetail = (object) => ({
  type: GET_OBJECT_DETAIL_SUCCESS,
  object,
});

const getObjectsSuccess = (objects) => ({
  type: GET_OBJECTS_SUCCESS,
  objects,
});

const handleError = (message) => ({
  type: ERROR_MIDDLEWARE,
  message,
});

export const setSpinnerVisibility = (isVisible) => ({
  type: SET_SPINNER_VISIBILITY,
  hideSpinner: isVisible
});