"use strict";
const User = require('../models/user');
const Speech = require('../models/speech');
const Record = require('../models/record');

class DatabaseApi {
    constructor() {
        console.log('DATABASE API INSTANCE')
    }

    async init() { }


    async saveSpeech(speechObject) {
        console.log("************************************");
        console.log("Request Save Speech in Database Api: ");
        console.log(speechObject);
        try {
            await Speech.create({
                uuid: speechObject.uuid,
                userId: speechObject.userId,
                converted: speechObject.converted
            });

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async updateObjectProperty(tablename, id, property, value) {
        console.log("************************************");
        console.log("Request Update Object in Database Api: ");
        console.log('TABLENAME')
        console.log(tablename)
        console.log('ID')
        console.log(id)
        let uuidInput = id.toString()
        try {
            let query = null;

            switch (tablename) {
                case 'Record':
                    query = await Record.findOne({ where: { uuid: uuidInput } })
                    break;
                case 'Speech':
                    query = await Speech.findOne({ where: { uuid: uuidInput } })
                    break;
                default:
                    query = null;
                    break;
            }
            console.log('QUERY RESULT');
            // console.log(query.dataValues)
          

            if (query && query != null) {
                await query.update({ [property]: value })
            }
          
            return true;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async getAllSpeeches() {
        console.log("************************************");
        console.log("Get All Speeches in Database Api: ");
        try {
            let speeches = await Speech.findAll({
                // where: {
                //     userId: 0,
                // },
                attributes: ['id', 'uuid', 'converted', 'createdAt', 'updatedAt']
            });

            let finalList = [];
            speeches.forEach((resultSetItem) => {
                let current_item = resultSetItem.get({
                    plain: true
                });
                finalList.push(current_item)
            });
            return finalList;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }

    }

    async getSpeech(uuid) {
        console.log("************************************");
        console.log("Get Speech in Database Api: ");
        try {
            let speech = await Speech.findOne({ where: { uuid: uuid } });
            speech = speech.get({
                plain: true
            });
            console.log('SPEECH RESULT IN DATABASE....')
            // console.log(speech)
            return speech
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}
module.exports = DatabaseApi;
