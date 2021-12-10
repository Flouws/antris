'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('polys', [{
      userId: 2,
      name: 'teeth',
      doctor: 'Dr. Lorem Ipsum',
      capacity: 100,
      description: 'Please Dolor Sit Amet ',
    }, {
      userId: 2,
      name: 'heart',
      doctor: 'Dr. Dolor Sit Amet',
      description: 'Today doctor is Dolor Sit Amet',
      capacity: 50,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('polys', null, {});
  },
};
