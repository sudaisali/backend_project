'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed data to the 'customer' table
    await queryInterface.bulkInsert('customer', [
      {
        name: 'John Doe',
        email: 'johnxample.com',
      }
      // Add more seed data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seed data from the 'customer' table
    await queryInterface.bulkDelete('customer', null, {});
  },
};
