'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cars',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      order_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'order_statuses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      drop_off_date: {
        type: Sequelize.DATE
      },
      drop_off_location: {
        type: Sequelize.STRING
      },
      pick_up_date: {
        type: Sequelize.DATE
      },
      pick_up_location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('orders', ['drop_off_date'])
    await queryInterface.addIndex('orders', ['pick_up_date'])
    await queryInterface.addIndex('orders', ['drop_off_location'])
    await queryInterface.addIndex('orders', ['pick_up_location'])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};