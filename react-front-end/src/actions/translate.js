import { TRANSLATE } from '../types';
import api from '../api';

export const translatedWord = (result) => ({
    type: TRANSLATE,
    result
})

//This is just calling to other class of accesing to the rest services 
export const translate = (input) => () => api.vocabulary.getObject(input);

export const uploadMp3 = (input) =>() => api.vocabulary.uploadMp3(input);