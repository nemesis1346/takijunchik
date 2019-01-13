//with {} we initialize the action and state
import {GET_OBJECTS_SUCCESS} from '../constants/types';
const initState = {
    objects:[],
    hideResultMessage:false,
    hideSpinner:false
}
const databaseReducer = (state=initState, action={}) => {
    switch (action.type) {
        case GET_OBJECTS_SUCCESS:
        console.log(action);
            return {
                ...state,
                objects: action.objects,
                hideResultMessage:true,
                hideSpinner:true
            }
        default:
            return state;
    }
}

export default databaseReducer;

