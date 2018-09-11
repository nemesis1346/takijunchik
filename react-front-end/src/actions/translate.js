import { TRANSLATE } from '../types';
import api from '../api';

export const translatedWord = (result) => ({
    type: TRANSLATE,
    result
})

export const translate = (input) => (dispatch) =>
    api.vocabulary.getObject(input).then((result) => {
        console.log(result);
        dispatch(result)
    })