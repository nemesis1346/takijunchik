import axios from 'axios';
//TODO: Beaware where the port is goinf to be
const instance = axios.create({ baseURL: 'http://localhost:3011' })

export default {
    user: {
        login: credentials => instance.post('/login', { credentials })
            .then((res) => {
                console.log('Response in Api Login');
                res.data
            }),

        signup: params => instance.post('/createUser', { params })
            .then((res) => {
                console.log('Response in Api Signup');
                console.log(res.data.body)
            })
    },
    vocabulary: {
        translate_kichwa_spanish: word_kichwa => instance.post('/translate_kichwa_spanish', { word_kichwa })
            .then(res => {
                console.log('Response in Api Translate');
                res.data
            }),
        getObject: input => instance.post('/getObject', { input })
            .then(res => {
                console.log('Response in Api Object');
                console.log(res.data.body);
            })
    },

}