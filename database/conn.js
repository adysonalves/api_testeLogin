const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.PORT_DB,
    dialect: process.env.DIALECT,
    timezone: process.env.DB_TIMEZONE
});

module.exports = sequelize;