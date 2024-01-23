const Sequelize = require('sequelize')

const sequelize = new Sequelize('POS', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = sequelize