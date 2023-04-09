const { requestPost, requestGet } = require('../middleware/firebase_data_seeder.js');

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
