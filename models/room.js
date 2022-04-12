const mongoose = require('mongoose')
const { Schema } = mongoose
const roomSchema = Schema({
  code: String,
  description: String,
  floor: Number,
  seat: Number,
  type: String,
  approve_id: { type: Schema.Types.ObjectId, ref: 'Approve' },
  building_id: { type: Schema.Types.ObjectId, ref: 'Building' },
  agency_id: { type: Schema.Types.ObjectId, ref: 'Agency' }
})

module.exports = mongoose.model('Room', roomSchema)
