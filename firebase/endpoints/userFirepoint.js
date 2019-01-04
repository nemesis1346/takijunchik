'use strict';
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
       
    }
    /** 
     * @description This method is for streaming an audio file
     * @return {Promise} the streamming service?
     * 
     */
   
}

module.exports = UserFirepoint;