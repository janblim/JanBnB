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
        url: 'https://a0.muscache.com/im/pictures/a8224a72-5fd9-4b3b-82d7-50e5336299bf.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/1d8d821e-42be-4de2-a654-cfa948f79da6.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/dae2122e-4031-4e86-9673-539ce6e55ab5.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/9c09b5a7-e211-450a-bbe2-f0ec52e36581.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/d7caaf1f-16e1-4efe-844b-711cdb723251.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3100596/original/3e5a21d9-76c3-432a-84d0-648fc5c82493.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3100596/original/2618fcb6-5fcc-4660-8676-35f00149edd9.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/106457104/6dcbbf0c_original.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1075572198975770276/original/b3cc51c1-1b0e-406c-8f69-fecdf28c1a64.jpeg',
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
