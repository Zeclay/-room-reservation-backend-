const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
const roomSchema = Schema({
    code: String,
    description: String,
    floor: int,
    seat: int,
    type: String,
    approve_id: { type: Schema.Types.ObjectId, ref: 'Approve' },
    building_id: { type: Schema.Types.ObjectId, ref: 'Building' },
    agency_id: { type: Schema.Types.ObjectId, ref: 'Agency' }
})

module.exports = mongoose.model('Room', roomSchema)
