'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const IdCard = require('composer-common').IdCard;
const cardname = 'admin@tinkunakuy';
const networkNamespace = 'org.nemesis1346.tinkunakuy';
const LOG = winston.loggers.get('application');
const UserModel = require('../models/userModel.js');
const DataModel = require('../models/dataModel.js');

class UserFirepoint {
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
     * @description This method is for streaming an audio file
     * @return {Promise} the streamming service?
     * 
     */
   
}

module.exports = UserFirepoint;