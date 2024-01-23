'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      companies.belongsTo(models.sectors,{
        foreignKey: 'sectorId',
        onDelete: 'CASCADE',
      })
      companies.hasMany(models.billionaries,{
        foreignKey: 'companyId',
        onDelete: 'CASCADE',
      })
    }
  }
  companies.init({
    company_name: DataTypes.STRING,
    company_founded: DataTypes.INTEGER,
    company_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'companies',
  });
  return companies;
};