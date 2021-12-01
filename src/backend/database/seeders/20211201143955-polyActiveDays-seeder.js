'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('polyActiveDays', [{
      polyId: 1,
      monday: 1,
      tuesday: 0,
      wednesday: 0,
      thursday: 1,
      friday: 0,
      saturday: 0,
      sunday: 0,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('polyActiveDays', null, {});
  },
};
