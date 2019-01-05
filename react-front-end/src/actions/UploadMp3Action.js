import api from '../api'; //Api is for axios http endpoints

export const uploadMp3Action = (input) => {
    return {
        type: 'UPLOAD_MP3',
        data: api.vocabulary.uploadMp3(input)
    }
};
