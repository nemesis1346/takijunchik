import FirebaseApi from "../api/FirebaseApi";
import { ERROR_MIDDLEWARE } from "../constants/types";
import {
    GET_OBJECTS_SUCCESS,
    SAVE_OBJECT_SUCCESS,
    GET_OBJECT_DETAIL_SUCCESS,
    ITEM_QUERY_SUCCESS
} from "../constants/types";
import httpApi from "../api/httpApi";
import {parseResponse} from '../utils/Utils';

const getValueByQueryCallback = (item) => {
    console.log('Query Callback');
    console.log(item);
    return   {
        type: ITEM_QUERY_SUCCESS,
        item: item
    };
}

/**
 * This is for the search query
 * @param {*} input
 */
export const translateFirebaseAction = input => {
    return dispatch => {
        httpApi.vocabulary.getValueByQuery(input)
        .then(res => {
            console.log(res);
            let result = parseResponse(res.data.body);
            console.log('Response in GetObject Login:');
            //let result = parseResponse(res);
            console.log(result);
        })
    }
};

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

const getObjectSuccess = item => {
    console.log('DISPATCHING')
    console.log(item)
    return {
        type: ITEM_QUERY_SUCCESS,
        item: item
    };
};
