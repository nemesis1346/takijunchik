//always the reducers are the ones that uptate just the state of the app, or the states can be several
import {UPLOAD_MP3} from '../constants/types';
const soundReducer =(state={},action={})=>{
    switch(action.type){
        case UPLOAD_MP3:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

export default soundReducer;