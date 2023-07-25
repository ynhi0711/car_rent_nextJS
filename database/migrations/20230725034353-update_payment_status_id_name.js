'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameColumn('payments', 'paymnet_status_id', 'payment_status_id')
  },

  async down(queryInterface, Sequelize) {
    queryInterface.renameColumn('payments', 'payment_status_id', 'paymnet_status_id')

  }
};
