import api from '../api/BlockchainApi'; //Api is for axios http endpoints
import FirebaseApi from '../api/FirebaseApi';
import {TRANSLATE_SUCCESS} from '../constants/types';
import {ERROR_MIDDLEWARE} from '../constants/types';

//This is just calling to other class of accesing to the rest services 
export const TranslateBlockchainAction = (input) => {
    return {
        type: 'TRANSLATE_BLOCKCHAIN',
        object: api.vocabulary.getObject(input)
    }
}

export const TranslateFirebaseAction = (input)=>{
    console.log('Action Translate Firebase');
    console.log(input);

    return (dispatch)=>{
        FirebaseApi.getValueByKey('/test',input)
        .then((res)=>{
            dispatch(getObjectSuccess(res.data))
        })
        .catch((err)=>{
            dispatch(handleError(err.message))
        })
    }
   
}

const getObjectSuccess=(object)=>{
    return{
        type:TRANSLATE_SUCCESS,
        object:object
    }
}
const handleError=(message)=>{
    return {
        type:ERROR_MIDDLEWARE,
        message:message
    }
}