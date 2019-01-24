'use strict';
const ObjectModel = require('../models/objectModel.js');
const DataModel = require('../models/dataModel.js');

const firebase = require('../firebaseSetup/firebaseConfig.js');
//This must be deleted 
class VocabularyFirepoint {
    constructor() {
        this.database = firebase.database();
        this.storage = firebase.storage();
    }

    /** 
     * @description Initalizes the Hyperstate Network by making a connection to the Composer runtime. Could be for ping?
     * @return {Promise} A promise whose fullfillment means the initialization has completed
     */
    async init() {
    }


    async getObjectQuery(requestObjectQuery) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Save Object: ');
        console.log(requestObjectQuery);
        try {
            let input = requestObjectQuery.input;
            const snapshot = await this.database.ref('objectModel/')
                .orderByChild("mediaLenguaContent")
                .once("value");
            let responseList = snapshot.val();
            let resultList = [];
            for (var i in responseList) {
                if (responseList[i].mediaLenguaContent.includes(input)) {
                    resultList.push(responseList[i]);
                }
            }
            console.log(resultList)
            dataModel.data = JSON.stringify(resultList);
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log(error);
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

            this.database.ref('objectModel/' + requestObject.objectId).set({
                "objectId": objectModel.objectId,
                //Variables for annotationId
                "annotationIdMediaLengua": objectModel.annotationIdMediaLengua,
                "annotationIdSpanish": objectModel.annotationIdSpanish,
                "annotationIdKichwa": objectModel.annotationIdKichwa,
                "annotationIdElicitSentence": objectModel.annotationIdElicitSentence,
                "annotationIdIpa": objectModel.annotationIdIpa,
                "annotationIdGlosses": objectModel.annotationIdGlosses,
                "annotationIdSegmented": objectModel.annotationIdSegmented,
                //Variables for time slot1
                "timeSlotId1MediaLengua": objectModel.timeSlotId1MediaLengua,
                "timeSlotId1Spanish": objectModel.timeSlotId1Spanish,
                "timeSlotId1Kichwa": objectModel.timeSlotId1Kichwa,
                "timeSlotId1ElicitSentence": objectModel.timeSlotId1ElicitSentence,
                "timeSlotId1Ipa": objectModel.timeSlotId1Ipa,
                "timeSlotId1Glosses": objectModel.timeSlotId1Glosses,
                "timeSlotId1Segmented": objectModel.timeSlotId1Segmented,
                //Variables for times slot2
                "timeSlotId2MediaLengua": objectModel.timeSlotId2MediaLengua,
                "timeSlotId2Spanish": objectModel.timeSlotId2Spanish,
                "timeSlotId2Kichwa": objectModel.timeSlotId2Kichwa,
                "timeSlotId2ElicitSentence": objectModel.timeSlotId2ElicitSentence,
                "timeSlotId2Ipa": objectModel.timeSlotId2Ipa,
                "timeSlotId2Glosses": objectModel.timeSlotId2Glosses,
                "timeSlotId2Segmented": objectModel.timeSlotId2Segmented,
                //Variables for the content
                "mediaLenguaContent": objectModel.mediaLenguaContent,
                "spanishContent": objectModel.spanishContent,
                "kichwaContent": objectModel.kichwaContent,
                "elicitSentenceContent": objectModel.elicitSentenceContent,
                "ipaContent": objectModel.ipaContent,
                "glossesContent": objectModel.glossesContent,
                "segmentedContent": objectModel.segmentedContent,
                //Time values
                "timeValue1": objectModel.timeValue1,
                "timeValue2": objectModel.timeValue2,
                //Arrays
                "mediaLenguaContentArray": this.parseContent(objectModel.mediaLenguaContent),
                "spanishContentArray": this.parseContent(objectModel.spanishContent),
                "kichwaContentArray": this.parseContent(objectModel.kichwaContent),
                "elicitSentenceContentArray": this.parseContent(objectModel.elicitSentenceContent),
                "ipaContentArray": this.parseContent(objectModel.ipaContent),
                "glossesContentArray": this.parseContent(objectModel.glossesContent),
                "segmentedContentArray": this.parseContent(objectModel.segmentedContent)
            });

            dataModel.data = 'Object ' + objectModel.objectId + ' saved successfully'
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