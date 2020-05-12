'use strict';
module.exports = (sequelize, DataTypes) => {
  const GrammaticRule = sequelize.define('grammaticRule', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  GrammaticRule.associate = function(models) {
    // associations can be defined here
  };
  return GrammaticRule;
};