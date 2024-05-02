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
        url: 'reviews.com/image1'
      },
      {
        reviewId: 2,
        url: 'reviews.com/image2'
      },
      {
        reviewId: 3,
        url: 'reviews.com/image3'
      },
      {
        reviewId: 4,
        url: 'reviews.com/image4'
      },
      {
        reviewId: 5,
        url: 'reviews.com/image5'
      },
      {
        reviewId: 6,
        url: 'reviews.com/image6'
      },
      {
        reviewId: 7,
        url: 'reviews.com/image7'
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
