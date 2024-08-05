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
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/granexterior.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/grankitchen.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/granlivingroom.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/grannybed.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/gransign.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/hauntedexterior.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/hauntedliving.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/hauntedbed.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/hauntedpatio.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/hauntedbath.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/farmexterior.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/farmbed.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/farmkitcken.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/farmstairs.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/farmview.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/techieexterior.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/techiedining.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/techieliving.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/techiebed.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/techiebath.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/americaexterior.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/americanabed.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/americanadining.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/americanaliving.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/americanapatio.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/engexterior.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/engbed.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/engkitchen.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/engliving.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://janbnb.s3.us-east-2.amazonaws.com/engpatio.jpg',
        preview: false
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
