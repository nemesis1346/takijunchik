'use strict';

const Sequelize = require('sequelize');
console.log('GETTING INTO MODEL')

module.exports = sequelize.define('kichwaword', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    spanish: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    kichwa1: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    kichwa2: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    kichwa3: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    description: Sequelize.TEXT(),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

  }, {});




// 'use strict';
// const Sequelize = require('sequelize');

// module.exports = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER(11),
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   username: {
//     type: Sequelize.STRING(300),
//     allowNull: false,
//     unique: true
//   },
//   email: {
//     type: Sequelize.STRING(300),
//     allowNull: false
//   },
//   createdAt: Sequelize.DATE,
//   updatedAt: Sequelize.DATE,
  
// }, {});