'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('order_statuses', [
      {
        status: 'Booked',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Picked',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Returned',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    await queryInterface.bulkInsert(
      'payment_statuses',
      [
        {
          status: 'Pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: 'Paid',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: 'Failed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert('coupon_types', [
      {
        type: 'Percentage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Fixed Amount',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    await queryInterface.bulkInsert('coupons', [
      {
        code: 'COUPON1',
        coupon_type_id: 1,
        discount_value: 20,
        expiration_date: new Date(2024, 7, 24),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'COUPON2',
        coupon_type_id: 1,
        discount_value: 10,
        expiration_date: new Date(2024, 7, 24),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'COUPON3',
        coupon_type_id: 2,
        discount_value: 30,
        expiration_date: new Date(2024, 7, 24),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert(
      'payment_methods',
      [
        {
          name: 'Cash',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Credit Card',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {},
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_statuses', null, {});
    await queryInterface.bulkDelete('payment_statuses', null, {});
    await queryInterface.bulkDelete('coupon_types', null, {});
    await queryInterface.bulkDelete('coupons', null, {});
    await queryInterface.bulkDelete('payment_methods', null, {});
  }
};
