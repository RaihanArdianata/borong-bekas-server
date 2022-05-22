'use strict';
const faker = require('@faker-js/faker').faker

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Address', [{
      address: faker.address.city(),
      isActive: false,
      userID: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      address: faker.address.city(),
      isActive: false,
      userID: 2,
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
    return queryInterface.bulkDelete('Address', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
