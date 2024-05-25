const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all bookings from current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const spotImages = await SpotImage.findAll();
        const bookings = await Booking.findAll({
            where: {'userId': user.id},
            include: [
                {model: Spot,
                attributes: {exclude: ['description', 'createdAt', 'updatedAt']}}
            ]
    })

    const newBookings = bookings.map((booking) => {

        const bookingObj = booking.toJSON();

        const previewImageData = spotImages.find((spotImage) => {
            return spotImage.spotId === bookingObj.spotId
        })

        if (previewImageData){
            bookingObj.Spot.previewImage = previewImageData.url
        } else {
            bookingObj.Spot.previewImage = null
        }

        return bookingObj
    })

        return res.status(200).json({"Bookings": newBookings})
    }
)


module.exports = router;
