"use strict";
const ObjectModel = require("../models/objectModel.js");
const DataModel = require("../models/dataModel.js");
const utils = require('../utils/utils.js')
const firebase = require("../firebaseSetup/firebaseConfig.js");
//This must be deleted
class MediaLenguaEndpoint {
  constructor() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  /**
   * @description Initalizes the Hyperstate Network by making a connection to the Composer runtime. Could be for ping?
   * @return {Promise} A promise whose fullfillment means the initialization has completed
   */
  async init() { }

  async getObjectQuery(requestObjectQuery) {
    let dataModel = new DataModel(null, null, null);
    console.log("************************************");
    console.log("Request Save Object: ");
    console.log(requestObjectQuery);
    try {
      let input = requestObjectQuery.input;
      let resultList = [];

      //We do this for mediaLengua Content
      const snapshotMediaLengua = await this.database
        .ref("objectModel/")
        .orderByChild("mediaLenguaContent")
        .once("value");
      let responseListMediaLengua = snapshotMediaLengua.val();
      for (var i in responseListMediaLengua) {
        if (responseListMediaLengua[i].mediaLenguaContent.includes(input)) {
          resultList.push(responseListMediaLengua[i]);
        }
      }
      //We do this for Spanish
      const snapshotSpanish = await this.database
        .ref("objectModel/")
        .orderByChild("spanishContent")
        .once("value");
      let responseListSpanish = snapshotSpanish.val();
      for (var i in responseListSpanish) {
        if (responseListSpanish[i].spanishContent.includes(input)) {
          resultList.push(responseListSpanish[i]);
        }
      }
      //We do this for kichwa content
      const snapshotKichwa = await this.database
        .ref("objectModel/")
        .orderByChild("kichwaContent")
        .once("value");
      let responseListKichwa = snapshotKichwa.val();
      for (var i in responseListKichwa) {
        if (responseListKichwa[i].kichwaContent.includes(input)) {
          resultList.push(responseListKichwa[i]);
        }
      }
      //We do this for Elicit Sentence
      const snapshotElicitSentence = await this.database
        .ref("objectModel/")
        .orderByChild("elicitSentenceContent")
        .once("value");
      let responseListElicitSentence = snapshotElicitSentence.val();
      for (var i in responseListElicitSentence) {
        if (
          responseListElicitSentence[i].elicitSentenceContent.includes(input)
        ) {
          resultList.push(responseListElicitSentence[i]);
        }
      }
      //We do this for Ipa
      const snapshotIpa = await this.database
        .ref("objectModel/")
        .orderByChild("ipaContent")
        .once("value");
      let responseListIpa = snapshotIpa.val();
      for (var i in responseListIpa) {
        if (responseListIpa[i].ipaContent.includes(input)) {
          resultList.push(responseListIpa[i]);
        }
      }
      console.log('PRE FILTERED');
      console.log(resultList);

      let filteredResult = this.removeDuplicates2(resultList, 'objectId');

      console.log('FILTERED');
      console.log(filteredResult);
      dataModel.data = JSON.stringify(filteredResult);
      dataModel.status = "200";
      return dataModel;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description It creates a new object for storing it in the firebase database
   * @return {Promise} A promise that creates a object for storing linguistics project
   * @param object is the model for the object
   */
  async saveObject(requestObject) {
    let dataModel = new DataModel(null, null, null);
    console.log("************************************");
    console.log("Request Save Object: ");
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
        utils.parseContent(requestObject.mediaLenguaContent),
        utils.parseContent(requestObject.spanishContent),
        utils.parseContent(requestObject.kichwaContent),
        utils.parseContent(requestObject.elicitSentenceContent),
        utils.parseContent(requestObject.ipaContent),
        utils.parseContent(requestObject.glossesContent),
        utils.parseContent(requestObject.segmentedContent)
      );

      this.database.ref("objectModel/" + requestObject.objectId).set({
        objectId: objectModel.objectId,
        //Variables for annotationId
        annotationIdMediaLengua: objectModel.annotationIdMediaLengua,
        annotationIdSpanish: objectModel.annotationIdSpanish,
        annotationIdKichwa: objectModel.annotationIdKichwa,
        annotationIdElicitSentence: objectModel.annotationIdElicitSentence,
        annotationIdIpa: objectModel.annotationIdIpa,
        annotationIdGlosses: objectModel.annotationIdGlosses,
        annotationIdSegmented: objectModel.annotationIdSegmented,
        //Variables for time slot1
        timeSlotId1MediaLengua: objectModel.timeSlotId1MediaLengua,
        timeSlotId1Spanish: objectModel.timeSlotId1Spanish,
        timeSlotId1Kichwa: objectModel.timeSlotId1Kichwa,
        timeSlotId1ElicitSentence: objectModel.timeSlotId1ElicitSentence,
        timeSlotId1Ipa: objectModel.timeSlotId1Ipa,
        timeSlotId1Glosses: objectModel.timeSlotId1Glosses,
        timeSlotId1Segmented: objectModel.timeSlotId1Segmented,
        //Variables for times slot2
        timeSlotId2MediaLengua: objectModel.timeSlotId2MediaLengua,
        timeSlotId2Spanish: objectModel.timeSlotId2Spanish,
        timeSlotId2Kichwa: objectModel.timeSlotId2Kichwa,
        timeSlotId2ElicitSentence: objectModel.timeSlotId2ElicitSentence,
        timeSlotId2Ipa: objectModel.timeSlotId2Ipa,
        timeSlotId2Glosses: objectModel.timeSlotId2Glosses,
        timeSlotId2Segmented: objectModel.timeSlotId2Segmented,
        //Variables for the content
        mediaLenguaContent: objectModel.mediaLenguaContent,
        spanishContent: objectModel.spanishContent,
        kichwaContent: objectModel.kichwaContent,
        elicitSentenceContent: objectModel.elicitSentenceContent,
        ipaContent: objectModel.ipaContent,
        glossesContent: objectModel.glossesContent,
        segmentedContent: objectModel.segmentedContent,
        //Time values
        timeValue1: objectModel.timeValue1,
        timeValue2: objectModel.timeValue2,
        //Arrays
        mediaLenguaContentArray: utils.parseContent(
          objectModel.mediaLenguaContent
        ),
        spanishContentArray: utils.parseContent(objectModel.spanishContent),
        kichwaContentArray: utils.parseContent(objectModel.kichwaContent),
        elicitSentenceContentArray: utils.parseContent(
          objectModel.elicitSentenceContent
        ),
        ipaContentArray: utils.parseContent(objectModel.ipaContent),
        glossesContentArray: utils.parseContent(objectModel.glossesContent),
        segmentedContentArray: utils.parseContent(objectModel.segmentedContent)
      });

      dataModel.data = "Object " + objectModel.objectId + " saved successfully";
      dataModel.status = "200";
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
  async getObject(objectId) {
    let dataModel = new DataModel(null, null, null);

    console.log('************************************');
    console.log('Request get Object in Composer: ');
    console.log(objectId);
    try {


      dataModel.data = JSON.stringify(currentObject);
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
   * @description It returns the list of all the words
   * @return {Promise} A promise that returns the list of all the words
   */
  async getAllObjects() {
    let dataModel = new DataModel(null, null, null);
    console.log('************************************');
    console.log('Request Get All Objects in Composer: ');
    try {
      let objectList = [];

      dataModel.data = JSON.stringify(objectList);
      dataModel.status = '200';
      return dataModel;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

}
module.exports = MediaLenguaEndpoint;
