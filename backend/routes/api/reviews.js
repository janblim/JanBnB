const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, Spot, User, ReviewImage, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all Reviews from current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;

        const spotImages = await SpotImage.findAll();
        const reviews = await Review.findAll({
            where: {'userId': user.id},
            include: [
                {model: User,
                attributes: ['id', 'firstName', 'lastName']},

                {model: Spot,
                attributes: { exclude: ['description', 'createdAt', 'updatedAt']}},

                {model: ReviewImage,
                attributes: ['id', 'url']}
            ]
        })

        //add previewImages to Spot object within Review

        const newReviews = reviews.map((review) => {

            const reviewObj = review.toJSON();

            reviewObj.Spot.lat = parseFloat(reviewObj.Spot.lat);
            reviewObj.Spot.lng = parseFloat(reviewObj.Spot.lng);
            reviewObj.Spot.price = parseFloat(reviewObj.Spot.price);

            const previewImageData = spotImages.find((spotImage) => {
                return spotImage.spotId === review.spotId
            })

            if (previewImageData){
                reviewObj.Spot.previewImage = previewImageData.url
            }

            return reviewObj
        })

        return res.status(200).json({"Reviews": newReviews})

    }
)

//Add Image to Review

router.post(
    '/:reviewId/images',
    requireAuth,
    async (req, res) => {
        const { url } = req.body;
        const { user } = req;
        const reviewId = req.params.reviewId;

        const review = await Review.findByPk(parseInt(reviewId))
        const imageCount = await ReviewImage.count({where: {reviewId: reviewId}})

        if(!review){
            return res.status(404).json({
                message: "Review couldn't be found"
            })
        }

        if(review.userId !== user.id ){
            return res.status(404).json({
                message: "Review must belong to current user"
            })
        }

        if(imageCount > 10){
            return res.status(403).json({
                message: "Maximum number of images for this resource was reached"
            })
        }

        const image = await ReviewImage.create({
            reviewId: reviewId,
            url: url
        })

        res.status(201).json({
            id: parseInt(image.id),
            url: image.url
        })

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

//Edit Review

router.put(
    '/:reviewId',
    requireAuth,
    validateReview,
    async (req, res) => {


        const { review, stars } = req.body;
        const { user } = req;
        const reviewId= req.params.reviewId;
        const reviewCheck = await Review.findByPk(reviewId)

        if (!reviewCheck){
            return res.status(404).json({
                message: "Review couldn't be found"
            })
        }

        if(parseInt(reviewCheck.userId) !== parseInt(user.id)){
            return res.status(404).json({
                message: "Review must belong to current user"
            })
        }

        await Review.update({
            review,
            stars
        },
        { where: { id: reviewId }}
        )

        const editedReview = await Review.findByPk(reviewId)
        return res.status(200).json(editedReview)
}
);

//Delete Review

router.delete(
    '/:reviewId',
    requireAuth,
    async (req, res) => {

        const { user } = req;
        const reviewId = req.params.reviewId;
        const review = await Review.findByPk(reviewId);

        if (!review){
            return res.status(404).json({
                message: "Review couldn't be found"
            })
        } else if (review.userId !== user.id) {
            return res.status(404).json({
                message: "Review must belong to current user"
            })
        } else {

        await Review.destroy({
            where: { id: reviewId }
        });

        return res.status(200).json({
            message: "Successfully deleted"
        })
    }
    }
);

module.exports = router;
