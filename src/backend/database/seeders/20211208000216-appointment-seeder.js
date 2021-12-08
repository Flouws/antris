'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('appointments', [{
      polyId: 1,
      day: 1,
      timeStart: '09:00',
      timeEnd: '12:00',
    }, {
      polyId: 1,
      day: 4,
      timeStart: '09:30',
      timeEnd: '12:15',
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('appointments', null, {});
  },
};
