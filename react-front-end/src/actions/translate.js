import api from '../api';
export const translate = (word_kichwa)=>(dispatch)=>
api.vocabulary.translate(word_kichwa).then(word_spanish=>
console.log(word_spanish))