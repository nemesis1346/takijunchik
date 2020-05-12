'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversation', {
    description: DataTypes.TEXT
  }, {});
  Conversation.associate = function(models) {
    // associations can be defined here
  };
  return Conversation;
};