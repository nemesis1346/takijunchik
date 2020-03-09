'use strict'
const WordModel = require('../models/wordModel.js');
const delay = require('delay');
const CONSTANTS = require('../resources/constants.js');
const PORT = '8810';
const HOST = 'localhost';
const http = require('http');
const UUID = require('uuid/v1');
const ObjectModel = require('../models/objectModel.js');
//const DataCreator = require('../testing/dataCreator');
let fs = require('fs');
const Async = require('async');
const superagent = require('superagent');


async function mainDataInputProcess() {
    try {
       streamTrack();
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

mainDataInputProcess();