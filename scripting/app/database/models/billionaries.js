'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class billionaries extends Model {
    
    static associate(models) {
     billionaries.belongsTo(models.companies,{
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
     })
    }
  }
  billionaries.init({
    person_name: DataTypes.STRING,
    person_company_relation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'billionaries',
  });
  return billionaries;
};