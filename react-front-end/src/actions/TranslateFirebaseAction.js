import api from '../api'; //Api is for axios http endpoints

export const TranslateFirebaseAction = (input)=>{
    console.log('Action Translate Firebase');
    console.log(input);
    return{
        type:'TRANSLATE',
        input:input
    }
}