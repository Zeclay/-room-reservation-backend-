const mongoose = require('mongoose')
const { Schema } = mongoose
const institutionSchema = Schema({
  name: String
})
module.exports = mongoose.model('Institution', institutionSchema)
