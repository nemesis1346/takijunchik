import { TRANSLATE } from '../types';
import api from '../api';

export const translatedWord = (result) => ({
    type: TRANSLATE,
    result
})

export const translate = (input) => () => api.vocabulary.getObject(input);

export const uploadMp3 = (input) =>() => api.vocabulary.uploadMp3(input);