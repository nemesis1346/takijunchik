'use strict'
var data = require('../datasample/words.json');
const WordModel = require('../models/wordModel.js');
const delay = require('delay');
const CONSTANTS = require('../resources/constants.js');
const PORT = '3011';
const HOST = 'localhost';
const http = require('http');
const UUID = require('uuid/v1');
const Processor = require('../testing/processor.js');

async function mainDataInputProcess() {
    try {

        //await saveWord();
        //await getAllWords();
        let processorInstance = new Processor();
        let objectList = await processorInstance.processData()
        .then((result)=>{
            console.log(result);
        });
        console.log(objectList);
            // .then((objectList) => {
            //     console.log(objectList);
            //     // objectList.forEach(async element => {
            //     //     await requestPost('/saveObject', JSON.stringify(element));
            //     // });
            // }).catch((error) => {
            //     console.log(error);
            // });


    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}


async function getAllWords() {
    try {
        let wordsList = [];
        //TODO: develop method for getting 
        let response = await requestGet('/getAllWords');
        console.log(response);
    } catch (error) {
        console.error(error);
        return new Error(error);
    }

}

async function saveWord() {
    try {
        //TODO:put delay in each transaction iteration 
        console.log(CONSTANTS.constant1);

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const currentWord = new WordModel(
                UUID(),
                element.spanish,
                element.english,
                element.kichwa,
                element.descriptionSpanish,
                element.descriptionEnglish,
                element.descriptionKichwa
            );
            console.log(currentWord);
            // we set a delay just in case composer has MVVC problem
            try {
                await requestPost('/saveWord', JSON.stringify(currentWord));
            } catch (error) {
                console.error(error);
                throw new Error(error);
                break;
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

}
/**
 * This is a generic method for post request
 * @param {Its the name of the endpoint or method at the end} endpoint 
 * @param {Its the data, usually should be a json object} data 
 */
function requestPost(endpoint, data) {
    // //The following should be in a loop
    //   // An object of options to indicate where to post to
    var post_options = {
        host: HOST,
        port: PORT,
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data) //this is an individual word
        }
    };

    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('RESPONSE------------');
            console.log(chunk);
        });
    });
    post_req.write(data)
}
/**
 * This is a generic method for get request
 * @param {Its the name of the endpoint or method at the end} endpoint 
 */
function requestGet(endpoint) {
    var get_options = {
        host: HOST,
        port: PORT,
        path: endpoint,
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    var get_req = http.request(get_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('RESPONSE------------');
            console.log(chunk);
        });
    });
    get_req.end()
}
mainDataInputProcess();