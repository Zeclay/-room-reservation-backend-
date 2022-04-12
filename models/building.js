const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
const buildingSchema = Schema({
    name_build: String,
    code : String
})
module.exports = mongoose.model('Building', buildingSchema)
