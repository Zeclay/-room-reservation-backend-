const express = require('express')
const router = express.Router()
const TimeTable = require('../models/timetable')

const getTimeTables = async function (req, res, next) {
  try {
    const timeTables = await TimeTable.find().exec()
    res.status(200).json(timeTables)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getTimeTableid = async function (req, res, next) {
  const id = req.params.id
  const ObjectId = require('mongoose').Types.ObjectId
  try {
    const timeTable = await TimeTable.find({ room_id: new ObjectId(id) })
    if (timeTable === null) {
      return res.status(404).json({
        message: 'TimeTable not found!!'
      })
    }
    res.json(timeTable)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

router.get('/', getTimeTables)
router.get('/:id', getTimeTableid)
module.exports = router
