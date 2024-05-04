const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

//Spot validator

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({checkFalsy: true})
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .isFloat({min: -90, max: 90})
      .withMessage("Latitude must be within -90 and 90"),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({min: -180, max: 180})
      .withMessage("Longitude must be within -180 and 180"),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({min: 0})
        .withMessage("Price per day must be a positive number"),
    handleValidationErrors
  ];


//Create a Spot

router.post(
    '/',
    validateSpot,
    async (req, res) => {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
        } = req.body;

        const user = await Spot.create({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        return res.status(200).json(user)
      }
);

//Add Image to Spot

router.post(
    '/:spotId/Images',
    async (req, res) => {
        const { url, preview } = req.body;
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId)
        console.log('spot', spot)
        if(!spot){

            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        } else {

        const image = await SpotImage.create({
            spotId: spotId,
            url: url,
            preview: preview
        })

        res.status(200).json({
            id: image.id,
            url: image.url,
            preview: image.preview
        })
    }
    }
);

//Edit Spot
router.put(
    '/:spotId',
    validateSpot,
    async (req, res) => {

        const spotId = req.params.spotId;
        const spotCheck = await Spot.findByPk(spotId)

        if (!spotCheck){
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        } else {

        const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        } = req.body;

        await Spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        },
        { where: { id: spotId }}
        );

        const spot = await Spot.findByPk(spotId)
        return res.status(200).json(spot)
      }
    }
);





module.exports = router;
