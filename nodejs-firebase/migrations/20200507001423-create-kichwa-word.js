'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KichwaWords', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      kichwa1: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique:true
      },
      kichwa2: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique:true
      },
      kichwa3: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique:true
      },
      description:Sequelize.TEXT(),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('KichwaWords');
  }
};