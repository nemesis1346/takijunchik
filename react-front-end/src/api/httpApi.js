import axios from 'axios';
import { parseResponse } from '../utils/Utils';
import * as ROUTES from '../constants/endpoints';


//TODO: Be aware where the port is going to be
const instanceDefault = axios.create({ baseURL: 'http://' + ROUTES.SERVER_HOST + ':' + ROUTES.SERVER_PORT }); // this is for firebase
/**
 * This File is for parsing and anything processing middleware with diferent directions
 */
export default {
    user: {
        login: credentials => instanceDefault.post(ROUTES.LOGIN_ENDPOINT, { credentials })
            .then((res) => {
                console.log('Response in Api Login:');
                let result = parseResponse(res);
                console.log(result);
                return result;
            }),

        signup: params => instanceDefault.post(ROUTES.CREATE_USER_ENDPOINT, { params })
            .then((res) => {
                console.log('Response in Api Signup');
                let result = parseResponse(res);
                console.log(result);
                return result;
            })
    },
    mediaLenguaVocabulary: {
        translate_kichwa_spanish: word_kichwa => instanceDefault.post(ROUTES.TRANSLATE_KICHWA_SPANISH_MEDIA_LENGUA_ENDPOINT, { word_kichwa })
            .then(res => {
                console.log('Response in Api Translate');
                res.data
            }),
        getValueByQuery: input => {
            return instanceDefault.post(ROUTES.GET_OBJECT_BY_QUERY_ENDPOINT, { input });
        }
    },
    kichwaVocabulary:{
        getKichwaWords: () => {
            console.log('GETTING TO THIS POINT')
            return instanceDefault.get(ROUTES.GET_KICHWA_WORDS_ENDPOINT, null);
        }
    },
    files: {
        uploadFiles: input => {
            let headersFiles = { 'Content-Type': 'multipart/form-data' }
            return instanceDefault.post(ROUTES.UPLOAD_FILES_ENDPOINT, input, { headers: headersFiles })
        }
    }
}
