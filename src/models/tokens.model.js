const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Tokens = sequelize.define('tokens', {
  userId: Sequelize.STRING,
  type: Sequelize.STRING,
  expires: Sequelize.DATE,
  blacklisted: Sequelize.BOOLEAN
}, {
  tableName: 'tokens',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});

module.exports = {
  Tokens,
};
