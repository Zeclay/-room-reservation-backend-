const { ROLE } = require('../constant.js')
const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = Schema({
  username: String,
  password: String,
  roles: {
    type: [String],
    default: [ROLE.USER]
  }
})

module.exports = mongoose.model('User', userSchema)
