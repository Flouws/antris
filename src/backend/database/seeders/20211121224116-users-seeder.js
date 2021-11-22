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
      roleId: 2,
      isActive: 1,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
