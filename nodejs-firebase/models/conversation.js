'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    description: DataTypes.TEXT
  }, {});
  Conversation.associate = function(models) {
    // associations can be defined here
  };
  return Conversation;
};