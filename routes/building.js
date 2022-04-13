const express = require('express')
const router = express.Router()
const Building = require('../models/building')
const user = require('../models/User')

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
        message: 'User not found!!'
      })
    }
    res.json(building)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

const addBuildings = async function (req, res, next) {
  const newBuilding = new Building({
    name_build: req.body.name,
    code: req.body.code
  })
  try {
    await newBuilding.save()
    res.status(201).json(newBuilding)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateBuilding = async function (req, res, next) {
  const buildingId = req.params.id
  try {
    const building = await Building.findById(buildingId)
    building.name_build = req.body.name_build
    building.code = req.body.code
    await building.save()
    return res.status(200).json(building)
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

const deleteBuilding = async function (req, res, next) {
  const buildingId = req.params.id
  try {
    await user.findByIdAndDelete(buildingId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

router.get('/', getBuildings)
router.get('/:id', getBuildingid)
router.post('/', addBuildings)
router.put('/:id', updateBuilding)
router.delete('/:id', deleteBuilding)

module.exports = router
