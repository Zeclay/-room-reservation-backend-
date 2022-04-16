const mongoose = require('mongoose')
const { Schema } = mongoose
const approveSchema = Schema({
  description: String,
  agencys: { type: Schema.Types.ObjectId, ref: 'Agency' },
  approver1: { type: Schema.Types.ObjectId, ref: 'User' },
  approver2: { type: Schema.Types.ObjectId, ref: 'User' },
  order: Number
})
module.exports = mongoose.model('Approve', approveSchema)
