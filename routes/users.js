const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { ROLE } = require('../constant.js')

const getUsers = async function (req, res, next) {
  try {
    const users = await User.find({}).populate({
      path: 'agency'
    }).exec()
    res.status(200).json(users)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getUserApprove = async function (req, res, next) {
  try {
    const users = await User.find({ roles: 'APPROVER' }).populate({
      path: 'agency'
    }).exec()
    res.status(200).json(users)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getUserid = async function (req, res, next) {
  const id = req.params.id
  console.log(id)
  try {
    const user = await User.findById(id).populate({
      path: 'agency'
    }).exec()
    if (user === null) {
      return res.status(404).json({
        message: 'User not found!!'
      })
    }
    res.json(user)
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
}

const addUsers = async function (req, res, next) {
  let newUser
  if (req.body.rank === '') {
    newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      position: req.body.position,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      agency: req.body.agency,
      roles: [ROLE.USER]
    })
  } else {
    newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      position: req.body.position,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      agency: req.body.agency,
      roles: [ROLE.USER, req.body.rank]
    })
  }
  try {
    await newUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateUser = async function (req, res, next) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    user.name = req.body.name
    user.surname = req.body.surname
    user.position = req.body.position
    user.email = req.body.email
    user.username = req.body.username
    user.password = req.body.password
    user.agency = req.body.agency
    if (req.body.rank === '' || req.body.rank === null) {
      user.roles[0] = ROLE.USER
      user.roles[1].pop()
    } else {
      user.roles = [ROLE.USER, req.body.rank]
    }

    await user.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

const deleteUser = async function (req, res, next) {
  const userId = req.params.id
  try {
    await User.findByIdAndDelete(userId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({ message: err.message })
  }
}

router.get('/', getUsers) // get
router.get('/approvers', getUserApprove)
router.post('/', addUsers) // add
router.get('/:id', getUserid) // get id
router.put('/:id', updateUser) // Add new User
router.delete('/:id', deleteUser)

module.exports = router
