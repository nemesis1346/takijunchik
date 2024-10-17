"use strict";
require('./api/connection');

const port = 8889;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MediaLenguaEndpoint = require("./endpoints/mediaLenguaEndpoint.js");
const KichwaVocabularyEndpoint = require('./endpoints/kichwaVocabularyEndpoint.js');
const DataModel = require("./models/dataModel.js");
const fileUpload = require("express-fileupload");
const ENDPOINTS = require('./middleware/endpointsConstants.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

// Initialize endpoints
let mediaLenguaEndpoint;
let kichwaVocabularyEndpoint;

const handlerDefault = async (request, response) => {
  try {
    const { method, url } = request;
    const responseBody = { method, url };

    switch (url) {
      case ENDPOINTS.SAVE_OBJECT:
        const saveObjectResult = await mediaLenguaEndpoint.saveObject(request.body);
        responseBody.body = saveObjectResult;
        break;

      case ENDPOINTS.GET_OBJECTS_BY_QUERY:
        const objectQueryResult = await mediaLenguaEndpoint.getObjectQuery(request.body);
        responseBody.body = objectQueryResult;
        break;

      case ENDPOINTS.GET_KICHWA_WORDS:
        const kichwaWordsResult = await kichwaVocabularyEndpoint.getKichwaWords();
        responseBody.body = kichwaWordsResult;
        break;

      default:
        response.status(405).json({ message: "Method not found", status: "405" });
        return;
    }

    response.json(responseBody);
  } catch (error) {
    console.error('Error in handlerDefault:', error);
    response.status(500).json({ message: "Internal server error", status: "500" });
  }
};

// Routes
app.post(ENDPOINTS.GET_OBJECTS_BY_QUERY, handlerDefault);
app.get(ENDPOINTS.GET_ALL_OBJECTS, handlerDefault);
app.get(ENDPOINTS.GET_KICHWA_WORDS, handlerDefault);
app.post(ENDPOINTS.LOGIN, handlerDefault);
app.post(ENDPOINTS.SAVE_OBJECT, handlerDefault);
app.post(ENDPOINTS.CREATE_USER, handlerDefault);
app.post(ENDPOINTS.GET_OBJECT, handlerDefault);
app.post(ENDPOINTS.STREAM_TRACK, handlerDefault);

// Start server
app.listen(port, async err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  try {
    mediaLenguaEndpoint = new MediaLenguaEndpoint();
    kichwaVocabularyEndpoint = new KichwaVocabularyEndpoint();
    console.log("server is listening on: ", port);
  } catch (error) {
    console.log("Error initializing endpoints: ", error);
  }
});