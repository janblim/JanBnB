'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: 'Sam',
        lastName: 'Iam',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Lady',
        lastName: 'Lovelace',
        username: 'Lady_LoveLace',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'Jack',
        lastName: 'Sprat',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'second@user.io',
        firstName: 'Kitty',
        lastName: 'Cat',
        username: 'secondaatester',
        hashedPassword: bcrypt.hashSync('secret password')
      },
      {
        email: 'oscar.wilde@user.io',
        firstName: 'Oscar',
        lastName: 'Wilde',
        username: 'Oscar_Wilde',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'doc@user.io',
        firstName: "Doc",
        lastName: 'Brown',
        username: "Doc_Brown",
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2','secondaatester'] }
    }, {});
  }
};
