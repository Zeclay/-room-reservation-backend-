const express = require('express')
const router = express.Router()
const Approve = require('../models/approve')

const getApprove = async function (req, res, next) {
  try {
    const approves = await Approve.find({}).populate({
      path: 'approver1'
    }).populate({ path: 'approver2' }).populate({
      path: 'agencys'
    }).exec()
    res.status(200).json(approves)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getApproveid = async function (req, res, next) {
  const id = req.params.id.populate({
    path: 'approver1'
  }).populate({ path: 'approver2' }).exec()
  try {
    const approve = await Approve.findById(id).exec()
    if (approve === null) {
      return res.status(404).json({
        message: 'Approve not found!!'
      })
    }
    res.json(approve)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

const addApprove = async function (req, res, next) {
  const description = req.body.description
  const user1 = req.body.user1
  const user2 = req.body.user2
  const agencys = req.body.agencys
  const newApprove = new Approve({
    description: description,
    agencys: agencys,
    approver1: user1,
    approver2: user2
  })
  try {
    await newApprove.save()
    res.status(201).json(newApprove)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateApprove = async function (req, res, next) {
  const approveId = req.params.id
  const description = req.body.description
  const user1 = req.body.user1
  const user2 = req.body.user2
  try {
    const approve = await Approve.findById(approveId)
    approve.description = description
    approve.approver1 = user1
    approve.approver2 = user2
    await approve.save()
    return res.status(200).json(approve)
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

const deleteApprove = async function (req, res, next) {
  const approveId = req.params.id
  try {
    await Approve.findByIdAndDelete(approveId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

router.get('/', getApprove)
router.get('/:id', getApproveid)
router.post('/', addApprove)
router.put('/:id', updateApprove)
router.delete('/:id', deleteApprove)
module.exports = router
