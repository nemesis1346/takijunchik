'use strict'
let express = require('express');
let router = express.Router();
let fs = require('fs');
let xml2js = require('xml2js');
let parser = new xml2js.Parser();
const ObjectModel = require('../models/objectModel.js');

async function processData() {
    var xmlfile = "/home/nemesis1346/Documents/UniversityProjects/takijunchik/tinkunakuy/testing/dataTest.eaf";

    fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {
                // console.log(result);
                let objectList = [];

                let TIME_ORDER_ANNOTATION = result['ANNOTATION_DOCUMENT']['TIME_ORDER'];
                let TIME_SLOT_LIST = TIME_ORDER_ANNOTATION[0].TIME_SLOT;

                TIME_SLOT_LIST.forEach(element => {
                    let currentElement = element['$'];
                    // THIS IS FOR TIMESLOTID1 AND TIME VALUE
                    let currentObject = new ObjectModel(currentElement.TIME_SLOT_ID, null,
                        currentElement.TIME_VALUE, null, null);
                    objectList.push(currentObject);
                });
                //   console.log(objectList);

                let TIER_ANNOTATION = result['ANNOTATION_DOCUMENT']['TIER'];
                let ANNOTATION_LIST = TIER_ANNOTATION[0]['ANNOTATION'];
                ANNOTATION_LIST.forEach(element => {
                    //console.log(element);
                    let currentAlignableAnnotation = element['ALIGNABLE_ANNOTATION'][0]['$'];
                    let currentAnnotationValue=element['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'];
                    //console.log(currentAnnotationValue);
                    //console.log(element['ALIGNABLE_ANNOTATION'][0]['$']);
                    objectList.forEach(element => {
                        //console.log(element.timeSlotId1);
                        if (element.timeSlotId1 == currentAlignableAnnotation.TIME_SLOT_REF1) {
                            console.log(currentAlignableAnnotation);
                            element.timeSlotId2 = currentAlignableAnnotation.TIME_SLOT_REF2;
                            element.annotationId = currentAlignableAnnotation.ANNOTATION_ID;
                            element.contentValue=currentAnnotationValue;
                            console.log(element);
                        }
                    });
                });
            });
        }
    });

}

processData();