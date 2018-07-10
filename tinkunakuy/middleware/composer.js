'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const IdCard = require('composer-common').IdCard;
const cardname = 'admin@tinkunakuy';
const networkNamespace = 'org.nemesis1346.tinkunakuy';
const LOG = winston.loggers.get('application');

class Composer {
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
        LOG.info('Hyperstate:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
    }


    /**
     * @description It creates a new track
     * @return {Promise} A promise that creates a track
     */
    async createTrack(requestTrack) {
        console.log('request: ');
        console.log(requestTrack);
        try {
            let currentTrack = new TrackModel(
                requestTrack.isrc,
                requestTrack.title,
                requestTrack.revenueTotal,
                requestTrack.vendorIdentifier,
                requestTrack.label,
                requestTrack.author,
                requestTrack.ownerType,
                requestTrack.trackShares,
                requestTrack.uploadOwner
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname)
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');
            let factory = connection.getFactory();
            let track = factory.newResource(networkNamespace, "Track", currentTrack.isrc);
            track.isrc = currentTrack.isrc;
            track.title = currentTrack.title;
            track.revenueTotal = currentTrack.revenueTotal;
            track.vendorIdentifier = currentTrack.vendorIdentifier;
            track.label = currentTrack.label;
            track.author = currentTrack.author;
            track.ownerType = currentTrack.ownerType;
            // track.uploadOwner="";
            // track.trackShares="";
            await assetRegistry.add(track);
            await businessNetworkConnection.disconnect();
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
module.exports = Composer;