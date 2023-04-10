"use strict";
//Imports
require('./api/connection');

const port = 8889;
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const MediaLenguaEndpoint = require("./endpoints/mediaLenguaEndpoint.js");
const FilesEndpoint = require("./endpoints/filesEndpoint.js");
const KichwaVocabularyEndpoint = require('./endpoints/kichwaVocabularyEndpoint.js');
const app = express();
const DataModel = require("./models/dataModel.js");
const fileUpload = require("express-fileupload");
const ENDPOINTS = require('./middleware/endpointsConstants.js');

const handlerDefault = async (request, response) => {
  try {
    const { headers, method, url } = request;
    const buffer = [];
    request.on("error", err => console.log("Error", err))
      .on("data", chunk => buffer.push(chunk))
      .on("end", async () => {
        console.log('END');
        const bufferContent = Buffer.concat(buffer).toString();
        const dataModel = new DataModel(null, null, null);
        const responseBody = { headers, method, url };
        response.setHeader("Content-Type", "application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        response.on("error", err => console.error(err));

        switch (url) {
          case ENDPOINTS.SAVE_OBJECT:
            const saveObjectResult = await this.MediaLenguaEndpoint.saveObject(JSON.parse(bufferContent));
            responseBody.body = JSON.stringify(saveObjectResult);
            response.statusCode = 200;
            break;

          case ENDPOINTS.GET_OBJECTS_BY_QUERY:
            const objectQueryResult = await this.MediaLenguaEndpoint.getObjectQuery(JSON.parse(bufferContent));
            responseBody.body = JSON.stringify(objectQueryResult);
            response.statusCode = 200;
            break;

          case ENDPOINTS.GET_KICHWA_WORDS:
            const kichwaWordsResult = await this.KichwaVocabularyEndpoint.getKichwaWords();
            responseBody.body = JSON.stringify(kichwaWordsResult);
            response.statusCode = 200;
            break;

          default:
            dataModel.message = "Method not found";
            dataModel.status = "405";
            responseBody.body = JSON.stringify(dataModel);
            response.statusCode = 405;
            console.log("STATUS 405: ");
            console.log("Method not found");
            break;
        }
        response.write(JSON.stringify(responseBody));
        response.end();
      });
  } catch (error) {
    const dataModel = new DataModel(null, null, null);
    const responseBody = { headers, method, url };
    const body = JSON.stringify(dataModel);
    console.log(`ERROR ${response.statusCode}:`);
    console.log(error);
    response.statusCode = 500;
    responseBody.body = body;
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    response.write(JSON.stringify(responseBody));
    response.end();
  }
};

const handlerFiles = async (request, response) => {
  let eafFile = request.files.eafFile;
  let mp3File = request.files.mp3File;
  await this.FilesEndpoint.processingFiles(eafFile, mp3File);
  response.send("hello");
};
app.post(ENDPOINTS.GET_OBJECTS_BY_QUERY, handlerDefault);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

app.get(ENDPOINTS.GET_ALL_OBJECTS, handlerDefault);
app.get(ENDPOINTS.GET_KICHWA_WORDS, handlerDefault);
app.post(ENDPOINTS.LOGIN, handlerDefault);
app.post(ENDPOINTS.SAVE_OBJECT, handlerDefault);
app.post(ENDPOINTS.CREATE_USER, handlerDefault);
app.post(ENDPOINTS.GET_OBJECT, handlerDefault);
app.post(ENDPOINTS.STREAM_TRACK, handlerDefault);
app.post(ENDPOINTS.UPLOAD_FILE, handlerFiles);

app.listen(port, async err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  try {
    //Instance of the network and transactions
    this.MediaLenguaEndpoint = new MediaLenguaEndpoint();
    this.FilesEndpoint = new FilesEndpoint();
    this.KichwaVocabularyEndpoint = new KichwaVocabularyEndpoint();
  } catch (error) {
    console.log("Error Composer instance: ", error);
  }
  console.log("server is listening on: ", port);
});
