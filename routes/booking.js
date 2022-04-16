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

const addBooking = async function (req, res, next) {
  const newBooking = new Booking({
    startTime: req.body.date + ' ' + req.body.timestart,
    endTime: req.body.date + ' ' + req.body.timeStop,
    result_status: 0,
    approve_id: req.body.approve_id,
    user_id: req.body.user_id,
    room_id: req.body.room_id
  })
  try {
    await newBooking.save()
    res.status(201).json(newBooking)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}
router.get('/', getBookings)
router.get('/:id', getBookingid)
router.post('/addBooking', addBooking)
module.exports = router
