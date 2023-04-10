import FirebaseApi from "../api/FirebaseApi";
import { ERROR_MIDDLEWARE } from "../constants/types";
import {
    GET_OBJECTS_SUCCESS,
    GET_OBJECT_DETAIL_SUCCESS,
} from "../constants/types";
import httpApi from "../api/httpApi";
import {parseResponse} from '../utils/Utils';

/**
 * This is for the search query
 * @param {*} input
 */
export const translateFirebaseAction = input => {
    return dispatch => {
        httpApi.mediaLenguaVocabulary.getValueByQuery(input)
        .then(res => {
            let result = parseResponse(res.data.body);
            console.log('Response in GetObject Login:');
            let listObjects= JSON.parse(result);

            console.log(listObjects);
            dispatch(getObjectsSuccess(listObjects))
        })
        .catch(err => {
            console.log(err);
            dispatch(handleError(err.message));
        });
    }
};

//This method is taking data from firebase
export const getObjects = () => {
    return dispatch => {
        FirebaseApi.getValues("/objectModel")
            .then(res => {
                let objectList = [];
                res.forEach(function (childSnapshot) {
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
//This method is taking data from firebase with an specific input
export const getObjectsByQuery=input=>{
    return dispatch => {
        FirebaseApi.getValueByQuery('/objectModel',input,null)
        .then(res=>{
            dispatch(getObjectsSuccess(res));
        })
        .catch(err=>{
            console.log(err);
            dispatch(handleError(err.message));
        });
    }
}
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

const handleError = message => {
    return {
        type: ERROR_MIDDLEWARE,
        message: message
    };
};
