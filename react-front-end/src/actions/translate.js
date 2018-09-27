import { TRANSLATE } from '../types';
import api from '../api';

export const translatedWord = (result) => ({
    type: TRANSLATE,
    result
})

export const translate = (input) => () => api.vocabulary.getObject(input);