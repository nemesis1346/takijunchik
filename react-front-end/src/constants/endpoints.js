require('dotenv').config({ path: '.env.production' }) // for other environments

export const SERVER_HOST = process.env.REACT_APP_SERVER_HOST
export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT

export const LOGIN_ENDPOINT="/login";
export const CREATE_USER_ENDPOINT="/createUser";
export const TRANSLATE_KICHWA_SPANISH_MEDIA_LENGUA_ENDPOINT="/translate_kichwa_spanish";
export const GET_OBJECT_BY_QUERY_ENDPOINT="/getObjectsByQuery";
export const UPLOAD_FILES_ENDPOINT="/uploadFiles";
export const GET_KICHWA_WORDS_ENDPOINT="/getKichwaWords";