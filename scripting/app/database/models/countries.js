'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class countries extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  countries.init({
    country_code: DataTypes.STRING,
    country_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'countries',
  });
  return countries;
};