import FirebaseApi from "../api/FirebaseApi";
import { ERROR_MIDDLEWARE } from "../constants/types";
import {
  GET_OBJECTS_SUCCESS,
  TRANSLATE_SUCCESS,
  SAVE_OBJECT_SUCCESS,
  GET_OBJECT_DETAIL_SUCCESS
} from "../constants/types";

/**
 * This is for the search query
 * @param {*} input
 */
export const translateFirebaseAction = input => {
  console.log("Action Translate Firebase");
  console.log(input);
  return dispatch => {
    FirebaseApi.getValueByQuery("/objectModel", input)
      .then(res => {
        console.log(res);
        dispatch(getObjectSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(handleError(err.message));
      });
  };
};

export const getObjects = () => {
  return dispatch => {
    FirebaseApi.getValues("/objectModel")
      .then(res => {
        let objectList = [];
        res.forEach(function(childSnapshot) {
          let childData = childSnapshot.val();
          childData["key"] = childSnapshot.key;
          objectList.push(childData);
        });
        dispatch(getObjectsSuccess(objectList));
      })
      .catch(err => {
        console.log(err);
        dispatch(handleError(err.message));
      });
  };
};

export const setObjectDetail = object => {
  return {
    type: GET_OBJECT_DETAIL_SUCCESS,
    object: object
  };
};

const getObjectsSuccess = objects => {
  return {
    type: GET_OBJECTS_SUCCESS,
    objects: objects
  };
};
const saveObjectSuccess = object => {
  return {
    type: SAVE_OBJECT_SUCCESS,
    object: object
  };
};
const handleError = message => {
  return {
    type: ERROR_MIDDLEWARE,
    message: message
  };
};

const getObjectSuccess = object => {
  return {
    type: TRANSLATE_SUCCESS,
    object: object
  };
};
