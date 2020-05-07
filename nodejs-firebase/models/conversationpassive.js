'use strict';
module.exports = (sequelize, DataTypes) => {
  const ConversationPassive = sequelize.define('ConversationPassive', {
    conversation_id: DataTypes.STRING,
    order: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {});
  ConversationPassive.associate = function(models) {
    // associations can be defined here
  };
  return ConversationPassive;
};