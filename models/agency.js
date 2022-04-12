const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
const agencySchema = Schema({
    name: String,
})

module.exports = mongoose.model('Agency', agencySchema)
