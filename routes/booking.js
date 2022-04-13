const express = require('express')
const router = express.Router()
const Booking = require('../models/booking')

const getBookings = async function (req, res, next) {
  try {
    const bookings = await Booking.find({}).exec()
    res.status(200).json(bookings)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getBookingid = async function (req, res, next) {
  const id = req.params.id
  try {
    const booking = await Booking.findById(id).exec()
    if (booking === null) {
      return res.status(404).json({
        message: 'Booking not found!!'
      })
    }
    res.json(booking)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

router.get('/', getBookings)
router.get('/:id', getBookingid)
module.exports = router
