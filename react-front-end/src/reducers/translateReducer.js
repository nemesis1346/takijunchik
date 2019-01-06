
import { TRASLATE_SUCCESS } from '../constants/types';
const translateReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case TRASLATE_SUCCESS:
        console.log(action);
            return {
                ...state,
                object: action.object
            }
        default:
            return state;
    }
}
export default translateReducer;