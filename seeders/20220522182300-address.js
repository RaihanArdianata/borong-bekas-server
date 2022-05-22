'use strict';
const faker = require('@faker-js/faker').faker

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Addresses', [{
      address: faker.address.city(),
      isActive: true,
      userID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      address: faker.address.city(),
      isActive: false,
      userID: 1,
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
    return queryInterface.bulkDelete('Addresses', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
