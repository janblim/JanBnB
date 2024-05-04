const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Reviews from current user
router.get(
    '/current',
    async (req, res) => {
        const { user } = req;
        const reviews = await Review.findAll(
            {where: {'userId': user.id}}
        )
        return res.status(200).json({"Reviews": reviews})
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

//Delete Spot

router.delete(
    '/:spotId',
    async (req, res) => {

        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);

        if (!spot){
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        } else {

        await Spot.destroy({
            where: { id: spotId }
        });

        return res.status(200).json({
            message: "Successfully deleted"
        })
    }
    }
);

module.exports = router;
