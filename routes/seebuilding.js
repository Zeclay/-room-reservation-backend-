const express = require('express')
const router = express.Router()
const Building = require('../models/building')

const getBuildings = async function (req, res, next) {
  try {
    const buildings = await Building.find({}).exec()
    res.status(200).json(buildings)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getBuildingid = async function (req, res, next) {
  const id = req.params.id
  try {
    const building = await Building.findById(id).exec()
    if (building === null) {
      return res.status(404).json({
        message: 'Building not found!!'
      })
    }
    res.json(building)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

router.get('/', getBuildings)
router.get('/:id', getBuildingid)

module.exports = router
