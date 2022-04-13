const express = require('express')
const router = express.Router()
const Room = require('../models/room')

const getRooms = async function (req, res, next) {
  try {
    const rooms = await Room.find({}).exec()
    res.status(200).json(rooms)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getRoomid = async function (req, res, next) {
  const id = req.params.id
  try {
    const room = await Room.findById(id).exec()
    if (room === null) {
      return res.status(404).json({
        message: 'Room not found!!'
      })
    }
    res.json(room)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

const addRooms = async function (req, res, next) {
  const newRoom = new Room({
    code: req.body.code,
    description: req.body.description,
    floor: req.body.floor,
    seat: req.body.seat,
    type: req.body.type,
    approve_id: req.body.approve_id,
    building_id: req.body.building_id,
    agency_id: req.body.agency_id
  })
  try {
    await newRoom.save()
    res.status(201).json(newRoom)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateRoom = async function (req, res, next) {
  const roomId = req.params.id
  try {
    const room = await Room.findById(roomId)
    room.code = req.body.code
    room.description = req.body.description
    room.floor = req.body.floor
    room.seat = req.body.seat
    room.type = req.body.type
    room.approve_id = req.body.approve_id
    room.building_id = req.body.building_id
    room.agency_id = req.body.agency_id
    await room.save()
    return res.status(200).json(room)
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

const deleteRoom = async function (req, res, next) {
  const roomId = req.params.id
  try {
    await Room.findByIdAndDelete(roomId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

router.get('/', getRooms)
router.get('/:id', getRoomid)
router.post('/', addRooms)
router.put('/:id', updateRoom)
router.delete('/:id', deleteRoom)
module.exports = router
