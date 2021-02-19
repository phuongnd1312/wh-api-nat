const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_DIALECT: Joi.string().required().description('DB Dialect'),
    DB_HOST: Joi.string().required().description('DB Host'),
    DB_PORT: Joi.string().required().description('DB Post'),
    DB_NAME: Joi.string().required().description('DB Name'),
    DB_USERNAME: Joi.string().required().description('DB UserName'),
    DB_PASSWORD: Joi.string().required().description('DB Password'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  dbConfig: {
    dialect: envVars.DB_DIALECT, // 'mysql',
    host: envVars.DB_HOST, // 'localhost',
    port: envVars.DB_PORT, // 3306,
    database: envVars.DB_NAME, // 'ei',
    username: envVars.DB_USERNAME, // 'root',
    password: envVars.DB_PASSWORD// '123456',
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  }
};
