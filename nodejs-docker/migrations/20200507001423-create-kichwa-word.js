'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('kichwawords', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      spanish: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      kichwa1: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      kichwa2: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      kichwa3: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      description:Sequelize.TEXT(),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('kichwawords');
  }
};