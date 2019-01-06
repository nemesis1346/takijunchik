//with {} we initialize the action and state


const databaseReducer = (state={}, action={}) => {
    switch (action.type) {
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

