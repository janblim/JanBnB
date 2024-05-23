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


        // // having trouble getting preview Images to add to spot
        // const newReviews = reviews.map((review) => {

        //     let res = review

        //     console.log(res.Spot)

        //     const previewImageData = spotImages.find((spotImage) => {
        //         spotImage.spotId === review.spotId
        //     })

        //     if (previewImageData){
        //         res.Spot.previewImage = previewImageData.previewImage
        //     } else {
        //         res.Spot.previewImage = null
        //     }

        //     return res
        // })


        return res.status(200).json({"Reviews": reviews})
    }
)

//Add Image to Review

router.post(
    '/:reviewId/Images',
    requireAuth,
    async (req, res) => {
        const { url } = req.body;
        const { user } = req;
        const reviewId = req.params.reviewId;

        const review = await Review.findByPk(reviewId)
        const imageCount = await ReviewImage.count({where: {reviewId: reviewId}})

        if(review.userId !== user.id ){
            return res.status(404).json({
                message: "Review must belong to current user"
            })
        }

        if(!review){

            return res.status(404).json({
                message: "Review couldn't be found"
            })
        }
        else if(imageCount > 10){
            return res.status(403).json({
                message: "Maximum number of images for this resource was reached"
            })
        } else {

        const image = await ReviewImage.create({
            reviewId: reviewId,
            url: url
        })

        res.status(200).json({
            id: image.id,
            url: image.url
        })
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

//Edit Review

router.put(
    '/:reviewId',
    validateReview,
    requireAuth,
    async (req, res) => {


        const { reviewEdits, stars } = req.body;
        const { user } = req;
        const reviewId= req.params.reviewId;
        const review = await Review.findByPk(reviewId)

        if(review.userId !== user.id ){
            return res.status(404).json({
                message: "Review must belong to current user"
            })
        }

        if (!review){
            return res.status(404).json({
                message: "Review couldn't be found"
            })
        } else {

        await Review.update({
            reviewEdits,
            stars
        },
        { where: { id: reviewId }}
        );

        const editedReview = await Review.findByPk(reviewId)
        return res.status(200).json(editedReview)
      }
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
