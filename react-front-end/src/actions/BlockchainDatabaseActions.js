import api from "../api/httpApi"; //Api is for axios http endpoints
import {
  TRANSLATE_SUCCESS,
} from "../constants/types";
import { ERROR_MIDDLEWARE } from "../constants/types";

//This is just calling to other class of accesing to the rest services
export const translateBlockchainAction = input => {
  return {
    type: TRANSLATE_SUCCESS,
    object: api.vocabulary.getObject(input)
  };
};


const handleError = message => {
  return {
    type: ERROR_MIDDLEWARE,
    message: message
  };
};
