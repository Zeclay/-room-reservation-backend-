const express = require('express')
const router = express.Router()
const Booking = require('../models/booking')

const getBookings = async function (req, res, next) {
  try {
    const bookings = await Booking.find({}).populate({ path: 'approve_id' }).populate({ path: 'user_id' }).populate({ path: 'room_id' }).exec()
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
    const booking = await Booking.find({ user_id: id }).exec()
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
    start: req.body.timestart,
    end: req.body.timeStop,
    date: req.body.date,
    result_status: 'รอพิจารณา',
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

const getBookingByUserId = async function (req, res, next) {
  const id = req.params.id
  const ObjectId = require('mongoose').Types.ObjectId
  try {
    const booking = await Booking.find({ user_id: new ObjectId(id) }).populate({
      path: 'user_id'
    }).populate({ path: 'room_id', populate: { path: 'building_id' } }).exec()
    res.status(200).json(booking)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}
router.get('/', getBookings)
router.get('/:id', getBookingid)
router.post('/addBooking', addBooking)
router.get('/getbookbyuser/:id', getBookingByUserId)

module.exports = router
