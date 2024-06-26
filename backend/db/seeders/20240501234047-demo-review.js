'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'asdfasdf',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'asdgfasdfdfs ',
        stars: 4
      },
      {
        spotId: 1,
        userId: 1,
        review: 'csasdfasdfsd',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'sadfsdf',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'asd',
        stars: 2
      },
      {
        spotId: 2,
        userId: 2,
        review: 'usadfasdfasdf',
        stars: 2
      },
      {
        spotId: 2,
        userId: 1,
        review: 'gasdf',
        stars: 1
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Tddda',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'And the waving wheat, it sure smells sweet!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'They couldnt pick a better time to start in life. It aint too early and it aint too late.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Started as a farmer with a brand new wife. Soon be livin in a brand new state.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'gonna treat you great!',
        stars: 5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'I felt Googled',
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Thats what Googling means? Here I thought it meant the other thing!',
        stars: 4
      }

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
