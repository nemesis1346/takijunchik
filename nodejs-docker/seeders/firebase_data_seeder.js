'use strict';

const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const superagent = require('superagent');
const ObjectModel = require('../models/objectModel.js');

// Configuration
const CONFIG = {
    PORT: '8889',
    HOST: 'localhost',
    DATA_FILE: path.join(__dirname, '..', 'data', 'dataMediaLengua', 'jsonFiles', 'media_lengua_data.json')
};

/**
 * Main function to process and save data to Firebase
 */
async function mainDataInputProcess() {
    try {
        await saveAllObjectsToFirebase();
        console.log('All projects processed successfully')
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

/**
 * Reads data from JSON file and saves each object to Firebase
 */
async function saveAllObjectsToFirebase() {
    try {
        // Read and parse the JSON file
        const data = await fs.readFile(CONFIG.DATA_FILE, 'utf-8');
        const objectList = JSON.parse(data);

        // Process each object in the list
        for (const element of objectList) {
            const uuid = uuidv4();
            console.log(`Processing object: ${uuid}`);

            const currentObject = createObjectModel(uuid, element);
            await requestPost('/saveObject', JSON.stringify(currentObject));
            console.log(`Object ${uuid} processed`);
        }
    } catch (error) {
        console.error('Error in saveAllObjectsToFirebase:', error);
        throw error;
    }
}

/**
 * Creates an ObjectModel instance from the given data
 * @param {string} uuid - Unique identifier for the object
 * @param {Object} element - Data to create the object from
 * @returns {ObjectModel} - New ObjectModel instance
 */
function createObjectModel(uuid, element) {
    return new ObjectModel(
        uuid,
        // Annotation IDs
        element.annotationIdMediaLengua,
        element.annotationIdSpanish,
        element.annotationIdKichwa,
        element.annotationIdElicitSentence,
        element.annotationIdIpa,
        element.annotationIdGlosses,
        element.annotationIdSegmented,
        // Time slot 1
        element.timeSlotId1MediaLengua,
        element.timeSlotId1Spanish,
        element.timeSlotId1Kichwa,
        element.timeSlotId1ElicitSentence,
        element.timeSlotId1Ipa,
        element.timeSlotId1Glosses,
        element.timeSlotId1Segmented,
        // Time slot 2
        element.timeSlotId2MediaLengua,
        element.timeSlotId2Spanish,
        element.timeSlotId2Kichwa,
        element.timeSlotId2ElicitSentence,
        element.timeSlotId2Ipa,
        element.timeSlotId2Glosses,
        element.timeSlotId2Segmented,
        // Content
        element.mediaLenguaContent,
        element.spanishContent,
        element.kichwaContent,
        element.elicitSentenceContent,
        element.ipaContent,
        element.glossesContent,
        element.segmentedContent,
        // Time values
        element.timeValue1,
        element.timeValue2,
        // Additional null values
        ...Array(7).fill(null)
    );
}

/**
 * Sends a POST request to the specified endpoint
 * @param {string} endpoint - The API endpoint
 * @param {string} data - The data to send (JSON string)
 */
async function requestPost(endpoint, data) {
    try {
        const url = `http://${CONFIG.HOST}:${CONFIG.PORT}${endpoint}`;
        const response = await superagent
            .post(url)
            .set('Content-Type', 'application/json')
            .send(data);

        console.log('Response:', JSON.parse(response.text));
    } catch (error) {
        console.error('Error in POST request:', error.message);
        if (error.response) {
            console.error('Server response:', error.response.text);
        }
        throw error;
    }
}

// Start the main process
mainDataInputProcess().then(() => {
    console.log("Script completed");
}).catch((error) => {
    console.error("Script failed:", error);
});
// Export functions for potential use in other modules
module.exports = {
    requestPost,
    saveAllObjectsToFirebase
};