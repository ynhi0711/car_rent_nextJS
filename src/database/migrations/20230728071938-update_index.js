'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addIndex('cars', ['name', 'capacity', 'gasoline'])
  },

  async down(queryInterface, Sequelize) {
  }
};
