const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('./database');
const { Customer } = require('./models/customer'); // Adjust the path accordingly
const seedData = require('./seeders/customers'); // Adjust the path accordingly

const app = express();

const createUser = async (userData) => {
    try {
      // Validate input using Joi schema
      const customer = await Customer.create(userData);
  
      console.log('User created:', customer.toJSON());
    } catch (error) {
      console.error('Validation or database error:', error.message);
    }
  };

const startApplication = async () => {
  try {
    const customerCount = await Customer.count();

    if (customerCount === 0) {
      // If the 'customer' table is empty, run the seed operation
      await seedData.up(sequelize.getQueryInterface(), Sequelize);
      console.log('Seed data added successfully.');
    }

    // Start your Express application
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error initializing application:', error);
  }
};

// Call the function to start the application
startApplication();
const userData = {
    name: 'John Doe',
    email: 'sudaisali@gmail.com',
  };
  
  createUser(userData);