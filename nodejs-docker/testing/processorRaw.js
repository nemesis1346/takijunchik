'use strict'
/*
This class is working specially it takes the eaf audio file and transofrm it in json objects
*/

let fs = require('fs');
let xml2js = require('xml2js');
let parser = new xml2js.Parser();
const ObjectModel = require('../../blockchain/models/objectModel.js');
const UUID = require('uuid/v1');
const utils = require('../utils/utils.js')

class ProcessorRaw {

    /**
     * @description Initializes the processing of the data in eaf
     * @return {Promise} A promise that gives the list of the processed objects
     */
    processData(callbackProcessData, secondParameter) {
        console.log(secondParameter);
        var xmlfile = "/home/nemesis1346/Documents/UniversityProjects/takijunchik/tinkunakuy/testing/dataTest.eaf";
        const fileContent = fs.readFileSync(xmlfile, "utf-8");
        parser.parseString(fileContent, function (err, result) {
            if (err) {
                return callback(err);
            }

            let objectList = [];

            //New Processing
            let TIER_ANNOTATION = result['ANNOTATION_DOCUMENT']['TIER'];
            //Process the MEDIA LENGUA List 
            let TIER_MEDIA_LENGUA_OBJECT = null;
            let TIER_ESPANOL_OBJECT = null;
            let TIER_KICHWA_OBJECT = null;
            let TIER_ORACION_ELICITADA_OBJECT = null;
            let TIER_IPA_OBJECT = null;
            let TIER_GLOSSES_OBJECT = null;
            let TIER_SEGMENTED_OBJECT = null;
            for (let index = 0; index < TIER_ANNOTATION.length; index++) {
                if (TIER_ANNOTATION[index]['$']['TIER_ID'] == "Media Lengua") {
                    TIER_MEDIA_LENGUA_OBJECT = TIER_ANNOTATION[index];
                } else if (TIER_ANNOTATION[index]['$']['TIER_ID'] == "Español") {
                    TIER_ESPANOL_OBJECT = TIER_ANNOTATION[index];
                } else if (TIER_ANNOTATION[index]['$']['TIER_ID'] == "Kichwa") {
                    TIER_KICHWA_OBJECT = TIER_ANNOTATION[index];
                } else if (TIER_ANNOTATION[index]['$']['TIER_ID'] == "Oración elicitada") {
                    TIER_ORACION_ELICITADA_OBJECT = TIER_ANNOTATION[index];
                } else if (TIER_ANNOTATION[index]['$']['TIER_ID'] == "IPA") {
                    TIER_IPA_OBJECT = TIER_ANNOTATION[index];
                } else if (TIER_ANNOTATION[index]['$']['TIER_ID'] == "Glosses") {
                    TIER_GLOSSES_OBJECT = TIER_ANNOTATION[index];
                } else if (TIER_ANNOTATION[index]['$']['TIER_ID'] == "Segmented") {
                    TIER_SEGMENTED_OBJECT = TIER_ANNOTATION[index];
                }
            }

            let TIER_MEDIA_LENGUA_LIST = TIER_MEDIA_LENGUA_OBJECT['ANNOTATION'];
            let TIER_ESPANOL_LIST = TIER_ESPANOL_OBJECT['ANNOTATION'];
            let TIER_KICHWA_LIST = TIER_KICHWA_OBJECT['ANNOTATION'];
            let TIER_ORACION_ELICITADA_LIST = TIER_ORACION_ELICITADA_OBJECT['ANNOTATION'];
            let TIER_IPA_LIST = TIER_IPA_OBJECT['ANNOTATION'];
            let TIER_GLOSSES_LIST = TIER_GLOSSES_OBJECT['ANNOTATION'];
            let TIER_SEGMENTED_LIST = TIER_SEGMENTED_OBJECT['ANNOTATION'];

            let maxLength = Math.max(
                TIER_MEDIA_LENGUA_LIST.length,
                TIER_ESPANOL_LIST.length,
                TIER_KICHWA_LIST.length,
                TIER_ORACION_ELICITADA_LIST.length,
                TIER_IPA_LIST.length,
                TIER_GLOSSES_LIST.length,
                TIER_SEGMENTED_LIST.length);

            for (let index = 0; index < maxLength; index++) {
                let currentElement = new ObjectModel(null, null, null, null, null, null, null, null, null, null, null);

                //Defining Variables for AnnotationId
                let annotationIdMediaLengua = TIER_MEDIA_LENGUA_LIST[index] ? TIER_MEDIA_LENGUA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].ANNOTATION_ID : "";
                let annotationIdSpanish = TIER_ESPANOL_LIST[index] ? TIER_ESPANOL_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].ANNOTATION_ID : "";
                let annotationIdKichwa = TIER_KICHWA_LIST[index] ? TIER_KICHWA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].ANNOTATION_ID : "";
                let annotationIdElicitSentence = TIER_ORACION_ELICITADA_LIST[index] ? TIER_ORACION_ELICITADA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].ANNOTATION_ID : "";
                let annotationIdIpa = TIER_IPA_LIST[index] ? TIER_IPA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].ANNOTATION_ID : "";
                let annotationIdGlosses = TIER_GLOSSES_LIST[index] ? TIER_GLOSSES_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].ANNOTATION_ID : "";
                let annotationIdSegmented = TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'] ? TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].ANNOTATION_ID : "";

                //Assigning Variables for annotation id
                currentElement.annotationIdMediaLengua = annotationIdMediaLengua;
                currentElement.annotationIdSpanish = annotationIdSpanish;
                currentElement.annotationIdKichwa = annotationIdKichwa;
                currentElement.annotationIdElicitSentence = annotationIdElicitSentence;
                currentElement.annotationIdIpa = annotationIdIpa;
                currentElement.annotationIdGlosses = annotationIdGlosses;
                currentElement.annotationIdSegmented = annotationIdSegmented;

                //Defining Variables for Time slot 1
                let timeSlotId1MediaLengua = TIER_MEDIA_LENGUA_LIST[index] ? TIER_MEDIA_LENGUA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF1 : "";
                let timeSlotId1Spanish = TIER_ESPANOL_LIST[index] ? TIER_ESPANOL_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF1 : "";
                let timeSlotId1Kichwa = TIER_KICHWA_LIST[index] ? TIER_KICHWA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF1 : "";
                let timeSlotId1ElicitSentence = TIER_ORACION_ELICITADA_LIST[index] ? TIER_ORACION_ELICITADA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF1 : "";
                let timeSlotId1Ipa = TIER_IPA_LIST[index] ? TIER_IPA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF1 : "";
                let timeSlotId1Glosses = TIER_GLOSSES_LIST[index] ? TIER_GLOSSES_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF1 : "";
                let timeSlotId1Segmented = TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'] ? TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF1 : "";

                //Assigning  Variables for Time slot 1
                currentElement.timeSlotId1MediaLengua = timeSlotId1MediaLengua;
                currentElement.timeSlotId1Spanish = timeSlotId1Spanish;
                currentElement.timeSlotId1Kichwa = timeSlotId1Kichwa;
                currentElement.timeSlotId1ElicitSentence = timeSlotId1ElicitSentence;
                currentElement.timeSlotId1Ipa = timeSlotId1Ipa;
                currentElement.timeSlotId1Glosses = timeSlotId1Glosses;
                currentElement.timeSlotId1Segmented = timeSlotId1Segmented;

                //Defining Variables for Time slot 2
                let timeSlotId2MediaLengua = TIER_MEDIA_LENGUA_LIST[index] ? TIER_MEDIA_LENGUA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF2 : "";
                let timeSlotId2Spanish = TIER_ESPANOL_LIST[index] ? TIER_ESPANOL_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF2 : "";
                let timeSlotId2Kichwa = TIER_KICHWA_LIST[index] ? TIER_KICHWA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF2 : "";
                let timeSlotId2ElicitSentence = TIER_ORACION_ELICITADA_LIST[index] ? TIER_ORACION_ELICITADA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF2 : "";
                let timeSlotId2Ipa = TIER_IPA_LIST[index] ? TIER_IPA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF2 : "";
                let timeSlotId2Glosses = TIER_GLOSSES_LIST[index] ? TIER_GLOSSES_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF2 : "";
                let timeSlotId2Segmented = TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'] ? TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'][0]['$'].TIME_SLOT_REF2 : "";

                //Assigning  Variables for Time slot 2
                currentElement.timeSlotId2MediaLengua = timeSlotId2MediaLengua;
                currentElement.timeSlotId2Spanish = timeSlotId2Spanish;
                currentElement.timeSlotId2Kichwa = timeSlotId2Kichwa;
                currentElement.timeSlotId2ElicitSentence = timeSlotId2ElicitSentence;
                currentElement.timeSlotId2Ipa = timeSlotId2Ipa;
                currentElement.timeSlotId2Glosses = timeSlotId2Glosses;
                currentElement.timeSlotId2Segmented = timeSlotId2Segmented;

                //Defining Variables for content
                let mediaLenguaContent = TIER_MEDIA_LENGUA_LIST[index] ? TIER_MEDIA_LENGUA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'][0] : "";
                let spanishContent = TIER_ESPANOL_LIST[index] ? TIER_ESPANOL_LIST[index]['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'][0] : "";
                let kichwaContent = TIER_KICHWA_LIST[index] ? TIER_KICHWA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'][0] : "";
                let elicitSentenceContent = TIER_ORACION_ELICITADA_LIST[index] ? TIER_ORACION_ELICITADA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'][0] : "";
                let ipaContent = TIER_IPA_LIST[index] ? TIER_IPA_LIST[index]['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'][0] : "";
                let glossesContent = TIER_GLOSSES_LIST[index] ? TIER_GLOSSES_LIST[index]['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'][0] : "";
                let segmentedContent = TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'] ? TIER_SEGMENTED_LIST[index]['ALIGNABLE_ANNOTATION'][0]['ANNOTATION_VALUE'][0] : "";

                //Assigning  Variables for content
                currentElement.mediaLenguaContent = mediaLenguaContent;
                currentElement.spanishContent = spanishContent;
                currentElement.kichwaContent = kichwaContent;
                currentElement.elicitSentenceContent = elicitSentenceContent;
                currentElement.ipaContent = ipaContent;
                currentElement.glossesContent = glossesContent;
                currentElement.segmentedContent = segmentedContent;

                //UUID
                currentElement.objectId = UUID();

                objectList.push(currentElement);
            }

            //Process time slots
            let TIME_ORDER_ANNOTATION = result['ANNOTATION_DOCUMENT']['TIME_ORDER'];
            let TIME_SLOT_LIST = TIME_ORDER_ANNOTATION[0].TIME_SLOT;

            //Process slit id 1
            for (const element of TIME_SLOT_LIST) {
                let currentElement = element['$'];
                // THIS IS FOR TIMESLOTID1 AND TIME VALUE
                for (let index = 0; index < objectList.length; index++) {
                    const element = objectList[index];
                    if (element.timeSlotId1MediaLengua === currentElement.TIME_SLOT_ID) {
                        objectList[index].timeValue1 = currentElement.TIME_VALUE;
                        objectList[index].timeValue1Format = utils.parseTimeFormatForRawProcessor(currentElement.TIME_VALUE);
                    }
                }
            }
            //Process slit id 2
            for (const element of TIME_SLOT_LIST) {
                let currentElement = element['$'];
                // THIS IS FOR TIMESLOTID1 AND TIME VALUE
                for (let index = 0; index < objectList.length; index++) {
                    const element = objectList[index];
                    if (element.timeSlotId2MediaLengua === currentElement.TIME_SLOT_ID) {
                        objectList[index].timeValue2 = currentElement.TIME_VALUE;
                        objectList[index].timeValue2Format = utils.parseTimeFormatForRawProcessor(currentElement.TIME_VALUE);
                    }
                }
            }
            //console.log(objectList);
            callbackProcessData(null, objectList);
        }.bind(this));
    }

}

module.exports = ProcessorRaw;