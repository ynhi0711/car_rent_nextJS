'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('payments', 'payment_method_id', Sequelize.INTEGER)
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('payments', 'payment_method_id')
  }
};
