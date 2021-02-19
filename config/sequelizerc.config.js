require('dotenv').config();
const { dbConfig } = require('./config');

module.exports = {
  development: {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.dialect
  },
  test: {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.dialect
  },
  production: {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
};
