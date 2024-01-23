const {DataTypes} = require('sequelize')
const sequelize = require('../database')
const {Sale} = require('./sales')

const Customer = sequelize.define('Customer',{
    customerId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type : DataTypes.STRING(255),
        allowNull :true,
    },
    email:{
        type : DataTypes.STRING(255),
        allowNull :true,
    }

},{
    tableName : 'customer',
    timestamps:false
})

// Customer.hasMany(Sale)
// Customer.associate = (models)=>{
//     Customer.hasMany(models.Sale)
// }
module.exports = {Customer}