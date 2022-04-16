const express = require('express')
const router = express.Router()
const ApproveRecipe = require('../models/approvesrecipe')
const Approve = require('../models/approve')

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
    status_approve: 0,
    current_order: 1,
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

router.get('/', getApproveRecipe)
router.get('/:id', getApproveRecipeid)
router.post('/addApproveRecipe', addApproveRecipe)

module.exports = router
