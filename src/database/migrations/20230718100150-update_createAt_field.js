'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('user_roles', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('user_roles', 'createdAt', 'created_at');
    await queryInterface.renameColumn('favorites', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('favorites', 'createdAt', 'created_at');
    await queryInterface.renameColumn('users', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('users', 'createdAt', 'created_at');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('user_roles', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('user_roles', 'created_at', 'createdAt');
    await queryInterface.renameColumn('favorites', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('favorites', 'created_at', 'createdAt');
    await queryInterface.renameColumn('users', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('users', 'created_at', 'createdAt');
  }
};
