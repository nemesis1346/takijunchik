'use strict'
var data = require('../datasample/words.json');
const WordModel = require('../models/wordModel.js');
const delay = require('delay');
const CONSTANTS=require('../resources/constants.js');
const PORT='3011';
const HOST='localhost';

function dataInputRequest() {

    //TODO:processing the json file to a list

    console.log(CONSTANTS.constant1);
    data.forEach(element => {
        const currentWord = new WordModel(
            element.wordId,
            element.spanish,
            element.english,
            element.kichwa,
            element.descriptionSpanish,
            element.descriptionEnglish,
            element.descriptionKichwa
        );
        console.log(currentWord);

       setTimeout(requestPost('/saveWord',JSON.stringify(currentWord)),2000);

    });


}
/**
 * This is a generic method for post request
 * @param {Its the name of the endpoint or method at the end} endpoint 
 * @param {Its the data, usually should be a json object} word 
 */
function requestPost(endpoint, data) {
    // //The following should be in a loop
    //   // An object of options to indicate where to post to
    var post_options = {
        host: HOST,
        port: PORT,
        path: endpoint,//saveWord
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data) //this is an individual word
        }
    };

    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
        });
    });
    post_req.write(data)
}

dataInputRequest();