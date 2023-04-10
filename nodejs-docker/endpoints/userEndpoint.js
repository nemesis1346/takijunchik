'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const winston = require('winston');
const cardname = 'admin@tinkunakuy';
const networkNamespace = 'org.nemesis1346.tinkunakuy';
const LOG = winston.loggers.get('application');
const UserModel = require('../models/userModel.js');
const DataModel = require('../models/dataModel.js');

class UserEndpoint {
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
     * @description It returns the object of the user
     * @return {Promise} A promise that returns the object authenticated 
     */
    async login(requestLogin) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Login in Composer.js: ');
        console.log(requestLogin);
        let request = requestLogin.credentials;
        try {
            let email = request.email;
            let pwd = request.password;

            //We set the result of for the response
            dataModel.data = JSON.stringify(userModel);
            dataModel.status = '200';

            return dataModel;

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It creates a new user
     * @return {Promise} A promise that creates a user
     */
    async createUser(requestUser) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Create User in Composer: ');
        console.log(requestUser);
        let request = requestUser.params;
        try {
            let userModel = new UserModel(
                request.email,
                request.name,
                request.password,
                request.userType
            );

            dataModel.data = 'User ' + userModel.email + ' saved successfully'
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.error(error.error);
            return 'Error Create User: ' + error;
        }
    }
}
module.exports = UserEndpoint;