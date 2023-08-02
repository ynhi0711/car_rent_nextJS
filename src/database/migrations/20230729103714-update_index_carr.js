'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addIndex('cars', ['name'])
    queryInterface.addIndex('cars', ['capacity'])
    queryInterface.addIndex('cars', ['gasoline'])
  },

  async down (queryInterface, Sequelize) {
    
  }
};
