'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('queueStatuses', [{
      id: -1,
      name: 'Rejected',
    }, {
      id: 0,
      name: 'Waiting for verification',
    }, {
      id: 1,
      name: 'In queue',
    }, {
      id: 2,
      name: 'In progress',
    }, {
      id: 100,
      name: 'Finished',
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('queueStatuses', null, {});
  },
};
