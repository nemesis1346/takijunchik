"use strict";

require('../api/connection');

const { requestPost, requestGet } = require('../middleware/firebase_data_seeder.js');
const UserModel = require('../models/user');
// const mp3Split = require('mp3-split');


async function queryObject() {
    try {
        let wordsList = [];
        //TODO: this method should be part of testing suite and part of the initialization of the dockerfile
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
        //TODO: this method should be part of testing suite and part of the initialization of the dockerfile
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
        //TODO: this method should be part of testing suite and part of the initialization of the dockerfile
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
        //TODO: this method should be part of testing suite and part of the initialization of the dockerfile
        let response = await requestGet('/getAllWords');
        console.log(response);
    } catch (error) {
        console.error(error);
        return new Error(error);
    }

}
async function saveUser() {
    console.log("************************************");
    console.log("Request Save KichwaWord in Database Api: ");
    try {
        await UserModel.create({
            name: "firstUser",
            email:"email@gmail.com",
            password: "Trinity@1346",
            password_confirmation: "Trinity@1346"
        });

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

/** 
 * @description This function is for testing the streaming method. Is not working yet
 */
function streamTrack(){
    try {
        requestPost('/streamTrack', '');
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}

}