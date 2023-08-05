'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      gasoline: {
        type: Sequelize.INTEGER
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'types',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      steering_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'steerings',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'statuses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    queryInterface.addIndex('cars', ['name'])
    queryInterface.addIndex('cars', ['capacity'])
    queryInterface.addIndex('cars', ['gasoline'])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  }
};