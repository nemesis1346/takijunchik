//with {} we initialize the action and state
import {GET_OBJECTS_SUCCESS} from '../constants/types';
const initState = {
    test:"test"
}
const databaseReducer = (state=initState, action={}) => {
    switch (action.type) {
        case GET_OBJECTS_SUCCESS:
        console.log(action);
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

export default databaseReducer;

