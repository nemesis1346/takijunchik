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
    async getObject(requestObject) {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request get Object in Composer: ');
        console.log(requestObject);
        let input = requestObject.input;
        try {

            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let objectRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');

            console.log('Type: ' + input.type);

            //This is for getting the property name
            //TODO: MUST BE A QUERY WITH ANY OF THE INPUT
            switch (input.type) {
                case 'annotationId':
                    let existObject = await objectRegistry.exists(input.object);
                    if (existObject) {
                        let object = objectRegistry.get(input.object);

                        let currentObject = new ObjectModel(
                            object.timeSlotId1,
                            object.timeSlotId2,
                            object.timeValue,
                            object.contentValue,
                            object.annotationId
                        );

                        dataModel.data = currentObject;
                        dataModel.status = '200';
                        return dataModel;
                    } else {
                        dataModel.message = 'Object with ' + input.annotationId + ' doesnt exist';
                        dataModel.status = '300';
                        return dataModel;
                    }
                case 'contentValue':
                    break;
                default:
                    break;
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
    async getAllWords() {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request Get All Words in Composer: ');
        try {
            let wordsList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let wordRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Word');
            let words = await wordRegistry.getAll();
            words.forEach(element => {
                let currentWord = new WordModel(
                    element.wordId,
                    element.spanish,
                    element.english,
                    element.kichwa,
                    element.descriptionSpanish,
                    element.descriptionEnglish,
                    element.descriptionKichwa
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
                requestObject.timeSlotId1,
                requestObject.timeSlotId2,
                requestObject.timeValue,
                requestObject.contentValue,
                requestObject.annotationId
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');
            let factory = connection.getFactory();

            let object = factory.newResource(networkNamespace, "Object", objectModel.annotationId);
            object.timeSlotId1 = objectModel.timeSlotId1;
            object.timeSlotId2 = objectModel.timeSlotId2;
            object.timeValue = objectModel.timeValue;
            object.contentValue = objectModel.contentValue;
            object.annotationId = objectModel.annotationId;

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