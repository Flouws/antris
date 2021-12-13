'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('queues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      appointmentId: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      queue: {
        type: Sequelize.INTEGER,
      },
      picture1: {
        type: Sequelize.STRING,
      },
      picture2: {
        type: Sequelize.STRING,
      },
      picture3: {
        type: Sequelize.STRING,
      },
      picture4: {
        type: Sequelize.STRING,
      },
      picture5: {
        type: Sequelize.STRING,
      },
      queueStatusId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('queues');
  },
};
