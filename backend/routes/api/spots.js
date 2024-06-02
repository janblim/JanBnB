const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, ReviewImage, User, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")

const router = express.Router();

// Get all Spots

const validateSpotQuery = [
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

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

router.get(
        '/',
        async (req, res) => {

            //get query params

            let query = {
                where: {},
                include: [{model: Review}]
            };

            let error = {
                "message": "Bad Request",
                "errors":{}
            }

            const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
            const size = req.query.size === undefined ? 20 : parseInt(req.query.size);

            if (page >= 1 && size >= 1 && size <=20) {
                query.limit = size;
                query.offset = size * (page - 1);
            }
            if (page < 1){
                error.errors.page = "Page must be greater than or equal to 1"
            }
            if (size < 1 || size > 20){
                error.errors.size = "Size must be between 1 and 20"
            }

            if (req.query.minLat !== undefined) {
                if (isNumeric(req.query.minLat)){
                    query.where.lat = {[Op.gte]: req.query.minLat};
                }else{
                    error.errors.minLat = "Minimum latitude is invalid"
                }
            }

            if (req.query.maxLat !== undefined) {
                if (isNumeric(req.query.maxLat)){
                    query.where.lat = {[Op.lte]: req.query.maxLat};
                }else{
                    error.errors.maxLat = "Maximum latitude is invalid"
                }
            }

            if (req.query.minLng !== undefined) {
                if (isNumeric(req.query.minLng)){
                    query.where.lng = {[Op.gte]: req.query.minLng};
                }else{
                    error.errors.minLng = "Minimum longitude is invalid"
                }

            }

            if (req.query.maxLng !== undefined) {
                if (isNumeric(req.query.maxLng)){
                    query.where.lng = {[Op.gte]: req.query.maxLng};
                }else{
                    error.errors.maxLng = "Maximum longitude is invalid"
                }

            }

            if (req.query.minPrice !== undefined) {
                if(req.query.minPrice >= 0){
                    query.where.price = {[Op.gte]: req.query.minPrice};
                }else{
                    error.errors.minPrice = "Minimum price must be greater than or queal to 0"
                }
            }

            if (req.query.maxPrice !== undefined) {
                if(req.query.maxPrice >= 0){
                    query.where.price = {[Op.lte]: req.query.maxPrice};
                }else{
                    error.errors.maxPrice = "Maximum price must be greater than or equal to 0"
                }
            }

            //run the query
            const spots = await Spot.findAll(query);

            const spotImages = await SpotImage.findAll()

            let newSpots = [];

            spots.forEach((spot) => {

                const reviewCount = spot.Reviews.length;
                let starSum = 0
                spot.Reviews.forEach((review) => {
                    starSum += review.stars
                })

                currentId = spot.id;
                let image = {url: 'no image found'}
                imageObj = spotImages.find((obj) => {
                    return obj.spotId === currentId
                })
                if (imageObj !== undefined) {
                    image = imageObj
                }

                const avgRating = starSum/reviewCount;

                newSpots.push({
                    id: spot.id,
                    ownerId: spot.ownerId,
                    address: spot.address,
                    city: spot.city,
                    state: spot.state,
                    country: spot.country,
                    lat: parseFloat(spot.lat),
                    lng: parseFloat(spot.lng),
                    name: spot.name,
                    description: spot.description,
                    price: parseFloat(spot.price),
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: avgRating,
                    previewImage: image.url
                })
            })

            if(Object.keys(error.errors).length !== 0){
                return res.status(400).json(error)
            }

            return res.status(200).json({
                "Spots": newSpots,
            "page": page,
            "size": size
            })
        }
)

// Get all Spots from current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {

        const { user } = req;

        const spots = await Spot.findAll({
            include: [
                {model: Review},
            ],
            where: {'ownerId': parseInt(user.id)}
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

            const imageUrl = image ? image.url : null

            const avgRating = starSum/reviewCount;

            newSpots.push({
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: parseFloat(spot.lat),
                lng: parseFloat(spot.lng),
                name: spot.name,
                description: spot.description,
                price: parseFloat(spot.price),
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating: avgRating,
                previewImage: imageUrl
            })
        })



        return res.status(200).json({"Spots": newSpots})
    }
)

// Get details of a Spot from an id

router.get(
    '/:spotId',
    async (req, res) => {
        const id = parseInt(req.params.spotId);

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
                where: {spotId:id},
                attributes: ["id", "url", "preview"]
            })

            const owner = await User.findByPk(spot.ownerId)


            const spotData = {
                id: spot.id,
                ownerId: parseInt(spot.ownerId),
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: parseFloat(spot.lat),
                lng: parseFloat(spot.lng),
                name: spot.name,
                description: spot.description,
                price: parseFloat(spot.price),
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                numReviews: numReviews,
                avgStarRating: avgStarRating,
                SpotImages: spotImages,
                Owner: {
                    id: owner.id,
                    firstName: owner.firstName,
                    lastName: owner.lastName
                }
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
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({min: -180, max: 180})
      .withMessage("Longitude is not valid"),
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
        .withMessage("Price per day is required"),
    handleValidationErrors
  ];


//Create a Spot

router.post(
    '/',
    requireAuth,
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

        const { user } = req

        const spot = await Spot.create({

                ownerId: parseInt(user.id),
                address,
                city,
                state,
                country,
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                name,
                description,
                price: parseFloat(price),
            },
        );

        const output = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            name: spot.name,
            description: spot.description,
            price: parseFloat(price),
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
        }

        return res.status(201).json(output)
      }
);

//Add Image to Spot

router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res) => {
        const { url, preview } = req.body;
        const spotId = req.params.spotId;
        const { user } = req

        const spot = await Spot.findByPk(spotId)
        const imageCount = await SpotImage.count({
            where: { spotId: spotId}
        })

        if(!spot){

            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        }

        if(parseInt(spot.ownerId) !== parseInt(user.id)){
            return res.status(404).json({
                message: "Spot must belong to the current user"
            })
        }

        if(imageCount > 10){
            return res.status(403).json({
                message: "Maximum number of images for this resource was reached"
            })
        }

        const image = await SpotImage.create({
            spotId: spotId,
            url: url,
            preview: preview
        })

        res.status(201).json({
            id: image.id,
            url: image.url,
            preview: image.preview
        })
    }
);

//Edit Spot

router.put(
    '/:spotId',
    validateSpot,
    requireAuth,
    async (req, res) => {

        const spotId = req.params.spotId;
        const { user } = req;
        const spotCheck = await Spot.findByPk(parseInt(spotId))

        if (user.id !== spotCheck.ownerId){
            return res.status(404).json({
                message: "Spot must belong to the current user"
            })
        }

        if (!spotCheck){
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        }

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
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            name,
            description,
            price: parseFloat(price)
        },
        { where: { id: spotId }}
        );

        const spot = await Spot.findByPk(spotId)

        console.log(typeof spot.lat)
        const output = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: parseFloat(spot.lat),
            lng: parseFloat(spot.lng),
            name: spot.name,
            description: spot.description,
            price: parseFloat(spot.price),
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
        }


        return res.status(200).json(output)
      }
);

//Delete Spot

router.delete(
    '/:spotId',
    requireAuth,
    async (req, res) => {

        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        const { user } = req;

        if (!spot){
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        } else if (user.id !== spot.ownerId){
            return res.status(404).json({
                message: "Spot must belong to the current user"
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
    requireAuth,
    async (req, res) => {
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId)

        if(!spot){
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        } else {

        const reviews = await Review.findAll({
            where: {'spotId': spotId},
            include: [
                {model: User,
                attributes: ['id', 'firstName', 'lastName']},
                {model: ReviewImage,
                attributes: ['id', 'url']}
            ]
        })

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
    requireAuth,
    async (req, res) => {

    const { review, stars } = req.body;
    const spotId = parseInt(req.params.spotId);
    const { user } = req;
    const userId = user.id;
    const spotCheck = await Spot.findByPk(spotId);
    const reviewCheck = await Review.findAll({
        where: {
            userId: userId,
            spotId: spotId
        }

    })

    if(!spotCheck){
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (reviewCheck[0]){
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        userId: userId,
        spotId: spotId,
        review,
        stars });

    return res.status(201).json(newReview)


}
);

// Get all bookings for a spot
router.get(
    '/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const spotId = req.params.spotId;

        const bookings = await Booking.findAll(
            {where: {'spotId': spotId}}
        )

        console.log(bookings)

        if (!bookings || bookings.length === 0){
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        }

        const users = await User.findAll()

        let resBookings = []
        let bookingObj = {}
        bookings.forEach((booking) => {

            console.log(booking.startDate)
            if(user.id === booking.userId){
                bookingObj = {
                    spotId: parseInt(spotId),
                    startDate: booking.startDate,
                    endDate: booking.endDate
                }
            } else {

                const userBooking = users.find((user) => {
                    return user.id === booking.userId
                })

                bookingObj = {
                    User: {
                        id: booking.userId,
                        firstName: userBooking.firstName,
                        lastName: userBooking.lastName
                    },
                    id: booking.id,
                    spotId: parseInt(spotId),
                    userId: user.id,
                    startDate: booking.startDate,
                    endDate: booking.endDate,
                    createdAt: booking.createdAt,
                    updatedAt: booking.updatedAt
                }
            }
            resBookings.push(bookingObj)
        })




        return res.status(200).json({"Bookings": resBookings})
    }
)

//Create a booking based on spotid


router.post(
    '/:spotId/bookings',
    requireAuth,

    async (req, res) => {

        const spotId = req.params.spotId;
        const { user } = req;
        const { startDate, endDate } = req.body;

        //checks if spot exists
        const spotCheck = await Spot.findAll({
            where: {'id': spotId}
        })

        if(!spotCheck || spotCheck.length === 0){
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }

        if(spotCheck.ownerId === user.id){
            return res.status(403).json({
                "message": "Spot must not belong to the current user"
            })
        }

        //checks if booking conflict

        const bookingConf = await Booking.findAll({
            where: {'spotId': spotId}
        })

        let error = {
            "message": "Sorry, this spot is already booked for the specified dates",
            "errors": {}
        }

        bookingConf.forEach((booking) => {
            const bookingObj = booking.toJSON();

            if(startDate >= bookingObj.startDate && startDate < bookingObj.endDate){
                error.errors.startDate = "Start date conflicts with an existing booking"
            }
            if(endDate > bookingObj.startDate && endDate <= bookingObj.endDate){
                error.errors.endDate = "End date conflicts with an existing booking"
            }

            //only returns error if either of the ifs above add their error with key in errors

            if( Object.keys(error.errors).length !== 0 ){
                return res.status(403).json({error})
            }

        })

        //creates booking

        const booking = await Booking.create({
            spotId: spotId,
            userId: user.id,
            startDate: startDate,
            endDate: endDate
        })


        return res.status(200).json({booking})
    }
)

module.exports = router;
