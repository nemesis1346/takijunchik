'use strict';
const DataModel = require('../models/dataModel.js');

class FilesFirepoint {
    constructor() {
        // this.database = defaultApp.database();
        // this.storage = defaultApp.storage();
    }

    async processingFiles(eafFile,mp3File) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Upload Files in Composer: ');
        console.log('Eaf File');
        console.log(eafFile);
        console.log('Mp3 File');
        console.log(mp3File);
        try {
            
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
module.exports = FilesFirepoint;