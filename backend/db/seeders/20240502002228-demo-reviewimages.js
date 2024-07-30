'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg'
      },
      {
        reviewId: 3,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg'
      },
      {
        reviewId: 4,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg'
      },
      {
        reviewId: 5,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg'
      },
      {
        reviewId: 6,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg'
      },
      {
        reviewId: 7,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};
