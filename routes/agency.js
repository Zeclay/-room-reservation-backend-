const express = require('express')
const router = express.Router()
const Agency = require('../models/agency')
const user = require('../models/User')

const getAgencys = async function (req, res, next) {
  try {
    const agencys = await Agency.find({}).exec()
    res.status(200).json(agencys)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getAgencyid = async function (req, res, next) {
  const id = req.params.id
  try {
    const agency = await Agency.findById(id).exec()
    if (agency === null) {
      return res.status(404).json({
        message: 'User not found!!'
      })
    }
    res.json(agency)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

const addAgencys = async function (req, res, next) {
  const newAgency = new Agency({
    name: req.body.name
  })
  try {
    await newAgency.save()
    res.status(201).json(newAgency)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateAgency = async function (req, res, next) {
  const agencyId = req.params.id
  try {
    const agency = await Agency.findById(agencyId)
    agency.name = req.body.name
    await user.save()
    return res.status(200).json(agency)
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

const deleteAgency = async function (req, res, next) {
  const agencyId = req.params.id
  try {
    await Agency.findByIdAndDelete(agencyId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

router.get('/', getAgencys)
router.get('/:id', getAgencyid)
router.post('/', addAgencys)
router.put('/:id', updateAgency)
router.delete('/:id', deleteAgency)

module.exports = router
