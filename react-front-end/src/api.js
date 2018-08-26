import axios from 'axios';
export default{
    user:{
        login:credentials=>axios.post('/api/auth',{credentials})
        .then(res=>res.data.user)
    },
    vocabulary:{
        translate_kichwa_spanish: word_kichwa=>axios.post('/api/translate_kichwa_spanish',{word_kichwa})
        .then(res=>res.data.word_spanish)
    }
}