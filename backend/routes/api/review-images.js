const express = require('express');
// const bcrypt = require('bcryptjs');

const { ReviewImage, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//delete review images

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res) => {

        const imageId = req.params.imageId;
        const reviewImage = await ReviewImage.findByPk(imageId);
        const { user } = req;

        if (!reviewImage){
            return res.status(404).json({
                message: "Review Image couldn't be found"
            })
        }

        const review = await Review.findByPk(reviewImage.reviewId);

        if (user.id !== review.userId){
            return res.status(404).json({
                message: "Review must belong to current user"
            })
        } else {

        await ReviewImage.destroy({
            where: { id: imageId }
        });

        return res.status(200).json({
            message: "Successfully deleted"
        })
    }
    }
);


module.exports = router;
