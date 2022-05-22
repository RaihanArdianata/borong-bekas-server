'use strict';
const faker = require('@faker-js/faker').faker
const { encodePassword } = require('../helper/bcyript.js')

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      nama: faker.name.firstName(),
      role: 1,
      email: 'customer@mail.com',
      password: encodePassword('123'),
      no_tel: faker.phone.phoneNumber(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nama: faker.name.firstName(),
      role: 2,
      email: 'seller@mail.com',
      password: encodePassword('123'),
      no_tel: faker.phone.phoneNumber(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
