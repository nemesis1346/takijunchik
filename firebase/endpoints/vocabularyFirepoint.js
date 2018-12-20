'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const winston = require('winston');
const cardname = 'admin@tinkunakuy';
const networkNamespace = 'org.nemesis1346.tinkunakuy';
const LOG = winston.loggers.get('application');
const WordModel = require('../models/wordModel.js');
const ObjectModel = require('../models/objectModel.js');
const DataModel = require('../models/dataModel.js');

const admin = require("firebase-admin");

const serviceAccount = require("../credentials/media-lengua-firebase-adminsdk-y63jq-05ba265775.json");

const defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://media-lengua.firebaseio.com"
});

const database = defaultApp.database();


class VocabularyFirepoint {
    constructor() {
    }

    /** 
     * @description Initalizes the Hyperstate Network by making a connection to the Composer runtime. Could be for ping?
     * @return {Promise} A promise whose fullfillment means the initialization has completed
     */
    async init() {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardname);
        console.log(this.businessNetworkDefinition);
        LOG.info('tinkunakuy:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
    }

    /**
     * @description It returns a detailed object of the database
     * @return {Promise} A promise that returns the object detail
     */
    async getObject(objectId) {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request get Object in Composer: ');
        console.log(objectId);
        try {
           
            //element should be result

            let currentObject = new ObjectModel(
                element.objectId,
                element.annotationIdMediaLengua,
                element.annotationIdSpanish,
                element.annotationIdKichwa,
                element.annotationIdElicitSentence,
                element.annotationIdIpa,
                element.annotationIdGlosses,
                element.annotationIdSegmented,
                element.timeSlotId1MediaLengua,
                element.timeSlotId1Spanish,
                element.timeSlotId1Kichwa,
                element.timeSlotId1ElicitSentence,
                element.timeSlotId1Ipa,
                element.timeSlotId1Glosses,
                element.timeSlotId1Segmented,
                element.timeSlotId2MediaLengua,
                element.timeSlotId2Spanish,
                element.timeSlotId2Kichwa,
                element.timeSlotId2ElicitSentence,
                element.timeSlotId2Ipa,
                element.timeSlotId2Glosses,
                element.timeSlotId2Segmented,
                element.mediaLenguaContent,
                element.spanishContent,
                element.kichwaContent,
                element.elicitSentenceContent,
                element.ipaContent,
                element.glossesContent,
                element.segmentedContent,
                element.timeValue1,
                element.timeValue2,
                element.mediaLenguaContentArray,
                element.spanishContentArray,
                element.kichwaContentArray,
                element.elicitSentenceContentArray,
                element.ipaContentArray,
                element.glossesContentArray,
                element.segmentedContentArray
            );

            dataModel.data = JSON.stringify(currentObject);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It returns a detailed object of the database
     * @return {Promise} A promise that returns the object detail
     */
    async getObjectsByQuery(requestObject) {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request get Object in Composer: ');
        console.log(requestObject);
        let input = requestObject.input;
        //let input = requestObject.input;

        try {
            let resultList = [];
        

            //  Query objects should be the result;
            if (queryObjects.length > 0) {

                queryObjects.forEach(element => {
                    let currentObject = new ObjectModel(
                        element.objectId,
                        //Variables for annotationId
                        element.annotationIdMediaLengua,
                        element.annotationIdSpanish,
                        element.annotationIdKichwa,
                        element.annotationIdElicitSentence,
                        element.annotationIdIpa,
                        element.annotationIdGlosses,
                        element.annotationIdSegmented,
                        //Variables for time slot1
                        element.timeSlotId1MediaLengua,
                        element.timeSlotId1Spanish,
                        element.timeSlotId1Kichwa,
                        element.timeSlotId1ElicitSentence,
                        element.timeSlotId1Ipa,
                        element.timeSlotId1Glosses,
                        element.timeSlotId1Segmented,
                        //Variables for times slot2
                        element.timeSlotId2MediaLengua,
                        element.timeSlotId2Spanish,
                        element.timeSlotId2Kichwa,
                        element.timeSlotId2ElicitSentence,
                        element.timeSlotId2Ipa,
                        element.timeSlotId2Glosses,
                        element.timeSlotId2Segmented,
                        //Variables for the content
                        element.mediaLenguaContent,
                        element.spanishContent,
                        element.kichwaContent,
                        element.elicitSentenceContent,
                        element.ipaContent,
                        element.glossesContent,
                        element.segmentedContent,
                        //Time values
                        element.timeValue1,
                        element.timeValue2,
                        element.mediaLenguaContentArray,
                        element.spanishContentArray,
                        element.kichwaContentArray,
                        element.elicitSentenceContentArray,
                        element.ipaContentArray,
                        element.glossesContentArray,
                        element.segmentedContentArray);

                    resultList.push(currentObject);
                });

                resultList = this.removeDuplicatesProp(resultList, 'objectId');

                dataModel.data = resultList;
                dataModel.status = '200';
                return dataModel;
            } else {
                dataModel.message = "No results ";
                dataModel.status = '300';
                return dataModel;
            }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It returns the list of all the words
     * @return {Promise} A promise that returns the list of all the words
     */
    async getAllObjects() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Get All Objects in Composer: ');
        try {
            let objectList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let objectRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');
            let objectListResponse = await objectRegistry.getAll();
            console.log(objectListResponse);

            objectListResponse.forEach(element => {
                let currentObject = new ObjectModel(
                    element.objectId,
                    //Variables for annotationId
                    element.annotationIdMediaLengua,
                    element.annotationIdSpanish,
                    element.annotationIdKichwa,
                    element.annotationIdElicitSentence,
                    element.annotationIdIpa,
                    element.annotationIdGlosses,
                    element.annotationIdSegmented,
                    //Variables for time slot1
                    element.timeSlotId1MediaLengua,
                    element.timeSlotId1Spanish,
                    element.timeSlotId1Kichwa,
                    element.timeSlotId1ElicitSentence,
                    element.timeSlotId1Ipa,
                    element.timeSlotId1Glosses,
                    element.timeSlotId1Segmented,
                    //Variables for times slot2
                    element.timeSlotId2MediaLengua,
                    element.timeSlotId2Spanish,
                    element.timeSlotId2Kichwa,
                    element.timeSlotId2ElicitSentence,
                    element.timeSlotId2Ipa,
                    element.timeSlotId2Glosses,
                    element.timeSlotId2Segmented,
                    //Variables for the content
                    element.mediaLenguaContent,
                    element.spanishContent,
                    element.kichwaContent,
                    element.elicitSentenceContent,
                    element.ipaContent,
                    element.glossesContent,
                    element.segmentedContent,
                    //Time values
                    element.timeValue1,
                    element.timeValue2,
                    //Arrays
                    element.mediaLenguaContentArray,
                    element.spanishContentArray,
                    element.kichwaContentArray,
                    element.elicitSentenceContentArray,
                    element.ipaContentArray,
                    element.glossesContentArray,
                    element.segmentedContentArray
                );
                objectList.push(currentObject);
            });

            dataModel.data = JSON.stringify(objectList);
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It creates a new word
     * @return {Promise} A promise that creates a word
     */
    async saveWord(requestWord) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Save Word: ');
        console.log(requestWord);
        try {
            let wordModel = new WordModel(
                requestWord.wordId,
                requestWord.spanish,
                requestWord.english,
                requestWord.kichwa,
                requestWord.descriptionSpanish,
                requestWord.descriptionEnglish,
                requestWord.descriptionKichwa
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Word');
            let factory = connection.getFactory();

            let word = factory.newResource(networkNamespace, "Word", wordModel.wordId);
            word.wordId = wordModel.wordId;
            word.spanish = wordModel.spanish;
            word.english = wordModel.english;
            word.kichwa = wordModel.kichwa;
            word.descriptionSpanish = wordModel.descriptionSpanish;
            word.descriptionEnglish = wordModel.descriptionEnglish;
            word.descriptionKichwa = wordModel.descriptionKichwa;
            await assetRegistry.add(word);
            await businessNetworkConnection.disconnect();

            dataModel.data = 'Word ' + word.wordId + ' saved successfully'
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    /**
    * @description It creates a new object for storing linguistics project
    * @return {Promise} A promise that creates a object for storing linguistics project
    * @param object is the model for the object
    */
    async saveObject(requestObject) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Save Object: ');
        console.log(requestObject);

        try {
            let objectModel = new ObjectModel(
                requestObject.objectId,
                //Variables for annotationId
                requestObject.annotationIdMediaLengua,
                requestObject.annotationIdSpanish,
                requestObject.annotationIdKichwa,
                requestObject.annotationIdElicitSentence,
                requestObject.annotationIdIpa,
                requestObject.annotationIdGlosses,
                requestObject.annotationIdSegmented,
                //Variables for time slot1
                requestObject.timeSlotId1MediaLengua,
                requestObject.timeSlotId1Spanish,
                requestObject.timeSlotId1Kichwa,
                requestObject.timeSlotId1ElicitSentence,
                requestObject.timeSlotId1Ipa,
                requestObject.timeSlotId1Glosses,
                requestObject.timeSlotId1Segmented,
                //Variables for times slot2
                requestObject.timeSlotId2MediaLengua,
                requestObject.timeSlotId2Spanish,
                requestObject.timeSlotId2Kichwa,
                requestObject.timeSlotId2ElicitSentence,
                requestObject.timeSlotId2Ipa,
                requestObject.timeSlotId2Glosses,
                requestObject.timeSlotId2Segmented,
                //Variables for the content
                requestObject.mediaLenguaContent,
                requestObject.spanishContent,
                requestObject.kichwaContent,
                requestObject.elicitSentenceContent,
                requestObject.ipaContent,
                requestObject.glossesContent,
                requestObject.segmentedContent,
                //Time values
                requestObject.timeValue1,
                requestObject.timeValue2,
                //Arrays //Maybe not necesarely
                this.parseContent(requestObject.mediaLenguaContent),
                this.parseContent(requestObject.spanishContent),
               this.parseContent(requestObject.kichwaContent),
                this.parseContent(requestObject.elicitSentenceContent),
               this.parseContent(requestObject.ipaContent),
                this.parseContent(requestObject.glossesContent),
                this.parseContent(requestObject.segmentedContent),
            );

            firebase.database().ref('objectModel/' + requestObject.objectId).set({
                username: name,
                email: email,
                profile_picture : imageUrl
              });

            dataModel.data = 'Object ' + object.annotationId + ' saved successfully'
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //  MORE EFFICIENT, BUT LESS FUN
    /**
     * @description Remove duplicates from an array of objects in javascript
     * @param arr - Array of objects
     * @param prop - Property of each object to compare
     * @returns {Array}
     */
    removeDuplicatesProp(arr, prop) {
        let obj = {};
        return Object.keys(arr.reduce((prev, next) => {
            if (!obj[next[prop]]) obj[next[prop]] = next;
            return obj;
        }, obj)).map((i) => obj[i]);
    }


    parseContent(content) {
        // console.log(content);
        let entireContent = content;
        let finalResult = [];

        //Processing for the entire sentence
        for (let index = 0; index <= entireContent.length; index++) {
            for (let j = index; j <= entireContent.length; j++) {
                const currentResult = entireContent.slice(index, j).trim();
                if (currentResult) {
                    finalResult.push(currentResult.toLowerCase());
                }
            }
        }
        finalResult = this.removeDuplicates(finalResult);
        return finalResult;
    }
    /**
     * @description Remove duplicates
     */
    removeDuplicates(arr) {
        let unique_array = []
        for (let i = 0; i < arr.length; i++) {
            if (unique_array.indexOf(arr[i]) == -1) {
                unique_array.push(arr[i])
            }
        }
        return unique_array
    }
}
module.exports = VocabularyFirepoint;