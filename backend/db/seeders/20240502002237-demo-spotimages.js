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
        url: 'https://www.bhg.com/thmb/FcKK-L23QiqiDVjrjLgfa1uFZU8=/4000x0/filters:no_upscale():strip_icc()/101495134_preview-b192d3b7d4b04188a014754b9ffa6f79.jpg',
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
