'use strict';
//Imports
const port = 8889
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const VocabularyFirepoint = require('../endpoints/vocabularyFirepoint.js');
const UserFirepoint= require('../endpoints/userFirepoint.js');
const app = express();
const DataModel = require('../models/dataModel.js');

const handler = async (request, response) => {
    const { headers, method, url } = request;
    let buffer = [];
    request.on('error', (err) => {
        console.log("Error", err);
    }).on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', async () => {
        let bufferContent = Buffer.concat(buffer).toString();
        //Set response
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.on('error', (err) => {
            console.error(err);
        });
        //Call method
        let promise;
        let dataModel = new DataModel(null, null, null);

        try {
            switch (url) {
                case '/createUser':
                    promise = this.userFirepoint.createUser(JSON.parse(bufferContent));
                    break;
                case '/login':
                    promise = this.userFirepoint.login(JSON.parse(bufferContent));
                    break;
                case '/getAllObjects':
                    promise = this.vocabularyFirepoint.getAllObjects();
                    break;
                case '/getObject':
                    promise = this.vocabularyFirepoint.getObject(JSON.parse(bufferContent));
                    break;
                case '/saveObject':
                    promise = this.vocabularyFirepoint.saveObject(JSON.parse(bufferContent));
                    break;
                case '/getObjectsByQuery':
                    promise = this.vocabularyFirepoint.getObjectsByQuery(JSON.parse(bufferContent));
                    break;
                case '/uploadMp3':
                    promise = this.vocabularyFirepoint.uploadMp3(JSON.parse(bufferContent));
                    break;
                case '/streamTrack':
                    //promise = this.soundChaincode.streamTrack();
                    promise = null;
                    break;
                default:
                    dataModel.message = 'Method not found';
                    dataModel.status = '405';
                    let body = JSON.stringify(dataModel);

                    console.log('STATUS 405: ');
                    console.log('Method not found');
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 405;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                    break;
            }

            //Executing the promise , maybe need POST and GET
            if (promise != null) {
                promise.then(function (result) {
                    //This is status 200 , everything ok
                    let body = JSON.stringify(result);

                    console.log('STATUS 200: ');
                    console.log(result);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 200;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                }).catch((error) => {
                    dataModel.message = error.message.toString();
                    dataModel.status = '400';
                    let body = JSON.stringify(dataModel);
                    console.log('ERROR 400:');
                    console.log(error.message);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 400;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                });
            }

        } catch (error) {
            dataModel.message = error.message.toString();
            dataModel.status = '500';
            let body = JSON.stringify(dataModel);
            console.log('ERROR 500:');
            console.log(error);
            const responseBody = { headers, method, url, body };

            response.statusCode = 500;
            response.write(JSON.stringify(responseBody));
            response.end();
        }
    });
}

app.post('/login', handler);
app.post('/saveObject', handler);
app.get('/getAllObjects', handler);
app.post('/createUser', handler);
app.post('/getObjectsByQuery', handler);
app.post('/getObject', handler);
app.post('/streamTrack',handler);
app.post('/uploadMp3',handler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    try {
        //Instance of the network and transactions
        this.vocabularyFirepoint = new VocabularyFirepoint();
        this.userFirepoint = new UserFirepoint();

        // setTimeout(clientTest, 1500);
    } catch (error) {
        console.log("Error Composer instance: ", error);
    }
    console.log('server is listening on: ', port);
});

