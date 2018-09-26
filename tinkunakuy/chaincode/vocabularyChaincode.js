'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const IdCard = require('composer-common').IdCard;
const cardname = 'admin@tinkunakuy';
const networkNamespace = 'org.nemesis1346.tinkunakuy';
const LOG = winston.loggers.get('application');
const WordModel = require('../models/wordModel.js');
const ObjectModel = require('../models/objectModel.js');
const DataModel = require('../models/dataModel.js');
class VocabularyChaincode {
    constructor() {
        try {
            //this.bizNetworkConnection = new BusinessNetworkConnection();
            //this.init();
        } catch (error) {
            console.log(error);
        }
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
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');

            let element = await assetRegistry.get(objectId);
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
        let input = requestObject;
        //let input = requestObject.input;

        try {
            let resultList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let objectRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');

            // let objectQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (mediaLenguaContentArray CONTAINS _$input) OR (spanishContentArray CONTAINS _$input) OR (kichwaContentArray CONTAINS _$input) OR (elicitSentenceContentArray CONTAINS _$input) OR (ipaContentArray CONTAINS _$input) OR (glossesContentArray CONTAINS _$input) OR (segmentedContentArray CONTAINS _$input)');
            let mediaLenguatQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (mediaLenguaContentArray CONTAINS _$input)');
            let mediaLenguaObjects = await businessNetworkConnection.query(mediaLenguatQuery, { input: input });

            let spanishQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (spanishContentArray CONTAINS _$input)');
            let spanishObjects = await businessNetworkConnection.query(spanishQuery, { input: input });

            let kichwaQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (kichwaContentArray CONTAINS _$input)');
            let kichwaObjects = await businessNetworkConnection.query(kichwaQuery, { input: input });

            let elicitSentenceQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (elicitSentenceContentArray CONTAINS _$input)');
            let elicitSentenceObjects = await businessNetworkConnection.query(elicitSentenceQuery, { input: input });

            let ipaQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (ipaContentArray CONTAINS _$input)');
            let ipaObjects = await businessNetworkConnection.query(ipaQuery, { input: input });

            let glossesQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (glossesContentArray CONTAINS _$input)');
            let glossesObjects = await businessNetworkConnection.query(glossesQuery, { input: input });

            let segmentedQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.Object WHERE (segmentedContentArray CONTAINS _$input)');
            let segmentedObjects = await businessNetworkConnection.query(segmentedQuery, { input: input });

            let queryObjects = mediaLenguaObjects.concat(spanishObjects.concat(kichwaObjects.concat(elicitSentenceObjects.concat(ipaObjects.concat(glossesObjects.concat(segmentedObjects))))));

            queryObjects = this.removeDuplicates(queryObjects);

            console.log(queryObjects);
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
    */
    async saveObject(requestObject) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Save Object: ');
        console.log(requestObject.timeSlotId1Kichwa);

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
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');
            let factory = connection.getFactory();

            let object = factory.newResource(networkNamespace, "Object", objectModel.objectId);
            object.objectId = objectModel.objectId;
            //Variables for annotationId
            object.annotationIdMediaLengua = objectModel.annotationIdMediaLengua;
            object.annotationIdSpanish = object.annotationIdSpanish;
            object.annotationIdKichwa = objectModel.annotationIdKichwa;
            object.annotationIdElicitSentence = objectModel.annotationIdElicitSentence;
            object.annotationIdIpa = objectModel.annotationIdIpa;
            object.annotationIdGlosses = objectModel.annotationIdGlosses;
            object.annotationIdSegmented = objectModel.annotationIdSegmented;
            //Variables for time slot1
            object.timeSlotId1MediaLengua = objectModel.timeSlotId1MediaLengua;
            object.timeSlotId1Spanish = objectModel.timeSlotId1Spanish;
            object.timeSlotId1Kichwa = objectModel.timeSlotId1Kichwa;
            object.timeSlotId1ElicitSentence = objectModel.timeSlotId1ElicitSentence;
            object.timeSlotId1Ipa = objectModel.timeSlotId1Ipa;
            object.timeSlotId1Glosses = objectModel.timeSlotId1Glosses;
            object.timeSlotId1Segmented = objectModel.timeSlotId1Segmented;
            //Variables for times slot2
            object.timeSlotId2MediaLengua = objectModel.timeSlotId2MediaLengua;
            object.timeSlotId2Spanish = objectModel.timeSlotId2Spanish;
            object.timeSlotId2Kichwa = objectModel.timeSlotId2Kichwa;
            object.timeSlotId2ElicitSentence = objectModel.timeSlotId2ElicitSentence;
            object.timeSlotId2Ipa = objectModel.timeSlotId2Ipa;
            object.timeSlotId2Glosses = objectModel.timeSlotId2Glosses;
            object.timeSlotId2Segmented = objectModel.timeSlotId2Segmented;
            //Variables for the content
            object.mediaLenguaContent = objectModel.mediaLenguaContent;
            object.spanishContent = objectModel.spanishContent;
            object.kichwaContent = objectModel.kichwaContent;
            object.elicitSentenceContent = objectModel.elicitSentenceContent;
            object.ipaContent = objectModel.ipaContent;
            object.glossesContent = objectModel.glossesContent;
            object.segmentedContent = objectModel.segmentedContent;
            //Time values
            object.timeValue1 = objectModel.timeValue1;
            object.timeValue2 = objectModel.timeValue2;

            let wordsMediaLengua = objectModel.mediaLenguaContent.split(" ");
            let wordsSpanish = objectModel.spanishContent.split(" ");
            let wordsKichwa = objectModel.kichwaContent.split(" ");
            let wordsElicitSentence = objectModel.elicitSentenceContent.split(" ");
            let wordsIpa = objectModel.ipaContent.split(" ");
            let wordsGlosses = objectModel.glossesContent.split(" ");
            let wordsSegmented = objectModel.segmentedContent.split(" ");

            //Arrays
            object.mediaLenguaContentArray = wordsMediaLengua;
            object.spanishContentArray = wordsSpanish;
            object.kichwaContentArray = wordsKichwa;
            object.elicitSentenceContentArray = wordsElicitSentence;
            object.ipaContentArray = wordsIpa;
            object.glossesContentArray = wordsGlosses;
            object.segmentedContentArray = wordsSegmented;

            await assetRegistry.add(object);
            await businessNetworkConnection.disconnect();

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
     * Remove duplicates from an array of objects in javascript
     * @param arr - Array of objects
     * @param prop - Property of each object to compare
     * @returns {Array}
     */
    removeDuplicates(arr, prop) {
        var obj = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
        }
        var newArr = [];
        for (var key in obj) newArr.push(obj[key]);
        return newArr;
    }
}
module.exports = VocabularyChaincode;