import api from '../api'; //Api is for axios http endpoints

export const TranslateFirebase = (input)=>{
    return{
        type:'TRANSLATE',
        input:api.vocabulary.uploadMp3(input)
    }
}