const { tokenTypes } = require('../config/tokens.config');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tokens', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM(tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD),
      allowNull: false,
    },
    expires: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: Sequelize.DATE(3),
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updated_at: {
      type: Sequelize.DATE(3),
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
  }).then(() => queryInterface.addIndex('tokens', ['id'])),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('tokens'),
};
