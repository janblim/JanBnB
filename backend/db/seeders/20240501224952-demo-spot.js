'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '198 Oakridge Drive',
        city: 'Madison',
        state: 'Wisconsin',
        country: 'USA',
        lat: 34.78923,
        lng: -23.333221145,
        name: 'Cabin',
        description: 'Check out this quaint lil cabin, foo',
        price: 50,
        previewImage: 'image url'
      },
      {
        ownerId: 2,
        address: '666 Scarry Place',
        city: 'Eerie',
        state: 'Indiana',
        country: 'USA',
        lat: 67.78923,
        lng: -4.333221145,
        name: 'Haunted House',
        description: 'Stay here if you daaaaare!',
        price: 60,
        previewImage: 'image url'
      },
      {
        ownerId: 2,
        address: '45 Dusty Lane',
        city: 'Tulsa',
        state: 'Oklahoma',
        country: 'USA',
        lat: 7.72332,
        lng: -46.3245,
        name: 'Farmhouse',
        description: 'Where the wind comes sweeping round the plain',
        price: 15,
        previewImage: 'image url'
      },
      {
        ownerId: 3,
        address: '908 Easy Steet',
        city: 'Mountain View',
        state: 'Commiefornia',
        country: 'USA',
        lat: 90.72332,
        lng: -86.3245,
        name: 'Google',
        description: 'We sell YOU',
        price: 30,
        previewImage: 'image url'
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['198 Oakridge Drive', '666 Scarry Place', '45 Dusty Lane', '908 Easy Steet'] }
    }, {});
  }
};
