'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'refresh_token', Sequelize.STRING);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'refresh_token');
  }
};
