const express = require('express');
// const bcrypt = require('bcryptjs');

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
            where: { userId: parseInt(user.id)},
            include: [
                {model: Spot,
                attributes: {exclude: ['description', 'createdAt', 'updatedAt']}}
            ]
    })
    console.log(bookings)

    const newBookings = bookings.map((booking) => {

        const bookingObj = booking.toJSON();
        console.log(bookingObj)
        const previewImageData = spotImages.find((spotImage) => {
            return spotImage.spotId === bookingObj.spotId
        })

        if (previewImageData && bookingObj.Spot){
            bookingObj.Spot.previewImage = previewImageData.url
        } else if (bookingObj) {
            bookingObj.Spot.previewImage = null
        }

        return bookingObj
    })

        return res.status(200).json({"Bookings": newBookings})
    }
)

//Edit a booking


router.put(
    '/:bookingId',
    requireAuth,

    async (req, res) => {

        const { user } = req;
        const bookingId = req.params.bookingId;
        const { startDate, endDate } = req.body;

        const booking = await Booking.findByPk(bookingId);

        if ( booking.userId !== user.id ){
            return res.status(403).json({
                "message": "Booking must belong to the current user"
            })
        }

        //checks if booking can be found

        if (!booking) {
            return res.status(404).json({
                "message": "Booking couldn't be found"
            })
        }

        //checks if booking is in the past


        if ( Date.parse(Date()) > Date.parse(booking.endDate)) {
            return res.status(403).json({
                "message": "Past bookings can't be modified"
            })
        }

        //checks if booking conflict

        const bookingConf = await Booking.findAll({
            where: {'spotId': booking.spotId}
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

        //edit booking

        await Booking.update({
            startDate,
            endDate
        },
        { where: { id: bookingId }}
        );

        const editedBooking = await Booking.findByPk(bookingId)
        return res.status(200).json(editedBooking)

    }
)


//Delete booking

router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res) => {

        const bookingId = req.params.bookingId;
        const booking = await Booking.findByPk(bookingId);
        const { user } = req;

        if (!booking){
            return res.status(404).json({
                message: "Booking couldn't be found"
            })
        }

        const spot = await Spot.findByPk(booking.spotId);

        if (user.id !== booking.userId && user.id !== spot.ownerId){
            return res.status(404).json({
                message: "Booking must belong to the current user or the Spot must belong to the current user"
            })
        } else {

        await Booking.destroy({
            where: { id: bookingId }
        });

        return res.status(200).json({
            message: "Successfully deleted"
        })
    }
    }
);



module.exports = router;
