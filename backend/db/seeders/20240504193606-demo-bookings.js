'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "2025-10-19",
        endDate: "2025-10-20"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2025-11-19",
        endDate: "2025-11-20"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2025-11-19",
        endDate: "2025-11-20"
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2025-11-19",
        endDate: "2025-11-20"
      },
      {
        spotId: 1,
        userId: 3,
        startDate: "2025-12-19",
        endDate: "2025-12-20"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2025-11-19",
        endDate: "2025-11-20"
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2025-11-19",
        endDate: "2025-11-20"
      },
      {
        spotId: 3,
        userId: 2,
        startDate: "2025-10-19",
        endDate: "2025-10-20"
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
