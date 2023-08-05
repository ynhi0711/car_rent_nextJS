'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statuses', [
      { status: 'AVAILABLE', createdAt: new Date(), updatedAt: new Date() },
      { status: 'RENTED', createdAt: new Date(), updatedAt: new Date() },
      { status: 'UNAVAILABLE', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('steerings', [
      { name: 'AUTO', createdAt: new Date(), updatedAt: new Date() },
      { name: 'MANUAL', createdAt: new Date(), updatedAt: new Date() },
    ], {});
    console.log('Statuses have been seeded successfully!');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statuses', null, {});
    await queryInterface.bulkDelete('steerings', null, {});
    console.log('statuses seeder has been rolled back successfully!');
  }
};
