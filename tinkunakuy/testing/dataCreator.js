'use strict'
let express = require('express');
let router = express.Router();
let fs = require('fs');
let xml2js = require('xml2js');
let parser = new xml2js.Parser();
const ObjectModel = require('../models/objectModel.js');
const ProcessorRaw = require('../testing/processorRaw');


/**
 * @description Initializes the processing of the data in eaf. The processor Instance gives back the processed object list and divides the mp3 audio files
 * @return {Promise} A promise that gives the list of the processed objects
 */
function createData() {
    parseIntoJSON();
}

/**
 * @description This is the generic function for parsing the eaf file into JSON
 */
function parseIntoJSON(){
    let processorInstance = new ProcessorRaw();
    processorInstance.processData(parseIntoJSONCallback,'hola secont parameter');
}
/**
 * @description This method is the callbaack once we get the object list from the parse of the eaf file
 * @param {*} err 
 * @param {*} objectList 
 */
function parseIntoJSONCallback(err, objectList){
    if (err) {
        return console.log(err);
    }
   // console.log(objectList);
    let jsonObjectList = JSON.stringify(objectList);
    //console.log(jsonObjectList);
    var jsonFilePath = "../data/objectJson2.json";
    //For creating and saving some data
    fs.writeFile(jsonFilePath, jsonObjectList, (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
    });
}

createData();
