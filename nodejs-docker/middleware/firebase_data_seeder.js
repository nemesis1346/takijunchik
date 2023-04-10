'use strict'

/*
  TODO: This script needs to be run in the Docker file because populates the database in firebase, but be careful that it wont duplicate firebase already saved items

  TODO: investigate that instead of uuid, Firebase should give you back the ID
*/

const PORT = '8889';
const HOST = 'localhost';
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const ObjectModel = require('../models/objectModel.js');
let fs = require('fs');
const superagent = require('superagent');

async function mainDataInputProcess() {
    try {

       saveAllObjectsToFirebase();

    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}


function saveAllObjectsToFirebase() {
    let filePath = '../data/dataMediaLengua/jsonFiles/objectJson.json';
    debugger;
    fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        let objectList = JSON.parse(data);
        
        for (const element of objectList) {
       
                let uuid = uuidv4();
                console.log('Object: '+String(uuid)+" request for storing in firebase");

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
               requestPost('/saveObject', JSON.stringify(currentObject));
            }
        // );
    });
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

module.exports = {
    requestPost,
    requestGet
  };

mainDataInputProcess();