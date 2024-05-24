const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot } = require('../../db/models');

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
        const bookings = await Booking.findAll(
            {where: {'userId': user.id}},
            {include: [{
                model: Spot
            }]}
        )
        // bookings.forEach( async (booking) => {
        //     const spot = await Spot.findByPk(booking.spotId)
        //     console.log(spot)
        //     booking.Spot = spot;
        // })
        return res.status(200).json({"Bookings": bookings})
    }
)


module.exports = router;
