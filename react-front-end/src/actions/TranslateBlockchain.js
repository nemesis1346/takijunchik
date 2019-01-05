import api from '../api'; //Api is for axios http endpoints

//This is just calling to other class of accesing to the rest services 
export const TranslateBlockchain = (input) => {
    return {
        type: 'TRANSLATE_BLOCKCHAIN',
        input: input
    }
};
