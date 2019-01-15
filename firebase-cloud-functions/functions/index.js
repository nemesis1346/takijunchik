'use-strict'
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//This file is for managing processing becase the web browser cannot handle it just with react.
class DataModel {
    constructor(
        status,
        data,
        message
    ) {
        this.status = status;
        this.data = data;
        this.message=message;
    }
}

module.exports = DataModel;


const handler = (request, response) => {
    const { headers, method, url } = request;
    let buffer = [];
    request.on('error', (err) => {
        console.log("Error", err);
    }).on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', () => {
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
        let body;
        let responseBody;
        try {
            switch (url) {
                case '/createUser':
                    console.log('We did it');
                    break;
                default:
                    dataModel.message = 'Method not found';
                    dataModel.status = '405';
                    body = JSON.stringify(dataModel);

                    console.log('STATUS 405: ');
                    console.log('Method not found');
                    responseBody = { headers, method, url, body };

                    response.statusCode = 405;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                    break;
            }

        } catch (error) {
            dataModel.message = error.message.toString();
            dataModel.status = '500';
            body = JSON.stringify(dataModel);
            console.log('ERROR 500:');
            console.log(error);
            responseBody = { headers, method, url, body };

            response.statusCode = 500;
            response.write(JSON.stringify(responseBody));
            response.end();
        }
    });
}

//Automatically allow cross-origin requests
app.use(cors({ origin: true }));

//Add middleware to authenticate requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', handler);
app.post('/saveObject', handler);
app.get('/getAllObjects', handler);
app.post('/createUser', handler);
app.post('/getObjectsByQuery', handler);
app.post('/getObject', handler);
app.post('/streamTrack', handler);
app.post('/uploadMp3', handler);

exports.mediaLenguaServer = functions.https.onRequest(app);