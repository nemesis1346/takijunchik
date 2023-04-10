"use strict";
const ObjectModel = require("../models/objectModel.js");
const DataModel = require("../models/dataModel.js");
const databaseApi = require('../api/databaseApi.js');

//This must be deleted
class KichwaVocabularyEndpoint {
    constructor() {
        this.databaseApi = new databaseApi();
    }

    /**
     * @description Initalizes the Hyperstate Network by making a connection to the Composer runtime. Could be for ping?
     * @return {Promise} A promise whose fullfillment means the initialization has completed
     */
    async init() { }

    async getKichwaWords() {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request get Kichwa Words in Composer: ');
        try {

            let finalList = await this.databaseApi.getAllKichwaWords();
            console.log('KICHWA WORDS RESULT')
            console.log(finalList)
            dataModel.status = 200;
            dataModel.data = finalList;
            return dataModel;
            return true;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
       * @description It creates a new word
       * @return {Promise} A promise that creates a word
       */
    async saveKichwaWord(requestWord) {
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


}
module.exports = KichwaVocabularyEndpoint;
