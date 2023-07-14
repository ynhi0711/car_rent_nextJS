'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('images', 'car_id', {
      type: Sequelize.INTEGER, // Specify the new data type for the field
      allowNull: false, // Set to false if the field should not allow NULL values
    });
    await queryInterface.changeColumn('images', 'url', {
      type: Sequelize.STRING, // Specify the new data type for the field
      allowNull: false, // Set to false if the field should not allow NULL values
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('images', 'car_id', {
      type: Sequelize.INTEGER, // Specify the previous data type for the field
      allowNull: true, // Set to false if the field should not allow NULL values
    });
    await queryInterface.changeColumn('images', 'url', {
      type: Sequelize.STRING, // Specify the new data type for the field
      allowNull: true, // Set to false if the field should not allow NULL values
    });
  }
};
