const { DataTypes}  = require('sequelize')
const sequelize = require('../database')

const Account = sequelize.define('Account', {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
},{
    tableName: 'account',
    timestamps: false 
  });



module.exports = Account
