'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('queues', [{
      userId: 1,
      appointmentId: 1,
      date: '2021-12-12',
      queue: 1,
      isAssurance: 1,
      queueStatusId: 1,
    }, {
      userId: 1,
      appointmentId: 1,
      date: '2021-12-12',
      queue: 2,
      queueStatusId: 1,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('queues', null, {});
  },
};
