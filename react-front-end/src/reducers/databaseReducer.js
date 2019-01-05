import api from "../api";

const databaseReducer = (state, action) => {
    switch (action.type) {
        case 'TRANSLATE_BLOCKCHAIN':
            api.vocabulary.getObject(input);
        case 'TRANSALTE_FIREBASE':
            //firebase contact
        case 'UPLOAD_MP3':
            api.vocabulary.uploadMp3(input)
        default:
            return state;
    }
}

export default databaseReducer;

