const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Spots

router.get(
        '/',
        async (req, res) => {
            const spots = await Spot.findAll({
                include: [
                    {model: Review},
                ]
            });

            const spotImages = await SpotImage.findAll()

            let newSpots = [];

            spots.forEach((spot) => {

                const reviewCount = spot.Reviews.length;
                let starSum = 0
                spot.Reviews.forEach((review) => {
                    starSum += review.stars
                })

                currentId = spot.id;
                const image = spotImages.find((obj) => {
                    return obj.spotId === currentId
                })

                const avgRating = starSum/reviewCount
                // const spotImage = spot.SpotImages[1]

                newSpots.push({
                    id: spot.id,
                    ownerid: spot.ownerid,
                    address: spot.address,
                    city: spot.city,
                    state: spot.state,
                    country: spot.country,
                    lat: spot.lat,
                    lng: spot.lng,
                    name: spot.name,
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: avgRating,
                    previewImage: image.url
                })
            })

            return res.status(200).json({"Spots": newSpots})
        }
)

// Get all Spots from current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const spots = await Spot.findAll({
            attributes: [
                'id',
                'ownerid',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'description',
                'price',
                'createdAt',
                'updatedAt',
                [Review.sequelize.fn('AVG', Review.sequelize.col('stars')), 'avgRating'],
                [SpotImage.sequelize.col('url'), 'preview']
            ],
            include: [
                {model: Review,
                attributes:[]},
                {model: SpotImage,
                attributes:[]}
            ],
            where: {'ownerId': user.id}
        })
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
                avgRating: avgStarRating,
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
    requireAuth,
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
    requireAuth,
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

// Get Reviews by a Spot's id

router.get(
    '/:spotId/reviews',
    async (req, res) => {
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId)

        if(!spot){
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        } else {

        const reviews = await Review.findAll(
            {where: {'spotId': spotId}}
        )
        return res.status(200).json({"Reviews": reviews})
        }
    }
);

//validate Review

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check('stars')
        .isInt({min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];

// Create a Review based on a Spot's id
router.post(
    '/:spotId/reviews',
    validateReview,
    requireAuth,
    async (req, res) => {

    const { review, stars } = req.body;
    const spotId = parseInt(req.params.spotId);
    const userId = req.user.id;
    const spotCheck = await Spot.findByPk(spotId);
    const userCheck = await Review.findAll({
        where: { userId: userId}
    })

    if(!spotCheck){
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    } else if (userCheck){
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    } else {

    const newReview = await Review.create({
        userId: userId,
        spotId: spotId,
        review,
        stars });

    return res.status(201).json(newReview)

    }
}
);

// Get all bookings for a spot --not finished
router.get(
    '/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const bookings = await Booking.findAll(
            {where: {'spotId': user.id}}
        )

        return res.status(200).json({"Bookings": bookings})
    }
)

//Create a booking based on spotid -- not finished

router.post(
    '/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const { startDate, endDate } = req.body;

    }
)

module.exports = router;
