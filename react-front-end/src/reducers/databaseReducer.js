//with {} we initialize the action and state

const databaseReducer = (state={}, action={}) => {
    switch (action.type) {
        case 'TRANSLATE_BLOCKCHAIN':
            return {
                ...state,
                object: action.object
            }
        case 'TRANSALTE_FIREBASE':
        //firebase contact
        console.log('Result in reducer: '+action.input);
        case 'UPLOAD_MP3':
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

export default databaseReducer;

