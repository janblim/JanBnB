const express = require('express');
// const bcrypt = require('bcryptjs');

const { SpotImage, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Delete Spot images

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res) => {

        const imageId = req.params.imageId;
        const spotImage = await SpotImage.findByPk(imageId);
        const { user } = req;

        if (!spotImage){
            return res.status(404).json({
                message: "Spot Image couldn't be found"
            })
        }

        const spot = await Spot.findByPk(spotImage.spotId);

        if (user.id !== spot.ownerId){
            return res.status(404).json({
                message: "Spot must belong to current user"
            })
        } else {

        await SpotImage.destroy({
            where: { id: imageId }
        });

        return res.status(200).json({
            message: "Successfully deleted"
        })
    }
    }
);


module.exports = router;
