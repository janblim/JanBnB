'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'logs.com/image1',
        preview: true
      },
      {
        spotId: 1,
        url: 'logs.com/image2',
        preview: true
      },
      {
        spotId: 2,
        url: 'scarydoor.com/image1',
        preview: true
      },
      {
        spotId: 2,
        url: 'scarydoor.com/image2',
        preview: true
      },
      {
        spotId: 3,
        url: 'farmhouse.com/image',
        preview: true
      },
      {
        spotId: 4,
        url: 'googel.com/image',
        preview: true
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
