const { DataTypes}  = require('sequelize')
const sequelize = require('../database')
const {Customer} = require('./customer')

const Sale = sequelize.define('Sale', {
    sale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // customerId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: Customer,
    //       key: 'customerId',
    //     },
    //     allowNull: false,
    //   },
    
}
, {
    tableName: 'sale',
    timestamps: false 
  });

  // Sale.associate = (models)=>{
  //   Sale.belongsTo(models.Customer , {
  //       foreignKey:'customerId',
  //   })
  // }
  // Sale.belongsTo(Customer , {
  //   foreignKey:'customerId'
  // })


module.exports = {Sale}