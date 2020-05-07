const Sequelize = require('sequelize');
// require('dotenv').config({ path: '../.env.development' })
require('dotenv').config({ path: '../.env.production' }) // for other environments

//Maybe options are not doing anything
var opts = {
    define: {
        freezeTableName: true
    }
}
//TODO: USE CORRECT ENV
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_ENGINE
},opts);

module.exports = sequelize;

global.sequelize=sequelize;