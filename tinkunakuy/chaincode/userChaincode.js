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

class UserChaincode {
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
            let businessNetworkConnection = new BusinessNetworkConnection();
            let email = request.email;
            let pwd = request.password;
            await businessNetworkConnection.connect(cardname)

            console.log(email);
            console.log(pwd);
            let query = businessNetworkConnection.buildQuery('SELECT org.nemesis1346.tinkunakuy.User WHERE (email==_$email AND pwd==_$pwd)');
            let userQuery = await businessNetworkConnection.query(query, { email: email, pwd: pwd });
            console.log('Login Composer User Response: ');
            console.log(userQuery.email);
            if (userQuery.email) {
                let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.User');

                let userResult = await participantRegistry.get(userQuery[0].$identifier);

                let userModel = new UserModel(
                    userResult.name,
                    userResult.email,
                    userResult.userType
                );
                //We set the result of for the response
                dataModel.data = JSON.stringify(userModel);
                dataModel.status = '200';

                return dataModel;
            } else {
                dataModel.message = 'User with email ' + email + ' doesnt exist';
                dataModel.status = '300';
                return dataModel;
            }
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
        console.log('Request User: ');
        console.log(requestUser);
        let request = requestUser.params;
        try {
            let userModel = new UserModel(
                request.email,
                request.name,
                request.password,
                request.userType
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.User');
            let factory = connection.getFactory();

            let user = factory.newResource(networkNamespace, "User", userModel.email);
            user.email = userModel.email;
            user.name = userModel.name;
            user.userType = userModel.userType;
            user.pwd = userModel.pwd;

            await participantRegistry.add(user);
            await businessNetworkConnection.disconnect();
            return 'User ' + userModel.email + ' saved successfully';
        } catch (error) {
            console.error(error.error);
            return 'Error Create User: ' + error;
        }
    }
}
module.exports = UserChaincode;