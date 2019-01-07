import api from '../api/BlockchainApi'; //Api is for axios http endpoints
import FirebaseApi from '../api/FirebaseApi';
import { ERROR_MIDDLEWARE } from '../constants/types';
import { SAVE_OBJECT_SUCCESS } from '../constants/types';
import { GET_OBJECTS_SUCCESS } from '../constants/types';

export const saveObjectDatabase = (object) => {
    return (dispatch) => {
        FirebaseApi.setValue('/objectModel/' + '23424', object)
            .then((res) => {
                console.log(res);
                dispatch(saveObjectSuccess(res.data))
            })
            .catch((err) => {
                console.log(err);
                dispatch(handleError(err.message))
            })

    }
}
/**
 * This function is a test for firestore
 * @param {object} object 
 */
export const saveObjectFirestore =(object)=>{
    
}

const getObjectsCallback = (objects) => {
    console.log('Data :');
    console.log(objects);
    getObjectsSuccess(objects)
}

export const getObjects = () => {
    return (dispatch,getState, {getFirebase,getFirestore}) => {
     
        FirebaseApi.getValues('/objectModel', getObjectsCallback)
            .then((res) => {
                console.log(res);
                //need to solve the dispatch
            })
            .catch((err) => {
                console.log(err);
                dispatch(handleError(err.message))
            })
    }
}

const getObjectsSuccess = (objects) => {
    return {
        type: GET_OBJECTS_SUCCESS,
        objects: objects
    }
}
const saveObjectSuccess = (object) => {
    return {
        type: SAVE_OBJECT_SUCCESS,
        object: object
    }
}
const handleError = (message) => {
    return {
        type: ERROR_MIDDLEWARE,
        message: message
    }
}