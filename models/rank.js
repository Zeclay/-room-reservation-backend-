const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
const rankSchema = Schema({
    name: String,
})

module.exports = mongoose.model('Rank', rankSchema)
