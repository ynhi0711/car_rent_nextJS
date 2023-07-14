'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('types', [
      { name: 'Sport', created_at: new Date(), updated_at: new Date() },
      { name: 'Normal', created_at: new Date(), updated_at: new Date() },
      { name: 'Luxury', created_at: new Date(), updated_at: new Date() }
    ], {});
    console.log('Types have been seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
    console.log('Types seeder has been rolled back successfully!');
  }
};
