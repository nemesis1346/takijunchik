import httpApi from "../api/httpApi"; //Api is for axios http endpoints
import {
  GET_OBJECTS_SUCCESS,
  GET_OBJECT_DETAIL_SUCCESS
} from "../constants/types";
import { ERROR_MIDDLEWARE } from "../constants/types";

export const getKichwaWords = () => {
  return dispatch => {
      httpApi.kichwaVocabulary.getKichwaWords()
          .then(res => {
              let objectList = [];
              console.log('RESPONSE KICHWA WORDS')
              console.log(res)
              dispatch(getKichwaWordSuccess(objectList));
          })
          .catch(err => {
              console.log(err);
              dispatch(handleError(err.message));
          });
  };
};


export const getKichwaWordsByQuery=input=>{
  return dispatch => {
      httpApi.kichwaVocabulary.getKichwaWordsByQuery('/objectModel',input,null)
      .then(res=>{
          dispatch(getKichwaWordSuccess(res));
      })
      .catch(err=>{
          console.log(err);
          dispatch(handleError(err.message));
      });
  }
}
export const getKichwaWordSuccess = objects => {
  return {
      type: GET_OBJECTS_SUCCESS,
      objects: objects
  };
};
export const setKichwaWordDetail = object => {
  return {
      type: GET_OBJECT_DETAIL_SUCCESS,
      object: object
  };
};


export const handleError = message => {
  return {
    type: ERROR_MIDDLEWARE,
    message: message
  };
};
