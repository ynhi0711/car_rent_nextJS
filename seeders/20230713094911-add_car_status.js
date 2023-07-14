'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statuses', [
      { status: 'AVAILABLE', created_at: new Date(), updated_at: new Date() },
      { status: 'RENTED', created_at: new Date(), updated_at: new Date() },
      { status: 'UNAVAILABLE', created_at: new Date(), updated_at: new Date() }
    ], {});

    await queryInterface.bulkInsert('steerings', [
      { name: 'AUTO', created_at: new Date(), updated_at: new Date() },
      { name: 'MANUAL', created_at: new Date(), updated_at: new Date() },
    ], {});
    console.log('Statuses have been seeded successfully!');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statuses', null, {});
    await queryInterface.bulkDelete('steerings', null, {});
    console.log('statuses seeder has been rolled back successfully!');
  }
};
