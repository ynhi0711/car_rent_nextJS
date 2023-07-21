'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_roles', [
      { role: 'USER', created_at: new Date(), updated_at: new Date() },
      { role: 'ADMIN', created_at: new Date(), updated_at: new Date() },
    ], {});
    console.log('roles have been seeded successfully!');

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
    console.log('roles seeder has been rolled back successfully!');
  }
};
