'use strict';
const faker = require('@faker-js/faker').faker

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DeliveryServices', [{
      expedition_name: 'JNE',
      price: 50000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      expedition_name: 'GO-Send',
      price: 100000,
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

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DeliveryServices', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
