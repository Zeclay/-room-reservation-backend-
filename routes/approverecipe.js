const express = require('express')
const router = express.Router()
const ApproveRecipe = require('../models/approvesrecipe')
const Approve = require('../models/approve')
const Booking = require('../models/booking')
const TimeTable = require('../models/timetable')

const getApproveRecipe = async function (req, res, next) {
  try {
    const approveRecipe = await ApproveRecipe.find({}).populate().exec()
    res.status(200).json(approveRecipe)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getApproveRecipeid = async function (req, res, next) {
  const id = req.params.id
  const ObjectId = require('mongoose').Types.ObjectId
  try {
    const approveRecipe = await ApproveRecipe.find({ user_id: new ObjectId(id) }).populate({ path: 'user_id' }).populate({ path: 'booking_id', populate: { path: 'room_id user_id' } }).exec()
    if (approveRecipe === null) {
      return res.status(404).json({
        message: 'ApproveRecipe not found!!'
      })
    }
    console.log(approveRecipe)
    res.json(approveRecipe)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

const addApproveRecipe = async function (req, res, next) {
  const approve = await Approve.findById(req.body.booking.approve_id)
  const newApproveRecipe = new ApproveRecipe({
    booking_id: req.body.bookingid,
    status_approver: 0,
    current_order: 1,
    status_result: 'รอพิจารณา',
    approve_id: req.body.booking.approve_id,
    timeApprove: null,
    user_id: approve.approver1
  })
  try {
    await newApproveRecipe.save()
    res.status(201).json(newApproveRecipe)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const pass = async function (req, res, next) {
  const id = req.body._id
  try {
    const approveRecipe = await ApproveRecipe.findById(id).exec()
    const booking = await Booking.findById(approveRecipe.booking_id)
    const approve = await Approve.findById(approveRecipe.approve_id)
    approveRecipe.current_order++
    if (approveRecipe.current_order === 2) {
      approveRecipe.user_id = approve.approver2
      approveRecipe.status_approver = 1
      approveRecipe.status_result = 'รอพิจารณา'
      booking.result_status = 'รอพิจารณา'
    } else if (approveRecipe.current_order === 3) {
      approveRecipe.user_id = null
      approveRecipe.status_approver = 2
      approveRecipe.status_result = 'อนุมัติ'
      booking.result_status = 'อนุมัติ'
      const AddTimeTable = new TimeTable({
        checkIn: booking.startTime,
        checkOut: booking.endTime,
        room_id: booking.room_id,
        booking_id: booking._id
      })
      await AddTimeTable.save()
    }

    await approveRecipe.save()
    await booking.save()
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

const cancel = async function (req, res, next) {
  const id = req.body._id
  try {
    const approveRecipe = await ApproveRecipe.findById(id).exec()
    const booking = await Booking.findById(approveRecipe.booking_id)
    approveRecipe.user_id = null
    approveRecipe.status_approver = -1
    approveRecipe.status_result = 'ไม่อนุมัติ'
    booking.result_status = 'ไม่อนุมัติ'
    await approveRecipe.save()
    await booking.save()
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

router.get('/', getApproveRecipe)
router.get('/:id', getApproveRecipeid)
router.post('/addApproveRecipe', addApproveRecipe)
router.post('/pass', pass)
router.post('/cancel', cancel)

module.exports = router
