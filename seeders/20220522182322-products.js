'use strict';
const faker = require('@faker-js/faker').faker

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Product', [{
      product_name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      image: '',
      price: 1,
      qty: 1,
      category: null,
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
    return queryInterface.bulkDelete('Product', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
