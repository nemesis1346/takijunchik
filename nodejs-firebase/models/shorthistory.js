'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShortHistory = sequelize.define('ShortHistory', {
    description_kichwa: DataTypes.TEXT,
    description_spanish: DataTypes.TEXT
  }, {});
  ShortHistory.associate = function(models) {
    // associations can be defined here
  };
  return ShortHistory;
};