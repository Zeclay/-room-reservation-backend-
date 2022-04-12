const express = require('express')
const router = express.Router()
const User = require('../models/User')

const getUsers = async function (req, res, next) {
  try {
    const users = await User.find({}).exec()
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
    const user = await User.findById(id).exec()
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
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    roles: req.body.roles
  })
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
    user.username = req.body.username
    user.password = req.body.password
    user.roles = req.body.roles
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
router.post('/', addUsers) // add
router.get('/:id', getUserid) // get id
router.put('/:id', updateUser) // Add new User
router.delete('/:id', deleteUser)

module.exports = router
