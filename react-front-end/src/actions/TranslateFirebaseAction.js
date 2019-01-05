import api from '../api/BlockchainApi'; //Api is for axios http endpoints
import FirebaseApi from '../api/FirebaseApi';
export const TranslateFirebaseAction = (input)=>{
    return 
    console.log('Action Translate Firebase');
    console.log(input);
    return{
        type:'TRANSLATE',
        input:input
    }
}