import api from '../api/BlockchainApi'; //Api is for axios http endpoints
import FirebaseApi from '../api/FirebaseApi';
import {ERROR_MIDDLEWARE} from '../constants/types';
import  {SAVE_OBJECT_SUCCESS} from '../constants/types';

export const saveObject = (object) => {
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