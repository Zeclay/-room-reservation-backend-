const express = require('express')
const router = express.Router()
const Booking = require('../models/booking')
const Room = require('../models/room')
const Approve = require('../models/approve')

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
  const room = Room.findById(req.body.room_id).populate({ path: 'approve_id' }).exec()
  const approveid = room.approve_id._id
  const approve = Approve.findById(approveid).populate({ path: 'order_approve' }).exec()
  const user1 = approve.order_approve[0]._id
  const user2 = approve.order_approve[1]._id
  const newBooking = new Booking({
    startTime: req.body.date + req.body.timestart,
    endTime: req.body.date + req.body.timeend,
    approveres: [{ user1, approveDate: null, status: 0 }, { user2, approveDate: null, status: 0 }],
    result_status: 0,
    order: req.body.approve_id,
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
