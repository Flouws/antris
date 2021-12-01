/* eslint-disable new-cap */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('polyActiveDays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      polyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      monday: {
        type: Sequelize.INTEGER(1),
      },
      tuesday: {
        type: Sequelize.INTEGER(1),
      },
      wednesday: {
        type: Sequelize.INTEGER(1),
      },
      thursday: {
        type: Sequelize.INTEGER(1),
      },
      friday: {
        type: Sequelize.INTEGER(1),
      },
      saturday: {
        type: Sequelize.INTEGER(1),
      },
      sunday: {
        type: Sequelize.INTEGER(1),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('polyActiveDays');
  },
};
