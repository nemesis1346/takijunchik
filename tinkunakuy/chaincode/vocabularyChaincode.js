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
     * @return {Promise} A promise that returns the boject detail
     */
    async getObjectsByQuery(requestObject) {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request get Object in Composer: ');
        console.log(requestObject);
        let input = requestObject.input;

        try {

            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let objectRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');

            let objectQuery = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy WHERE (spanishContent CONTAINS [_$input] OR (kichwaContent CONTAINS [_$input])');
            let objects = await businessNetworkConnection.query(objectQuery, { input: input });

            console.log(objects);
            //if (objects.lenth > 0) { }

            // objects.forEach(element => {

            // });

            // let currentObject = new ObjectModel(
            //     element.objectId,
            //     //Variables for annotationId
            //     element.annotationIdMediaLengua,
            //     element.annotationIdSpanish,
            //     element.annotationIdKichwa,
            //     element.annotationIdElicitSentence,
            //     element.annotationIdIpa,
            //     element.annotationIdGlosses,
            //     element.annotationIdSegmented,
            //     //Variables for time slot1
            //     element.timeSlotId1MediaLengua,
            //     element.timeSlotId1Spanish,
            //     element.timeSlotId1Kichwa,
            //     element.timeSlotId1ElicitSentence,
            //     element.timeSlotId1Ipa,
            //     element.timeSlotId1Glosses,
            //     element.timeSlotId1Segmented,
            //     //Variables for times slot2
            //     element.timeSlotId2MediaLengua,
            //     element.timeSlotId2Spanish,
            //     element.timeSlotId2Kichwa,
            //     element.timeSlotId2ElicitSentence,
            //     element.timeSlotId2Ipa,
            //     element.timeSlotId2Glosses,
            //     element.timeSlotId2Segmented,
            //     //Variables for the content
            //     element.mediaLenguaContent,
            //     element.spanishContent,
            //     element.kichwaContent,
            //     element.elicitSentenceContent,
            //     element.ipaContent,
            //     element.glossesContent,
            //     element.segmentedContent,
            //     //Time values
            //     element.timeValue1,
            //     element.timeValue2
            // );

            dataModel.data = currentObject;
            dataModel.status = '200';
            return dataModel;




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
            let wordsList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let wordRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');
            let words = await wordRegistry.getAll();
            words.forEach(element => {
                let currentWord = new WordModel(
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
                    element.timeValue2
                );
                wordsList.push(currentWord);
            });

            dataModel.data = JSON.stringify(words);
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
                requestObject.timeValue2
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');
            let factory = connection.getFactory();

            let object = factory.newResource(networkNamespace, "Object", objectModel.objectId);
            object.objectId;
            //Variables for annotationId
            object.annotationIdMediaLengua;
            object.annotationIdSpanish;
            object.annotationIdKichwa;
            object.annotationIdElicitSentence;
            object.annotationIdIpa;
            object.annotationIdGlosses;
            object.annotationIdSegmented;
            //Variables for time slot1
            object.timeSlotId1MediaLengua;
            object.timeSlotId1Spanish;
            object.timeSlotId1Kichwa;
            object.timeSlotId1ElicitSentence;
            object.timeSlotId1Ipa;
            object.timeSlotId1Glosses;
            object.timeSlotId1Segmented;
            //Variables for times slot2
            object.timeSlotId2MediaLengua;
            object.timeSlotId2Spanish;
            object.timeSlotId2Kichwa;
            object.timeSlotId2ElicitSentence;
            object.timeSlotId2Ipa;
            object.timeSlotId2Glosses;
            object.timeSlotId2Segmented;
            //Variables for the content
            object.mediaLenguaContent;
            object.spanishContent;
            object.kichwaContent;
            object.elicitSentenceContent;
            object.ipaContent;
            object.glossesContent;
            object.segmentedContent;
            //Time values
            object.timeValue1;
            object.timeValue2;

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
}
module.exports = VocabularyChaincode;