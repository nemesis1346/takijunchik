'use strict';
const DataModel = require('../models/dataModel.js');
const fs = require('fs');
const xml2js = require('xml2js');
const UUID = require('uuid/v1');
const ObjectModel = require('../models/objectModel');
const firebase = require('../firebaseSetup/firebaseConfig.js');
const Lame = require("node-lame").Lame;
const exec = require('shelljs').exec;
const parser = new xml2js.Parser();
const shell2 = require('shelljs');


class FilesFirepoint {
    constructor() {
        this.database = firebase.database();
        this.storage = firebase.storage();
    }

    async processingFiles(eafFile, mp3File) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Upload Files in Composer: ');
        console.log('Eaf File');
        console.log(eafFile.data.toString());
        console.log('Mp3 File');
        //console.log(mp3File);
        try {
            this.processEaf(eafFile, mp3File, this.callbackEafSuccess, this.callbackEafError);
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    callbackEafSuccess(objectList, mp3File) {
        try {
            console.log(objectList);
            console.log(mp3File);
            //About to test, check split testing 
            //WARNING: Be aware of installing lame with sudo apt-get install lame
            const decoder = new Lame({
                "output": "../temporal/" + mp3File.name,
            }).setBuffer(mp3File.data);

            decoder.decode()
                .then(async () => {
                    const shellexec = async (command, checkStderrForError = true, parseOutput = true) => {
                        const {code, stdout, stderr} = await exec(command, {silent:true});
                        if (code !== 0 || (checkStderrForError && stderr)) {
                          throw new Error(`Command ${command} resulted in code: ${code}, stderr: ${stderr}`);
                        }
                        // console.log(stdout);
                        return parseOutput ? splitTrimFilter(stdout) : stdout;
                    }


                    // Encoding finished
                    console.log('encoding success');
                    //This is just for testing
                    let newobjectList = objectList.slice(0, 5);

                    for (let element of newobjectList) {
                        console.log('NEW ENCODING **********************************');
                        let currentCommand = 'ffmpeg -i '+'../temporal/' + mp3File.name+' -acodec copy -ss '+element.timeValue1Format+' -t '+element.timeValue2Format+' ../temporal/'+element.objectId+".mp3";
                       console.log(currentCommand);
                        await shellexec(currentCommand);
                        //shell2.exec('ffmpeg -i '+'../temporal/' + mp3File.name+' -acodec copy -ss '+element.timeValue1Format+' -t '+element.timeValue2Format+' ../temporal/'+element.objectId);
                        console.log(element);
                    }

                })
                .catch((error) => {
                    console.log('Something went wrong');
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }

    }
    callbackEafError(error) {
        console.log(error);
    }
    /**
        * @description Initializes the processing of the data in eaf
        * @return {Promise} A promise that gives the list of the processed objects
        */
    async processEaf(eafFile, mp3File, callbackEafSuccess, callbackEafError) {

        parser.parseString(eafFile.data.toString(), function (err, result) {
            console.log('RESULT');
            console.log(result);
            if (err) {
                return callbackEafError(err);
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
                // TIME_SLOT_LIST.forEach(function (element) {
                let currentElement = element['$'];
                // THIS IS FOR TIMESLOTID1 AND TIME VALUE
                for (let index = 0; index < objectList.length; index++) {
                    const element = objectList[index];
                    if (element.timeSlotId1MediaLengua === currentElement.TIME_SLOT_ID) {
                        objectList[index].timeValue1 = currentElement.TIME_VALUE;
                        objectList[index].timeValue1Format = this.parseTimeFormat(currentElement.TIME_VALUE);
                    }
                }
            }
            //Process slit id 2
            for (const element of TIME_SLOT_LIST) {
                // TIME_SLOT_LIST.forEach(function (element) {
                let currentElement = element['$'];
                // THIS IS FOR TIMESLOTID1 AND TIME VALUE
                for (let index = 0; index < objectList.length; index++) {
                    const element = objectList[index];
                    if (element.timeSlotId2MediaLengua === currentElement.TIME_SLOT_ID) {
                        objectList[index].timeValue2 = currentElement.TIME_VALUE;
                        objectList[index].timeValue2Format = this.parseTimeFormat(currentElement.TIME_VALUE);
                    }
                }
            }
            //console.log(objectList);
            callbackEafSuccess(objectList, mp3File);
        }.bind(this));
    }

    /**
  * @description this is a function for parsing the format of the time.
  * @param {*} duration 
  */
    parseTimeFormat(duration) {
        var milliseconds = parseInt((duration % 1000) / 100)
            , seconds = parseInt((duration / 1000) % 60)
            , minutes = parseInt((duration / (1000 * 60)) % 60)
            , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return minutes + ":" + seconds + ":" + milliseconds;
    }
}
module.exports = FilesFirepoint;