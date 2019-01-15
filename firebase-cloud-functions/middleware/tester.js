'use strict'
const PORT = '8889';
const HOST = 'localhost';
const http = require('http');
const UUID = require('uuid/v1');
const ObjectModel = require('../models/objectModel.js');
let fs = require('fs');
const Async = require('async');
const superagent = require('superagent');

async function mainDataInputProcess() {
    try {
        //await saveWord();
        //await getAllObjects();
       saveAllObjects();
         // queryObject();
       // await getObject();
      // streamTrack();
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}

/**
 * @description This function is for testing the streaming method
 */
function streamTrack(){
    try {
        requestPost('/streamTrack', '');
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}

function saveAllObjects() {
    let filePath = '../data/jsonFiles/objectJson.json';
    debugger;
    fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        let objectList = JSON.parse(data);
        // objectList=objectList[0-10];
        //objectList = objectList.slice(0, 20);
        console.log(objectList);
        
        for (const element of objectList) {
        // Async.eachSeries(objectList,
        //     (element, callback) => {
                console.log(element);
                let uuid = UUID();

                let currentObject = new ObjectModel(
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
                    element.timeValue2,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                );
                //   console.log(currentObject);
               requestPost('/saveObject', JSON.stringify(currentObject));
            }
        // );
    });
}
async function queryObject() {
    try {
        let wordsList = [];
        //TODO: develop method for getting 
        let response = await requestPost('/getObjectsByQuery', JSON.stringify('mi'));
        console.log(response);
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}

async function getObject() {
    try {
        let wordsList = [];
        //TODO: develop method for getting 
        let response = await requestPost('/getObject', JSON.stringify('88131d20-c054-11e8-98aa-ebaeb624bac0'));
        console.log(response);
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
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


/**
 * This is a generic method for post request
 * @param {Its the name of the endpoint or method at the end} endpoint 
 * @param {Its the data, usually should be a json object} data 
 */
async function requestPost(endpoint, data, extraInfo) {
    let result;
    try {
        const res = await superagent
            .post(`${HOST}:${PORT}${endpoint}`)
            .set('Content-Type', 'application/json')
            .set('Content-Length', Buffer.byteLength(data))
            .send(data);

        result = JSON.parse(res.res.text)
        console.log('RESPONSE IN: ' + extraInfo);
        console.log(result);

    } catch (error) {
        console.log('THERE WAS AN ERROR IN: ' + extraInfo);
        if (error.response) {
            result = JSON.parse(error.response.res.text);
            console.error(result);
        } else {
            console.log(error);
        }
    }
    // return result;
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