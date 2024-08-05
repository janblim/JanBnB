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
        lat: 14.78923,
        lng: -23.33322,
        name: `Granny Cottage`,
        description: `Featured on the National Register of Historic Places, this unique 1916 “granny cottage" stands behind our home in the gorgeous Village of Shorewood Hills. Centrally located, we are just a few walkable blocks from UW Hospital and Picnic Point, and walking/biking distance from UW, the Capitol, Hilldale Shopping Mall, Whole Foods and plenty of restaurants. Because we are in a quiet neighborhood, we have a 3 guest maximum. This is a place to retreat and relax and enjoy the best of Madison.`,
        price: 90
      },
      {
        ownerId: 2,
        address: '158 Royal Street',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'USA',
        lat: 67.78923,
        lng: -4.333221,
        name: 'French Quarter Bed and Breakfast',
        description: `Welcome to The Mansion on Royal Street, a Hospitality of New Orleans property. As you approach, you'll be greeted by majestic columns and elegant galleries, showcasing the grandeur of this Greek Revival house from the 1820s. The property embodies the rich history and opulence of old Creole Louisiana, which is evident throughout. Your room will provide a peaceful escape from the lively streets, with 14-foot ceilings and exquisite hand-crafted cypress trim. There are also three charming courtyards, surrounded by lush tropical greenery, perfect for unwinding. Despite the tranquil surroundings, you'll still be conveniently located near all the exciting action.`,
        price: 125
      },
      {
        ownerId: 2,
        address: '45 Dusty Lane',
        city: 'Tulsa',
        state: 'Oklahoma',
        country: 'USA',
        lat: 7.72332,
        lng: -46.3245,
        name: 'Farm House',
        description: `Where the wind comes sweeping 'round the plain. And the waving wheat, it sure smells sweet, when the wind comes right behind the rain! Oklahoma, every night my honey-lamb and I sit alone and talk, and watch a hawk making lazy circles in the sky. We know we belong to the land, and the land we belong to is grand. And when we say, "Ayipioeeay!" We're only saying you're doing fine, Oklahoma. Oklahoma, you're okay.`,
        price: 110
      },
      {
        ownerId: 3,
        address: '908 Easy Steet',
        city: 'Mountain View',
        state: 'California',
        country: 'USA',
        lat: 90.72332,
        lng: -86.3245,
        name: 'Techie Townie',
        description: `You couldn't get a more perfect location for this cozy, quiet, comfy, well-appointed cottage: just blocks from Mountain View's bustling downtown area centered on Castro Street, and a 5 minute walk to Caltrain and VTA. Perfect for visiting G00ogel and other local tech companies. That's right -- no separate cleaning fees, no checkout chores! On your way out, just lock the door and have a safe trip! Guests have complete and sole access to the entire one-bedroom cottage and the side yard. Other things to note: That's right -- just like a hotel, we don't charge a separate cleaning fee or expect you to do an onerous list of check-out tasks. On your way out, just lock the door, and have a safe trip!`,
        price: 150
      },
      {
        ownerId: 2,
        address: '1776 Americana Lane',
        city: 'Manchester',
        state: 'Indiana',
        country: 'USA',
        lat: 50.72332,
        lng: -56.3245,
        name: 'Old American',
        description: `Everything you need to feel right at home. The first floor master bedroom as well as a full bath provide privacy for a relaxing family get away. Three bedrooms up stairs with a spacious full bath make a perfect set up for family and friends to have privacy during your stay. A private office on the second floor is a great space for those who need to get a little work done. Central House is nestled in a quiet neighborhood with a relaxing front porch, perfect for enjoying your morning coffee. Also enjoy the cute fenced back yard, complete with patio & fire pit for outdoor enjoyment.`,
        price: 230
      },
      {
        ownerId: 2,
        address: '28 Ronan Street',
        city: 'Irnham',
        state: 'Lincolnshire',
        country: 'UK',
        lat: 60.78923,
        lng: -40.3221,
        name: 'English Cottage',
        description: `A beautiful romantic cottage with south facing patio and doors away from a lovely Pub. In a gorgeous and quiet village nested in the Irnham Valley - many pubs near by and lots to visit. King Size master bedroom and small bunk room.`,
        price: 120
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
