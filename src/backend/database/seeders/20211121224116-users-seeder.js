/* eslint-disable max-len */
'use strict';
const bcrypt = require('bcrypt');
const {dbConfig} = require('../../config/dbConfig');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, dbConfig.ROUND_SALT);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('users', [{
      uuid: 'd4870a0a-a235-40c8-91c3-8f213a3f9dfb',
      name: 'user',
      email: 'user@email.com',
      password: hashPassword('user'),
      address: null,
      phone: '081234567890',
      description: null,
      picture: null,
      roleId: 1,
      isActive: null,
    }, {
      uuid: 'b841cebb-1e0d-4974-aba4-82f4618c714a',
      name: 'hospital',
      email: 'hospital@email.com',
      password: hashPassword('hospital'),
      address: 'Jl. Mangga, Komplek Durian, Desa Mars, Kec Venus, Kota Bumi. ',
      picture: null,
      phone: '089876543210',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      roleId: 2,
      isActive: 1,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
