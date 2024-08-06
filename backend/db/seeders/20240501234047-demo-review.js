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
        userId: 2,
        review: `This is our second time at the Granny Cottage and we thoroughly enjoyed it! Lauren is so thoughtful from the creamer and coffee in the fridge waiting for us to the local recommendations. The cottage is like a peaceful garden oasis close to amenities of a city. We enjoyed the breeze through the windows and breakfast in the nook each day. We absolutely recommend this stay and will visit again!`,
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: `We had a wonderful stay! The location is beautiful, quiet, and its own little oasis. Lauren proactively reached out to check on the Wi-Fi since their house was experiencing slowness, which we really appreciated! We were out and about the majority of our trip so the quiet mornings and evenings really helped us relax when we were there.`,
        stars: 4
      },
      {
        spotId: 1,
        userId: 4,
        review: `We had a absolutely wonder-filled stay in this tiny little cottage of a place. 'Twas a lark! A veritable spree! An unmitigated success! We will surely stay here again, if fortune permits, and methinks she shall!`,
        stars: 5
      },
      {
        spotId: 1,
        userId: 5,
        review: `Civilized society feels that manners are of more importance than morals, and the highest respectability is of less value than the possession of a good chef. Even the cardinal virtues cannot atone for cold entrees, nor an irreproachable private life for a bad dinner and poor company.`,
        stars: 5
      },
      {
        spotId: 1,
        userId: 6,
        review: `To be good according to the vulgar standard of goodness is quite easy. It merely requires a certain amount of sordid terror, a certain lack of imaginative thought, and a certain low passion for middle-class respectability.`,
        stars: 3
      },
      {
        spotId: 2,
        userId: 1,
        review: `I really loved my room there. It was perfect. The place is sandwiched between the French, Quarter and Frenchmen Street, so if you're visiting and want to spend time in those two areas, it's about as convenient location as you could get, while still being out of all the madness and noise. The hosts were responsive, and the room was beautifully cleaned and appointed with more of an antique style, with access to the balcony. There is also a kitchen in the main part of the house for guests to use where you can store drinks in the fridge and make coffee in the morning, and even cook a little snacks or meals. Really great stay for the money!`,
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: `Great location and lovely older style place full of New Orleans atmosphere, but kinda creepy, like it's haunted, you know? Last night, I woke up to get myself a drink of water, and I could hear someone crying softly in the kitchen, whispering "Dear, oh dear! My bloodly tears!" Over and over. But no one was there. I couldn't sleep a wink that night.`,
        stars: 2
      },
      {
        spotId: 2,
        userId: 4,
        review: `The mansion is charming and the outdoor courtyard was a great spot to meditate, eat lunch and relax after a hectic night of Mardi Gras parades. The room was as described- comfortable. The bathroom was modern and had all the amenities of a hotel. Sharing the main spaces was fine as the kitchen stayed clean and most other guests were in and out with a friendly nod. The hosts were responsive and I'd stay again.`,
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: `Life is a mauvais quart d'heure made up of exquisite moments. The world has always laughed at its own tragedies, that being the only way in which it has been able to bear them; consequently, whatever the world has treated seriously belongs to the comedy side of things. When one has never heard a man's name in the course of one's life it speaks volumes for him; he must be quite respectable. Anybody can write a three-volume novel. It merely requires a complete ignorance of both life and literature.`,
        stars: 3
      },
      {
        spotId: 3,
        userId: 1,
        review: `The corn is as high as an elephant's eye. And it looks like it's climbing clear up to the sky. Oh, what a beautiful morning. Oh what a beautiful day. I've got a beautiful feeling everything's going my way, hey! Oh what a beautiful day. Oh, the cattle are standing like statues. Oh the cattle are standing like statues. `,
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'They couldnt pick a better time to start in life. It aint too early and it aint too late.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 4,
        review: `Started as a farmer with a brand new wife. Soon be living in a brand new state. Gonna treat your great`,
        stars: 5
      },
      {
        spotId: 4,
        userId: 1,
        review: `Two things to know! 1. The owner will constantly message you to "check in" on you. It's really weird. 2. The person messaging you Is RIGHT NEXT DOOR! Yes... They live right next door. No air-conditioning makes it hard to stay. Other than that... Great neighborhood. House was pretty nice`,
        stars: 3
      },
      {
        spotId: 4,
        userId: 2,
        review: `This place was perfectly located in Mountain View less than two blocks from anything you would need (restaurants, cafes, CVS, groceries, etc). Street parking was easy and safe. Private home, easy to get in and out, and centrally located to where I was working and San Jose. Would definitely come back!`,
        stars: 5
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
