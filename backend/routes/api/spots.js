const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//validator

// const validateSpot = [
//     check('email')
//       .exists({ checkFalsy: true })
//       .isEmail()
//       .withMessage('Please provide a valid email.'),
//     check('username')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 4 })
//       .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//       .not()
//       .isEmail()
//       .withMessage('Username cannot be an email.'),
//     check('password')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 6 })
//       .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
//   ];

// Get all Spots

router.get(
        '/',
        async (req, res) => {
            const spots = await Spot.findAll()
            return res.status(200).json({"Spots": spots})
        }
)

// Get all Spots from current user
router.get(
    '/current',
    async (req, res) => {
        const { user } = req;
        const spots = await Spot.findAll(
            {where: {'ownerId': user.id}}
        )
        return res.status(200).json({"Spots": spots})
    }
)

// Get details of a Spot from an id

router.get(
    '/:spotId',
    async (req, res) => {
        const id = req.params.spotId;

        const spot = await Spot.findByPk(id)

          if(!spot){
            return res.status(404).json({
              "message": "Spot couldn't be found"
            });
          } else {

            const numReviews = await Review.count({where:{spotId:id}});

            const sumRatings = await Review.sum('stars', {where:{spotId:id}});
            const avgStarRating = sumRatings/numReviews;

            const spotImages = await SpotImage.findAll({
                where: {spotId:id}
            })


            const spotData = {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                numReviews: numReviews,
                avgStarRating: avgStarRating,
                SpotImages: spotImages
            }
            return res.status(200).json(spotData)
          }
    }
)



// Add Spot
// router.post(
//     '/',
//     validateSpot,
//     async (req, res) => {
//       const { email, password, firstName, lastName, username } = req.body;
//       const hashedPassword = bcrypt.hashSync(password);

//       const nameCheck = await User.findOne({
//         where: { username: username }
//       });

//       const emailCheck = await User.findOne({
//         where: { email: email }
//       })

//       if( emailCheck !== null ){
//         return res.status(500).json({
//           "message": "User already exists",
//           errors:{
//             "email": "User with that email already exists"
//           }
//         });
//       } else if (nameCheck !== null) {
//         return res.status(500).json({
//         "message": "User already exists",
//         errors: {
//           "username": "User with that username already exists"
//         }
//       });

//     } else {

//         const user = await User.create({ username, firstName, lastName, email, hashedPassword });

//         const safeUser = {
//           id: user.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           username: user.username,
//         };

//         await setTokenCookie(res, safeUser);

//         return res.json({
//           user: safeUser
//         })

//       }
//     }
// );


module.exports = router;