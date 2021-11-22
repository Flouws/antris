'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'user',
    }, {
      id: 2,
      name: 'hospital',
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('roles', null, {});
  },
};
