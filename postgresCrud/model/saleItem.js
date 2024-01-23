// saleItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sale = require('./sales');
const Product = require('./product');

const SaleItem = sequelize.define('saleitem', {
  sale_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

SaleItem.associate = (models) => {
  SaleItem.belongsTo(models.Sale, { foreignKey: 'sale_id' });
  SaleItem.belongsTo(models.Product, { foreignKey: 'product_id' });
};

module.exports = {SaleItem};
