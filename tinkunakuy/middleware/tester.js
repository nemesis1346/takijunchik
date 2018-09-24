'use strict'
const WordModel = require('../models/wordModel.js');
const delay = require('delay');
const CONSTANTS = require('../resources/constants.js');
const PORT = '3011';
const HOST = 'localhost';
const http = require('http');
const UUID = require('uuid/v1');
const ObjectModel = require('../models/objectModel.js');
//const DataCreator = require('../testing/dataCreator');
let fs = require('fs');
const Async = require('async');
const request = require('superagent');

async function mainDataInputProcess() {
    try {
        //await saveWord();
        //await getAllObjects();
        saveAllObjects();

    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}

function saveAllObjects() {
    let filePath = '../data/objectJson.json';
    debugger;
    fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        let objectList = JSON.parse(data);
        // objectList=objectList[0-10];
        objectList = objectList.slice(0, 2);
        console.log(objectList);

        Async.eachSeries(objectList,
            (element, callback) => {
                console.log(element);
                let uuid = UUID();

                let currentWord = new ObjectModel(
                    uuid,
                    //Variables for annotationId
                    element.annotationIdMediaLengua,
                    element.annotationIdSpanish,
                    element.annotationIdKichwa,
                    element.annotationIdElicitSentence,
                    element.annotationIdIpa,
                    element.annotationIdGlosses,
                    element.annotationIdSegmented,
                    //Variables for time slot1
                    element.timeSlotId1MediaLengua,
                    element.timeSlotId1Spanish,
                    element.timeSlotId1Kichwa,
                    element.timeSlotId1ElicitSentence,
                    element.timeSlotId1Ipa,
                    element.timeSlotId1Glosses,
                    element.timeSlotId1Segmented,
                    //Variables for times slot2
                    element.timeSlotId2MediaLengua,
                    element.timeSlotId2Spanish,
                    element.timeSlotId2Kichwa,
                    element.timeSlotId2ElicitSentence,
                    element.timeSlotId2Ipa,
                    element.timeSlotId2Glosses,
                    element.timeSlotId2Segmented,
                    //Variables for the content
                    element.mediaLenguaContent,
                    element.spanishContent,
                    element.kichwaContent,
                    element.elicitSentenceContent,
                    element.ipaContent,
                    element.glossesContent,
                    element.segmentedContent,
                    //Time values
                    element.timeValue1,
                    element.timeValue2
                );
                requestPost('/saveObject', JSON.stringify(currentWord), callback);
            }, err => {
                throw err;
            }
        );
    });
}
async function getAllObjects() {
    try {
        let wordsList = [];
        //TODO: develop method for getting 
        let response = await requestGet('/getAllObjects');
        console.log(response);
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
function requestPost(endpoint, data, callback) {
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
            callback(null);
        });
    });
    post_req.write(data)

    // console.log(`${HOST}:${PORT}${endpoint}`);
    // request
    //     .post(`${HOST}:${PORT}${endpoint}`)
    //     .set('Content-Type', 'application/json')
    //     .set('Content-Length', Buffer.byteLength(data))
    //     .end((err, res) => {
    //         if(err) {
    //             return callback(err);
    //         }
    //         console.log(res);
    //         callback(null);
    //     });
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