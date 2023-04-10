import axios from 'axios';
import { parseResponse } from '../utils/Utils';
import * as ROUTES from '../constants/endpoints';

const instanceDefault = axios.create({
  baseURL: `http://${ROUTES.SERVER_HOST}:${ROUTES.SERVER_PORT}`
});

const userApi = {
  login: credentials => instanceDefault.post(ROUTES.LOGIN_ENDPOINT, { credentials })
    .then(res => {
      console.log('Response in Api Login:');
      const result = parseResponse(res);
      console.log(result);
      return result;
    }),

  signup: params => instanceDefault.post(ROUTES.CREATE_USER_ENDPOINT, { params })
    .then(res => {
      console.log('Response in Api Signup');
      const result = parseResponse(res);
      console.log(result);
      return result;
    })
};

const mediaLenguaApi = {
  translateKichwaSpanish: word_kichwa => instanceDefault.post(ROUTES.TRANSLATE_KICHWA_SPANISH_MEDIA_LENGUA_ENDPOINT, { word_kichwa })
    .then(res => {
      console.log('Response in Api Translate');
      return res.data;
    }),

  getValueByQuery: input => instanceDefault.post(ROUTES.GET_OBJECT_BY_QUERY_ENDPOINT, { input })
};

const kichwaVocabularyApi = {
  getKichwaWords: () => instanceDefault.get(ROUTES.GET_KICHWA_WORDS_ENDPOINT)
};

const filesApi = {
  uploadFiles: input => {
    const headersFiles = { 'Content-Type': 'multipart/form-data' };
    return instanceDefault.post(ROUTES.UPLOAD_FILES_ENDPOINT, input, { headers: headersFiles });
  }
};

export default {
  user: userApi,
  mediaLenguaVocabulary: mediaLenguaApi,
  kichwaVocabulary: kichwaVocabularyApi,
  files: filesApi
};
