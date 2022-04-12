const mongoose = require('mongoose')
const { Schema } = mongoose
const buildingSchema = Schema({
  name_build: String,
  code: String
})
module.exports = mongoose.model('Building', buildingSchema)
