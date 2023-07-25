'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('prices','original_price')
    queryInterface.removeColumn('prices','discount')
    queryInterface.renameColumn('prices', 'final_price','price')
  },

  async down (queryInterface, Sequelize) {
   
  }
};
