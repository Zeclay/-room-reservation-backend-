const mongoose = require('mongoose')
const { Schema } = mongoose
const agencySchema = Schema({
  name: String
})

module.exports = mongoose.model('Agency', agencySchema)
