'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('types', [
      { name: 'Sport', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Normal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Luxury', createdAt: new Date(), updatedAt: new Date() }
    ], {});
    console.log('Types have been seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
    console.log('Types seeder has been rolled back successfully!');
  }
};
