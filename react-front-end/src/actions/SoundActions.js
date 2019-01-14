import api from '../api/BlockchainApi'; //Api is for axios http endpoints
import { UPLOAD_MP3_SUCCESS, ERROR_MIDDLEWARE} from '../constants/types';
import FirebaseApi from '../api/FirebaseApi';


export const uploadMp3Action = (input) => {
    return (dispatch) => {
        FirebaseApi.saveFile('/mp3Files', 'test2', input)
            .then((res) => {
                console.log(res)
                dispatch(uploadMp3Success(res.data))
            })
            .catch((err) => {
                console.log(err);
                dispatch(handleError(err.message))
            })
    }

};


const uploadMp3Success = (data) => {
    return {
        type: UPLOAD_MP3_SUCCESS,
        data: data
    }
}

const handleError = (message) => {
    return {
        type: ERROR_MIDDLEWARE,
        message: message
    }
}