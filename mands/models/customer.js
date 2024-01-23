const { DataTypes } = require('sequelize');
const Joi = require('joi');
const sequelize = require('../database');

const Customer = sequelize.define('customer', {
  customerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true, // Sequelize built-in validation for email format
    },
  },
}, {
  tableName: 'customer',
  timestamps: false,
});

// Define Joi schema for validation
const customerSchema = Joi.object({
  name: Joi.string().max(255),
  email: Joi.string().email(),
});

Customer.addHook('beforeValidate', (customer, options) => {
    const { error } = customerSchema.validate(
      { name: customer.name, email: customer.email },
      { abortEarly: false }
    );
  
    if (error) {
      throw new Error(`Validation error: ${error.message}`);
    }
  });
module.exports = { Customer };
