'use strict';

const port = 3011
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const VocabularyChaincode = require('../chaincode/vocabularyChaincode.js');
const UserChaincode = require('../chaincode/userChaincode.js');
const UUID = require('uuid/v1');
const app = express();


const handler = async (request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.log("Error", err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', async () => {
        body = Buffer.concat(body).toString();
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
        try {
            switch (url) {
                case '/createUser':
                    promise = this.userChaincode.createUser(JSON.parse(body));
                    break;
                case '/login':
                    promise = this.userChaincode.login(JSON.parse(body));
                    break;
                case '/saveWord':
                    promise = this.vocabularyChaincode.saveWord(JSON.parse(body));
                    break;
                case '/getAllWords':
                    promise = this.vocabularyChaincode.getAllWords();
                    break;
                default:
                    response.statusCode = 405;
                    let message = 'Method not found';
                    console.log(message);
                    const responseBody = { headers, method, url, body, message };

                    response.write(JSON.stringify(responseBody));
                    response.end();
                    break;
            }

            //Executing the promise , maybe need POST and GET
            if (promise != null) {
                promise.then(function (result) {
                    let body = result;
                    console.log(result);
                    console.log('Promise Successful In Server.js');
                    const responseBody = { headers, method, url, body };
                    response.write(JSON.stringify(responseBody));
                    response.end();
                }).catch((error) => {
                    response.statusCode = 400;
                    let message = error.toString();
                    console.log(message);
                    const responseBody = { headers, method, url, body, message };

                    response.write(JSON.stringify(responseBody));
                    response.end();
                });
            }

        } catch (error) {
            console.log("Error in switch: ", error);
            response.statusCode = 400;
            let message = error.toString;
            const responseBody = { headers, method, url, body, message };
            response.write(JSON.stringify(responseBody));
            response.end();
        }
    });
}

app.post('/login', handler);
app.post('/saveWord', handler);
app.get('/getAllWords', handler);
app.post('/createUser', handler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    try {
        //Instance of the network and transactions
        this.vocabularyChaincode = new VocabularyChaincode();
        this.userChaincode = new UserChaincode();

        // setTimeout(clientTest, 1500);
    } catch (error) {
        console.log("Error Composer instance: ", error);
    }
    console.log('server is listening on: ', port);
});

