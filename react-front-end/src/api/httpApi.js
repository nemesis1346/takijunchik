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
        login: credentials => instanceDefault.post('/login', { credentials })
            .then((res) => {
                console.log('Response in Api Login:');
                let result = parseResponse(res);
                console.log(result);
                return result;
            }),

        signup: params => instanceDefault.post('/createUser', { params })
            .then((res) => {
                console.log('Response in Api Signup');
                let result = parseResponse(res);
                console.log(result);
                return result;
            })
    },
    vocabulary: {
        translate_kichwa_spanish: word_kichwa => instanceDefault.post('/translate_kichwa_spanish', { word_kichwa })
            .then(res => {
                console.log('Response in Api Translate');
                res.data
            }),
        getValueByQuery: input => {
            return instanceDefault.post('/getObjectsByQuery', { input });
        }
    },
    files: {
        uploadFiles: input => {
            let headersFiles = { 'Content-Type': 'multipart/form-data' }
            return instanceDefault.post('/uploadFiles', input, { headers: headersFiles })
        }
    }
}
