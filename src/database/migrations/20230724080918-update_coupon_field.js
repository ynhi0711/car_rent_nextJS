'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('coupons', 'expiratation_date', 'expiration_date');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('coupons', 'expiration_date', 'expiratation_date');

  }
};
