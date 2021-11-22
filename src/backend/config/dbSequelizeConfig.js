const {dbConfig} = require('./dbConfig');

const dbSequelizeConfig = {};
dbSequelizeConfig[dbConfig.environment] = dbConfig.sequelize;

module.exports = dbSequelizeConfig;
