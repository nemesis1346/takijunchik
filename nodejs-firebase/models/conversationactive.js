'use strict';
module.exports = (sequelize, DataTypes) => {
  const ConversationActive = sequelize.define('ConversationActive', {
    conversation_id: DataTypes.STRING,
    order: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {});
  ConversationActive.associate = function(models) {
    // associations can be defined here
  };
  return ConversationActive;
};