const express = require('express')
const router = express.Router()
const ApproveRecipe = require('../models/approvesrecipe')

const getApproveRecipe = async function (req, res, next) {
  try {
    const approveRecipe = await ApproveRecipe.find({}).exec()
    res.status(200).json(approveRecipe)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getApproveRecipeid = async function (req, res, next) {
  const id = req.params.id
  try {
    const approveRecipe = await ApproveRecipe.findById(id).exec()
    if (approveRecipe === null) {
      return res.status(404).json({
        message: 'ApproveRecipe not found!!'
      })
    }
    res.json(approveRecipe)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

const addApproveRecipe = async function (req, res, next) {
  const newApproveRecipe = new ApproveRecipe({
    booking_id: req.body.booking_id,
    status_approve: 0,
    current_order: 1,
    approve_id: req.body.approve_id,
    timeApprove: null,
    user_id: req.body.user_id
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
