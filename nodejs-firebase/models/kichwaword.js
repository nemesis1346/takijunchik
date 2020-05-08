'use strict';

const Sequelize = require('sequelize');

module.exports = sequelize.define('KichwaWord', {
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

});

