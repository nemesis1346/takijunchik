"use strict";
const kichwaWordObject = require('../models/kichwaword');

class DatabaseApi {
    constructor() {
        console.log('DatabaseApi class initialized')
    }

    async init() { }


    async saveKichwaWord(kichwaWordObject) {
        console.log("************************************");
        console.log("Request Save KichwaWord in Database Api: ");
        console.log(kichwaWordObject);
        try {
            await kichwaWordObject.create({
                spanish: kichwaWordObject.spanish,
                kichwa1: kichwaWordObject.kichwa1
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
        let idInput = id.toString()
        try {
            let query = null;

            switch (tablename) {
                case 'KichwaWord':
                    query = await KichwaWord.findOne({ where: { id: idInput } })
                    break;
              
                default:
                    query = null;
                    break;
            }
            console.log('QUERY RESULT');          

            if (query && query != null) {
                await query.update({ [property]: value })
            }
          
            return true;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async getAllKichwaWords() {
        console.log("************************************");
        console.log("Get All KichwaWords in Database Api: ");
        try {
            let kichwaWords = await kichwaWordObject.findAll({
                attributes: ['id', 'spanish','kichwa1', 'createdAt', 'updatedAt']
            });

            let finalList = [];
            kichwaWords.forEach((resultSetItem) => {
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

    async getKichwaWord(id) {
        console.log("************************************");
        console.log("Get KichwaWord in Database Api: ");
        try {
            let kichwaWord = await kichwaWord.findOne({ where: { uuid: uuid } });
            kichwaWord = kichwaWord.get({
                plain: true
            });
            console.log('kichwaWord RESULT IN DATABASE....')
            // console.log(kichwaWord)
            return kichwaWord
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}
module.exports = DatabaseApi;
